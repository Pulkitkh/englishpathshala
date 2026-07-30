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
              Courses are offered in two formats: <strong>live batches</strong> on Zoom, and
              <strong> recorded courses</strong> you buy and study at your own pace. For a live batch,
              every student starts with a free level check and one free demo class, and the seat is
              confirmed only after the first month&apos;s fee is paid. Live batches are capped at 12
              students; if one is full you are offered another rather than being added beyond the cap.
              There is no fixed intake date — a batch opens once a group with matching timings is
              ready. Recorded courses can be started as soon as the payment is made.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Fees</h2>
            <p className="mt-3">
              Fees depend on the course and the format, and are shared directly on WhatsApp rather
              than published on this website. Live batches are charged monthly; recorded courses are a
              one-time purchase. Both are payable by UPI or bank transfer. Fees may change for future
              batches, but never mid-course for an enrolled student.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Refunds</h2>
            <p className="mt-3">
              <strong>Live batches:</strong> if you attend the first week of a paid month and decide
              the class is not right for you, tell us before the 7th day and that month&apos;s fee is
              refunded in full. After the first week, fees for the running month are non-refundable,
              but you may pause and rejoin a later batch within six months at no extra cost.
              <br />
              <br />
              <strong>Recorded courses:</strong> because the full course content is delivered
              immediately on purchase, recorded courses are non-refundable once access has been given.
              Watch the free preview lessons and ask any questions before buying.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Live classes and attendance</h2>
            <p className="mt-3">
              Live classes run on Zoom as per your batch timing. Sessions are <strong>not</strong>
              recorded — this is deliberate, so students speak freely without a permanent archive of
              their mistakes. If you miss a class, your teacher shares the notes and a catch-up task.
              Occasionally a class may be rescheduled; you will be told in the batch group in advance
              and any missed session is made up.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Course materials</h2>
            <p className="mt-3">
              Recorded course videos, notes and worksheets are licensed to you for your personal
              learning only. Please do not download, re-share, resell or publish them, and do not
              share your access with anyone else — doing so ends access without a refund.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Results</h2>
            <p className="mt-3">
              Progress depends on attendance and daily practice. We do not guarantee a specific
              level, exam score, job or placement outcome. What we do guarantee is that in a live
              batch you will get speaking time and personal feedback in every class you attend.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Code of conduct</h2>
            <p className="mt-3">
              This is a beginner-friendly classroom. Mocking, harassing or recording other students
              without their consent results in removal from the batch without a refund.
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
