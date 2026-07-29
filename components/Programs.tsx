import { programs } from '@/lib/content';
import { site, whatsappLink } from '@/lib/site';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { ArrowRightIcon, CheckIcon, ClockIcon, WhatsAppIcon } from './Icons';

export function Programs() {
  return (
    <section id="courses" className="section scroll-mt-24 bg-sand">
      <div className="container-page">
        <SectionHeading
          eyebrow="Courses"
          title="Pick the batch that fits your life"
          subtitle="Every course is live, small and taught personally by Bhavya. Not sure which one you need? Send a message — you'll get an honest answer, even if the answer is 'not yet'."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {programs.map((program, index) => (
            <Reveal key={program.slug} delay={index * 80}>
              <article
                className={`card relative flex h-full flex-col hover:-translate-y-1 hover:shadow-lift ${
                  program.popular ? 'border-brand-300 ring-1 ring-brand-200' : ''
                }`}
              >
                {program.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent-500 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                    Most joined
                  </span>
                )}

                <div className="flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-2xl">
                    <span aria-hidden>{program.icon}</span>
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-snug text-ink">{program.title}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-700">{program.who}</p>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{program.blurb}</p>

                <ul className="mt-5 space-y-2.5">
                  {program.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-500" />
                      {outcome}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-brand-100 pt-5 text-sm">
                  <span className="flex items-center gap-1.5 text-ink-soft">
                    <ClockIcon className="h-4 w-4 text-brand-500" />
                    {program.duration}
                  </span>
                  {site.showPricing && program.price && (
                    <span className="font-display text-lg font-semibold text-ink">{program.price}</span>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={whatsappLink(
                      `Hi ${site.founder}! I'm interested in the "${program.title}" course. Can you tell me about the next batch?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp flex-1 px-5 py-3 text-sm"
                    data-cta={`course-whatsapp-${program.slug}`}
                  >
                    <WhatsAppIcon className="h-[18px] w-[18px]" />
                    Ask about this batch
                  </a>
                  <a href="#enquiry" className="btn-ghost px-5 py-3 text-sm">
                    Book demo
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-10 rounded-3xl border border-brand-100 bg-white p-6 text-center shadow-soft sm:p-8">
            <p className="font-display text-xl font-semibold text-ink">{site.batch.nextStart}</p>
            <p className="mt-2 text-[15px] text-ink-soft">
              {site.batch.mode} · {site.batch.duration}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {site.batch.timings.map((time) => (
                <span
                  key={time}
                  className="rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-800"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
