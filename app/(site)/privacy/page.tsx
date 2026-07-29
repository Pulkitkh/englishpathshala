import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects the details you share on this website.`,
};

export default function PrivacyPage() {
  return (
    <article className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-ink">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink-muted">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-ink-soft">
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">What we collect</h2>
            <p className="mt-3">
              When you fill in the enquiry form we collect your name, mobile number, optional email
              address, the course you are interested in, your self-described English level, your
              preferred class timing and anything you write in the &ldquo;what do you want to
              fix&rdquo; box. We also record which link brought you to the site (for example, an
              Instagram post) so we know which content is helping people find us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Why we collect it</h2>
            <p className="mt-3">
              Only to contact you about {site.name} classes — scheduling your demo class, sharing
              batch timings and answering your questions. That is the whole list.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Who we share it with</h2>
            <p className="mt-3">
              Nobody. Your details are never sold, rented or passed to other coaching institutes or
              advertisers. The only third parties involved are the technical services that run this
              website (our hosting provider, our database provider, and — if enabled — the email
              service that notifies us of a new enquiry).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">WhatsApp</h2>
            <p className="mt-3">
              Most conversations happen over WhatsApp. Those messages are governed by WhatsApp&apos;s
              own privacy policy, not ours. We use WhatsApp only to reply to people who contacted us
              first.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Cookies</h2>
            <p className="mt-3">
              This site sets no advertising or tracking cookies. A single technical cookie is used
              only when the site owner logs into the private admin dashboard.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Your choices</h2>
            <p className="mt-3">
              You can ask us to delete your details at any time — message {site.phoneDisplay} on
              WhatsApp or email{' '}
              <a href={`mailto:${site.email}`} className="font-medium text-brand-700 underline">
                {site.email}
              </a>{' '}
              and it will be removed. If you ask us to stop contacting you, we stop.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Contact</h2>
            <p className="mt-3">
              {site.founder} · {site.name}
              <br />
              WhatsApp: {site.phoneDisplay}
              <br />
              Email: {site.email}
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
