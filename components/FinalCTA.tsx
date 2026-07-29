import { site, whatsappLink } from '@/lib/site';
import { Reveal } from './Reveal';
import { PhoneIcon, WhatsAppIcon } from './Icons';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 opacity-30">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand-500 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-accent-500 blur-3xl" />
      </div>

      <div className="container-page relative z-10 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            You have been meaning to fix your English for years.
            <br />
            <span className="text-accent-400">Start with one free class.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-brand-100">
            {site.batch.nextStart}. Seats are capped at 12, so batches do fill up — but there is
            always a next one, and no one will ever pressure you into it.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto"
              data-cta="final-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Book a free demo on WhatsApp
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="btn w-full border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:w-auto"
              data-cta="final-call"
            >
              <PhoneIcon className="h-5 w-5" />
              {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
