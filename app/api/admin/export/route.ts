import { NextResponse } from 'next/server';
import { listLeads } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvCell(value: string | null): string {
  const safe = value ?? '';
  // Guard against spreadsheet formula injection when the CSV is opened in Excel.
  const escaped = /^[=+\-@\t\r]/.test(safe) ? `'${safe}` : safe;
  return `"${escaped.replace(/"/g, '""')}"`;
}

/** Admin only: download every enquiry as a CSV you can open in Excel. */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }

  const leads = await listLeads();
  const header = [
    'Date',
    'Name',
    'Phone',
    'Email',
    'Course',
    'Level',
    'Preferred time',
    'Goal',
    'Source',
    'Status',
    'Notes',
  ];

  const rows = leads.map((lead) =>
    [
      new Date(lead.createdAt).toLocaleString('en-IN'),
      lead.name,
      lead.phone,
      lead.email,
      lead.program,
      lead.level,
      lead.preferredTime,
      lead.goal,
      lead.source,
      lead.status,
      lead.notes,
    ]
      .map(csvCell)
      .join(','),
  );

  const csv = [header.map(csvCell).join(','), ...rows].join('\r\n');
  const filename = `english-pathshala-leads-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
