import { NextResponse } from 'next/server';
import { createLead, listLeads } from '@/lib/db';
import { leadSchema, normalisePhone } from '@/lib/validation';
import { clientIp, pruneRateLimits, rateLimit } from '@/lib/rate-limit';
import { notifyNewLead } from '@/lib/notify';
import { isAuthenticated } from '@/lib/auth';
import { site, whatsappLink } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Public: submit an enquiry. */
export async function POST(request: Request) {
  pruneRateLimits();

  const ip = clientIp(request.headers);
  const limited = rateLimit(`lead:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many enquiries from this device. Please message us on WhatsApp instead.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot filled in → pretend everything worked, store nothing. Checked
  // before validation so a bot never sees which field gave it away.
  if (typeof (body as { website?: unknown }).website === 'string' && (body as { website: string }).website) {
    return NextResponse.json({ ok: true, whatsappUrl: whatsappLink() });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, error: 'Please check the form.', fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  try {
    const lead = await createLead({
      name: data.name,
      phone: normalisePhone(data.phone),
      email: data.email || null,
      program: data.program,
      level: data.level,
      format: data.format || 'Not sure yet',
      goal: data.goal || null,
      preferredTime: data.preferredTime || null,
      source: data.source || null,
    });

    await notifyNewLead(lead);

    // A recorded-course enquiry has no demo class to book, so ask for the
    // right thing instead of a generic "book a demo".
    const closing =
      lead.format === 'Recorded course'
        ? "I'd like the details and price for the recorded course."
        : "I'd like to book a free demo class.";

    const message =
      `Hi ${site.founder}! I just filled the form on your website.\n\n` +
      `Name: ${lead.name}\n` +
      `Course: ${lead.program}\n` +
      `Format: ${lead.format}\n` +
      `My level: ${lead.level}\n` +
      (lead.preferredTime ? `Preferred timing: ${lead.preferredTime}\n` : '') +
      `\n${closing}`;

    return NextResponse.json({ ok: true, id: lead.id, whatsappUrl: whatsappLink(message) });
  } catch (error) {
    console.error('[leads] failed to save enquiry:', error);
    // Storage is a convenience, not the conversion path — never block the
    // visitor from reaching WhatsApp because a database is down.
    return NextResponse.json(
      { ok: true, degraded: true, whatsappUrl: whatsappLink() },
      { status: 200 },
    );
  }
}

/** Admin only: list every enquiry. */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }
  const leads = await listLeads();
  return NextResponse.json({ ok: true, leads });
}
