import { NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  adminConfigured,
  checkPassword,
  createSessionToken,
  sessionCookieOptions,
} from '@/lib/auth';
import { clientIp, pruneRateLimits, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  pruneRateLimits();

  if (!adminConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'ADMIN_PASSWORD is not set on the server.' },
      { status: 503 },
    );
  }

  const limited = rateLimit(`login:${clientIp(request.headers)}`, { limit: 8, windowMs: 15 * 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfter) } },
    );
  }

  let password = '';
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: 'Wrong password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  return response;
}
