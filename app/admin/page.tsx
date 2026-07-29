import type { Metadata } from 'next';
import { adminConfigured, isAuthenticated } from '@/lib/auth';
import { listLeads, usingPostgres } from '@/lib/db';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Enquiries',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <div className="container-page grid min-h-[70vh] place-items-center py-16">
        <div className="max-w-md rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">Dashboard not set up yet</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Set an <code className="rounded bg-white px-1.5 py-0.5 text-sm">ADMIN_PASSWORD</code> in
            your environment variables (or in <code className="rounded bg-white px-1.5 py-0.5 text-sm">.env.local</code>{' '}
            when running on your own computer), then reload this page.
          </p>
        </div>
      </div>
    );
  }

  if (!(await isAuthenticated())) {
    return <AdminLogin />;
  }

  const leads = await listLeads();
  return <AdminDashboard initialLeads={leads} storage={usingPostgres ? 'Postgres' : 'Local file'} />;
}
