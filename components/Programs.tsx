import { formatLabels, programs } from '@/lib/content';
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
          title="Pick the course that fits your life"
          subtitle="Every course comes as a live batch, a recorded course, or both. Not sure which one you need? Send a message — you'll get an honest answer, even if the answer is 'not yet'."
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

                <div className="mt-6 border-t border-brand-100 pt-5 text-sm">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="flex items-center gap-1.5 text-ink-soft">
                      <ClockIcon className="h-4 w-4 text-brand-500" />
                      {program.duration}
                    </span>
                    {site.showPricing && program.price && (
                      <span className="font-display text-lg font-semibold text-ink">{program.price}</span>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="sr-only">Available as:</span>
                    {program.formats.map((format) => (
                      <span
                        key={format}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          format === 'live'
                            ? 'bg-whatsapp/10 text-whatsapp-dark'
                            : 'bg-brand-50 text-brand-700'
                        }`}
                      >
                        {format === 'live' ? '● ' : '▶ '}
                        {formatLabels[format]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={whatsappLink(
                      `Hi ${site.founder}! I'm interested in the "${program.title}" course. Can you tell me about the live batch and the recorded version?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp flex-1 px-5 py-3 text-sm"
                    data-cta={`course-whatsapp-${program.slug}`}
                  >
                    <WhatsAppIcon className="h-[18px] w-[18px]" />
                    Ask about this course
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

        <FormatPicker />
      </div>
    </section>
  );
}

/** Live batch vs recorded course — the choice the visitor has to make. */
function FormatPicker() {
  const options = [
    {
      key: 'live' as const,
      badge: 'Live batch',
      title: 'Learn with a teacher and a group',
      points: [
        'Live on Zoom, maximum 12 students',
        'You speak and get corrected in the moment',
        'Timings agreed with the students in your batch',
        'Male or female teacher, your preference',
        'Free demo class before you pay',
      ],
      note: 'Best if hesitation while speaking is your real problem.',
      cta: 'Ask about live batches',
      message: `Hi ${site.founder}! I'd like to join a LIVE batch. Can you tell me which timings are opening next?`,
      accent: true,
    },
    {
      key: 'recorded' as const,
      badge: 'Recorded course',
      title: 'Learn at your own pace',
      points: [
        'Buy once, start the same day',
        'Watch and revise as many times as you like',
        'Same lessons and material as the live course',
        'No fixed timing — study whenever you are free',
        'Can be added on top of a live batch',
      ],
      note: 'Best if your schedule is unpredictable or you prefer studying alone.',
      cta: 'Ask about recorded courses',
      message: `Hi ${site.founder}! I'm interested in the RECORDED courses. Can you share the details?`,
      accent: false,
    },
  ];

  return (
    <div className="mt-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Two ways to learn</span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Live batch, recorded course — or both
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          Most courses above come in both formats — the badge on each card tells you which. Pick
          whichever fits the way your week actually looks.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {options.map((option, index) => (
          <Reveal key={option.key} delay={index * 90}>
            <article
              className={`card flex h-full flex-col ${
                option.accent ? 'border-whatsapp/30 ring-1 ring-whatsapp/20' : ''
              }`}
            >
              <span
                className={`w-fit rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wide ${
                  option.accent ? 'bg-whatsapp/10 text-whatsapp-dark' : 'bg-brand-50 text-brand-700'
                }`}
              >
                {option.badge}
              </span>
              <h4 className="mt-4 font-display text-xl font-semibold text-ink">{option.title}</h4>

              <ul className="mt-4 flex-1 space-y-2.5">
                {option.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-500" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-2xl bg-sand px-4 py-3 text-sm font-medium text-ink">
                {option.note}
              </p>

              <a
                href={whatsappLink(option.message)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 w-full ${option.accent ? 'btn-whatsapp' : 'btn-ghost'}`}
                data-cta={`format-${option.key}`}
              >
                {option.accent && <WhatsAppIcon className="h-5 w-5" />}
                {option.cta}
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
