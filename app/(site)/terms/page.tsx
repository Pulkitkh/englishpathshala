import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Refund Policy',
  description: `Class terms, fees and refund policy for ${site.name}.`,
};

export default function TermsPage() {
  return (
    <article className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-ink">Terms &amp; Refund Policy</h1>
        <p className="mt-3 text-sm text-ink-muted">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-ink-soft">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Enrolment</h2>
            <p className="mt-3">
              Every student starts with a free level check and one free demo class. A seat is
              confirmed only after the fee for the first month is paid, and batches are capped at 12
              students. If a batch is full, you are offered the next one rather than being added
              beyond the cap.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Fees</h2>
            <p className="mt-3">
              Fees are charged monthly (or as a one-time course fee where stated on the course card)
              and are payable by UPI or bank transfer. Prices shown on this website may change for
              future batches, but never mid-course for an enrolled student.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Refunds</h2>
            <p className="mt-3">
              If you attend the first week of a paid month and decide the class is not right for you,
              tell us before the 7th day and that month&apos;s fee is refunded in full. After the
              first week, fees for the running month are non-refundable, but you may pause and
              rejoin a later batch within six months at no extra cost.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Classes and attendance</h2>
            <p className="mt-3">
              Classes run live on Zoom on weekdays as per your batch timing. Sessions are recorded
              and shared with the batch. Occasionally a class may be rescheduled — you will be told
              in the batch group in advance, and any missed session is made up.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Recordings and materials</h2>
            <p className="mt-3">
              Class recordings, notes and worksheets are for your personal learning only. Please do
              not re-share, resell or publish them. Class recordings may include other students&apos;
              voices, so they are never made public.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Results</h2>
            <p className="mt-3">
              Progress depends on attendance and daily practice. We do not guarantee a specific
              level, exam score, job or placement outcome. What we do guarantee is that you will get
              speaking time and personal feedback in every class you attend.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Code of conduct</h2>
            <p className="mt-3">
              This is a beginner-friendly classroom. Mocking, harassing or recording other students
              without consent results in removal from the batch without a refund.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Questions</h2>
            <p className="mt-3">
              Anything unclear here can be asked directly on WhatsApp at {site.phoneDisplay}, or by
              email at{' '}
              <a href={`mailto:${site.email}`} className="font-medium text-brand-700 underline">
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
