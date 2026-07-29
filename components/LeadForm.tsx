'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { programs } from '@/lib/content';
import { site, whatsappLink } from '@/lib/site';
import { CheckIcon, WhatsAppIcon } from './Icons';

const levels = [
  'Complete beginner — I can barely make a sentence',
  'I understand English but freeze while speaking',
  'I can speak, but with lots of hesitation',
  'I am fluent but want to sound more professional',
];

type FieldErrors = Record<string, string>;

export function LeadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ whatsappUrl: string } | null>(null);
  const [source, setSource] = useState('');

  /** Remember where the visitor came from, so you know which post is working. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
      .map((key) => {
        const value = params.get(key);
        return value ? `${key}=${value}` : null;
      })
      .filter(Boolean)
      .join('&');

    const referrer = document.referrer ? new URL(document.referrer).hostname : '';
    setSource(utm || referrer || 'direct');
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      email: String(formData.get('email') ?? ''),
      program: String(formData.get('program') ?? ''),
      level: String(formData.get('level') ?? ''),
      preferredTime: String(formData.get('preferredTime') ?? ''),
      goal: String(formData.get('goal') ?? ''),
      website: String(formData.get('website') ?? ''),
      source,
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data.error ?? 'Something went wrong. Please message us on WhatsApp instead.');
        return;
      }

      setSuccess({ whatsappUrl: data.whatsappUrl ?? whatsappLink() });
    } catch {
      setFormError(
        'We could not send that — please check your connection, or just message us directly on WhatsApp.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-brand-100 bg-white p-8 text-center shadow-lift">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-whatsapp/10 text-whatsapp">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Got it! One last step 👇</h3>
        <p className="mx-auto mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-ink-soft">
          Your details are with {site.founder}. Tap below to open WhatsApp — your message is already
          typed out. That is where your demo class gets scheduled.
        </p>
        <a
          href={success.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-6 w-full sm:w-auto"
          data-cta="form-success-whatsapp"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Continue on WhatsApp
        </a>
        <p className="mt-4 text-sm text-ink-muted">
          Prefer a call? Dial{' '}
          <a href={`tel:${site.phoneHref}`} className="font-semibold text-brand-700 underline">
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-brand-100 bg-white p-6 shadow-lift sm:p-8"
    >
      <h3 className="font-display text-2xl font-semibold text-ink">Book your free demo class</h3>
      <p className="mt-2 text-[15px] text-ink-soft">
        Takes 30 seconds. No payment, no obligation — you sit in one full live class first.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={`field ${errors.name ? 'field-error' : ''}`}
          />
        </Field>

        <Field label="WhatsApp number" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            className={`field ${errors.phone ? 'field-error' : ''}`}
          />
        </Field>

        <Field label="Which course?" name="program" error={errors.program} className="sm:col-span-2">
          <select
            id="program"
            name="program"
            required
            defaultValue={programs[0].title}
            className={`field ${errors.program ? 'field-error' : ''}`}
          >
            {programs.map((program) => (
              <option key={program.slug} value={program.title}>
                {program.title} — {program.who}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet — please suggest</option>
          </select>
        </Field>

        <Field label="Your English right now" name="level" error={errors.level} className="sm:col-span-2">
          <select
            id="level"
            name="level"
            required
            defaultValue={levels[1]}
            className={`field ${errors.level ? 'field-error' : ''}`}
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred timing" name="preferredTime" error={errors.preferredTime}>
          <select id="preferredTime" name="preferredTime" defaultValue="" className="field">
            <option value="">Any time works</option>
            {site.batch.timings.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
            <option value="Weekend only">Weekend only</option>
          </select>
        </Field>

        <Field label="Email (optional)" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`field ${errors.email ? 'field-error' : ''}`}
          />
        </Field>

        <Field
          label="What do you want to fix? (optional)"
          name="goal"
          error={errors.goal}
          className="sm:col-span-2"
        >
          <textarea
            id="goal"
            name="goal"
            rows={3}
            placeholder="e.g. I have campus placements in 3 months and I panic in interviews."
            className={`field resize-y ${errors.goal ? 'field-error' : ''}`}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from humans, catnip for bots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
        {submitting ? 'Sending…' : 'Book my free demo class'}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-ink-muted">
        Your number is used only to contact you about classes. No spam, no sharing with anyone else.{' '}
        <a href="/privacy" className="underline hover:text-ink-soft">
          Privacy policy
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
  className = '',
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
