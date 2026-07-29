/**
 * Optional lead notifications. Both are no-ops unless you set the env vars,
 * so the site works out of the box without any third-party account.
 *
 *   RESEND_API_KEY + NOTIFY_EMAIL_TO  → emails you every new enquiry
 *   LEAD_WEBHOOK_URL                  → POSTs the lead as JSON (Zapier,
 *                                       Make, Google Sheets, n8n, anything)
 */

import type { Lead } from './db';
import { site } from './site';

async function sendEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!apiKey || !to) return;

  const from = process.env.NOTIFY_EMAIL_FROM || 'English Pathshala <onboarding@resend.dev>';
  const waLink = `https://wa.me/${lead.phone.replace(/\D/g, '')}`;

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#12263f">
      <h2 style="margin:0 0 12px">New enquiry — ${escapeHtml(lead.name)}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-size:15px">
        <tr><td><b>Phone</b></td><td><a href="${waLink}">${escapeHtml(lead.phone)}</a></td></tr>
        <tr><td><b>Email</b></td><td>${escapeHtml(lead.email || '—')}</td></tr>
        <tr><td><b>Course</b></td><td>${escapeHtml(lead.program)}</td></tr>
        <tr><td><b>Level</b></td><td>${escapeHtml(lead.level)}</td></tr>
        <tr><td><b>Preferred time</b></td><td>${escapeHtml(lead.preferredTime || '—')}</td></tr>
        <tr><td><b>Came from</b></td><td>${escapeHtml(lead.source || '—')}</td></tr>
        <tr><td valign="top"><b>Goal</b></td><td>${escapeHtml(lead.goal || '—')}</td></tr>
      </table>
      <p style="margin-top:18px">
        <a href="${waLink}" style="background:#25D366;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">
          Reply on WhatsApp
        </a>
      </p>
    </div>`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: to.split(',').map((address) => address.trim()),
      subject: `New ${site.name} enquiry — ${lead.name} (${lead.program})`,
      html,
    }),
  });
}

async function sendWebhook(lead: Lead): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Fire-and-forget: a failing notification must never fail the enquiry. */
export async function notifyNewLead(lead: Lead): Promise<void> {
  const results = await Promise.allSettled([sendEmail(lead), sendWebhook(lead)]);
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('[notify] lead notification failed:', result.reason);
    }
  }
}
