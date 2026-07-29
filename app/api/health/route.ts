import { NextResponse } from 'next/server';
import { usingPostgres } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Used by uptime monitors and to sanity-check a fresh deployment. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'english-pathshala',
    storage: usingPostgres ? 'postgres' : 'json-file',
    notifications: {
      email: Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL_TO),
      webhook: Boolean(process.env.LEAD_WEBHOOK_URL),
    },
    adminConfigured: Boolean(process.env.ADMIN_PASSWORD),
    time: new Date().toISOString(),
  });
}
