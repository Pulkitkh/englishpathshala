import { howItWorks } from '@/lib/content';
import { site, whatsappLink } from '@/lib/site';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { WhatsAppIcon } from './Icons';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section scroll-mt-24 bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="From a WhatsApp message to speaking confidently"
          subtitle="Four steps. No agents, no call centre, no pressure to pay before you have seen a class."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, index) => (
            <Reveal as="li" key={step.step} delay={index * 90}>
              <div className="relative h-full rounded-3xl border border-brand-100 bg-sand p-6 shadow-soft">
                <span
                  aria-hidden
                  className="font-display text-5xl font-semibold leading-none text-brand-200"
                >
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{step.body}</p>

                {index < howItWorks.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-brand-500 text-xs text-white lg:flex"
                  >
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <a
              href={whatsappLink(
                `Hi ${site.founder}! I'd like to book the free level check and demo class.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              data-cta="how-it-works-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Start with step 1 — message on WhatsApp
            </a>
            <p className="mt-3 text-sm text-ink-muted">Replies usually within a few hours.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
