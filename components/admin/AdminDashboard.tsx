'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Lead, LeadStatus } from '@/lib/db';
import { WhatsAppIcon } from '@/components/Icons';

const statuses: { value: LeadStatus; label: string; className: string }[] = [
  { value: 'new', label: 'New', className: 'bg-brand-100 text-brand-800' },
  { value: 'contacted', label: 'Contacted', className: 'bg-amber-100 text-amber-800' },
  { value: 'enrolled', label: 'Enrolled', className: 'bg-green-100 text-green-800' },
  { value: 'dropped', label: 'Dropped', className: 'bg-slate-200 text-slate-700' },
];

export function AdminDashboard({
  initialLeads,
  storage,
}: {
  initialLeads: Lead[];
  storage: string;
}) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');
  const [query, setQuery] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: leads.length };
    for (const status of statuses) {
      base[status.value] = leads.filter((lead) => lead.status === status.value).length;
    }
    return base;
  }, [leads]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (filter !== 'all' && lead.status !== filter) return false;
      if (!needle) return true;
      return [lead.name, lead.phone, lead.email, lead.program, lead.format, lead.goal]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle));
    });
  }, [leads, filter, query]);

  async function changeStatus(id: string, status: LeadStatus) {
    setBusyId(id);
    const previous = leads;
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) setLeads(previous);
    } catch {
      setLeads(previous);
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    setBusyId(id);
    const previous = leads;
    setLeads((current) => current.filter((lead) => lead.id !== id));

    try {
      const response = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (!response.ok) setLeads(previous);
    } catch {
      setLeads(previous);
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  return (
    <div className="container-page py-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Enquiries</h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            {leads.length} total · stored in {storage}
          </p>
        </div>
        <div className="flex gap-2.5">
          <a href="/api/admin/export" className="btn-ghost px-5 py-2.5 text-sm">
            Export CSV
          </a>
          <button type="button" onClick={logout} className="btn-ghost px-5 py-2.5 text-sm">
            Sign out
          </button>
        </div>
      </header>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label={`All (${counts.all})`}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {statuses.map((status) => (
            <FilterChip
              key={status.value}
              label={`${status.label} (${counts[status.value] ?? 0})`}
              active={filter === status.value}
              onClick={() => setFilter(status.value)}
            />
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, number, course…"
          className="field ml-auto w-full max-w-xs"
          aria-label="Search enquiries"
        />
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-ink-muted">
          {leads.length === 0 ? 'No enquiries yet.' : 'Nothing matches that filter.'}
        </p>
      ) : (
        <ul className="mt-6 grid gap-4">
          {visible.map((lead) => (
            <li
              key={lead.id}
              className={`rounded-3xl border border-brand-100 bg-white p-5 shadow-soft transition ${
                busyId === lead.id ? 'opacity-60' : ''
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-ink">{lead.name}</p>
                  <p className="mt-0.5 text-sm text-ink-soft">
                    {lead.phone}
                    {lead.email ? ` · ${lead.email}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statuses.find((status) => status.value === lead.status)?.className ?? ''
                    }`}
                  >
                    {statuses.find((status) => status.value === lead.status)?.label ?? lead.status}
                  </span>
                  <time className="text-xs text-ink-muted" dateTime={lead.createdAt}>
                    {new Date(lead.createdAt).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </time>
                </div>
              </div>

              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-5">
                <Detail label="Course" value={lead.program} />
                <Detail label="Format" value={lead.format} />
                <Detail label="Level" value={lead.level} />
                <Detail label="Preferred time" value={lead.preferredTime ?? '—'} />
                <Detail label="Came from" value={lead.source ?? '—'} />
              </dl>

              {lead.goal && (
                <p className="mt-4 rounded-2xl bg-sand px-4 py-3 text-sm leading-relaxed text-ink-soft">
                  “{lead.goal}”
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <a
                  href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp px-4 py-2 text-sm"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a href={`tel:${lead.phone}`} className="btn-ghost px-4 py-2 text-sm">
                  Call
                </a>

                <select
                  value={lead.status}
                  onChange={(event) => changeStatus(lead.id, event.target.value as LeadStatus)}
                  className="field ml-auto w-auto py-2 text-sm"
                  aria-label={`Status for ${lead.name}`}
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => remove(lead.id)}
                  className="rounded-full px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active ? 'bg-brand-600 text-white' : 'bg-white text-ink-soft ring-1 ring-brand-100 hover:bg-brand-50'
      }`}
    >
      {label}
    </button>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}
