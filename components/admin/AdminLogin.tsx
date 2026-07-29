'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { site } from '@/lib/site';

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const password = new FormData(event.currentTarget).get('password');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.error ?? 'Could not sign in.');
        return;
      }
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container-page grid min-h-[75vh] place-items-center py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-brand-100 bg-white p-8 shadow-lift"
      >
        <h1 className="font-display text-2xl font-semibold text-ink">{site.name}</h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">Enquiry dashboard — private.</p>

        <label htmlFor="password" className="field-label mt-7">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          autoFocus
          className="field"
        />

        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full">
          {busy ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
