import Image from 'next/image';
import { site, whatsappLink } from '@/lib/site';
import { Reveal } from './Reveal';
import { InstagramIcon, WhatsAppIcon } from './Icons';

const credentials = [
  'Teaching spoken English full-time since 2019',
  'Trained students, job seekers and working professionals across 20+ cities',
  'A small faculty of male and female teachers, so you can learn from whoever you are most comfortable with',
  'Classes run in Hindi + English, because you learn fastest in the language you think in',
];

export function Founder() {
  return (
    <section id="about" className="section scroll-mt-24 overflow-hidden bg-sand">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rotate-3 rounded-[2rem] bg-gradient-to-br from-brand-200 to-accent-400/50"
            />
            {site.founderPhoto ? (
              <Image
                src={site.founderPhoto}
                alt={`${site.founder}, founder of ${site.name}`}
                width={520}
                height={620}
                className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-lift"
              />
            ) : (
              <div className="grid aspect-[4/5] w-full place-items-center rounded-[1.75rem] bg-gradient-to-br from-brand-600 to-brand-900 text-center shadow-lift">
                <div className="px-6">
                  <span className="grid h-24 w-24 mx-auto place-items-center rounded-full bg-white/15 font-display text-3xl font-semibold text-white backdrop-blur">
                    BJ
                  </span>
                  <p className="mt-5 font-display text-2xl font-semibold text-white">{site.founder}</p>
                  <p className="mt-1 text-sm text-brand-100">{site.founderRole}</p>
                </div>
              </div>
            )}

            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-lift">
              <p className="text-xs font-medium text-ink-muted">Founder</p>
              <p className="font-display text-lg font-semibold text-ink">{site.founder}</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">Meet the founder</span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              Hi, I&apos;m {site.founder}.
              <br />
              <span className="text-brand-600">This is my classroom.</span>
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-6 space-y-4 text-pretty text-lg leading-relaxed text-ink-soft">
              <p>
                I started English Pathshala because I kept meeting brilliant people who had been
                convinced they were &ldquo;bad at English&rdquo; — when the truth was simply that
                nobody had ever given them a safe room to practise speaking in.
              </p>
              <p>
                So that is what I built. Small live batches where you talk every day, get corrected
                gently, and stop apologising for your mistakes — plus recorded courses for the people
                whose week simply will not hold a fixed class.
              </p>
              <p>
                I don&apos;t take every class alone any more. English Pathshala now has a small
                faculty of male and female teachers that I train and work alongside, and students are
                matched to the teacher who fits what they need — their level, their timing, and who
                they feel comfortable making mistakes in front of.
              </p>
              <p className="font-medium text-ink">
                If you can read this page, you already know more English than you think. You just
                need practice — and someone in your corner while you get it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-2xl border border-brand-100 bg-white p-4 text-sm leading-relaxed text-ink-soft shadow-soft"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(`Hi ${site.founder}! I read your story on the website — I'd like to talk about joining a batch.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                data-cta="founder-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Talk to us directly
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <InstagramIcon className="h-5 w-5" />
                {site.socials.instagramHandle}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
