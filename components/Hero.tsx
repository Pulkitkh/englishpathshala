import Image from 'next/image';
import { site, whatsappLink } from '@/lib/site';
import { getFounderPhoto } from '@/lib/founder-photo';
import { InstagramIcon, StarIcon, WhatsAppIcon } from './Icons';
import { Reveal } from './Reveal';

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pt-16 lg:pb-24 lg:pt-20">
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-70" />
        <div className="absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -right-24 top-20 h-[22rem] w-[22rem] rounded-full bg-accent-400/20 blur-3xl" />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow hover:border-brand-400 hover:bg-white"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              Aap Instagram se aaye ho? Welcome 👋
            </a>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-[4.1rem]">
              Stop translating
              <br className="hidden sm:block" /> in your head.
              <br />
              <span className="underline-sketch">Just&nbsp;speak.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
              Live online classes from <strong className="font-semibold text-ink">{site.founder}</strong> and
              his team — only 12 students in a batch, so you actually speak every single day. Or take
              the same course as a recorded one and learn at your own pace. Taught in Hindi{' '}
              <em>and</em> English, for people who understand English but freeze when it&apos;s their
              turn to talk.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
                data-cta="hero-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Book a FREE demo class
              </a>
              <a href="#courses" className="btn-ghost w-full sm:w-auto">
                See the courses
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft">
              <span className="flex items-center gap-2">
                <span className="flex -space-x-2" aria-hidden>
                  {['R', 'A', 'P', 'S'].map((letter, index) => (
                    <span
                      key={letter}
                      className="grid h-8 w-8 place-items-center rounded-full border-2 border-sand text-[11px] font-bold text-white"
                      style={{ background: ['#0082d2', '#02a3f5', '#0b4874', '#f59e0b'][index] }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span>
                  <strong className="font-semibold text-ink">{site.stats[0].value}</strong> students taught
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="flex text-accent-500" aria-hidden>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon key={index} className="h-4 w-4" />
                  ))}
                </span>
                <span>
                  <strong className="font-semibold text-ink">4.9</strong> average rating
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Live-class visual */}
        <Reveal delay={200}>
          <ClassPreviewCard />
        </Reveal>
      </div>
    </section>
  );
}

function ClassPreviewCard() {
  const photo = getFounderPhoto();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-200/50 via-white to-accent-400/25 blur-2xl" />

      <div className="rounded-[2rem] border border-brand-100 bg-white p-5 shadow-lift">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-red-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            Live batch · Evening
          </span>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            Batch of 12
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { initials: 'BJ', name: 'Bhavya', host: true, tone: 'bg-brand-600' },
            { initials: 'RS', name: 'Riya', tone: 'bg-brand-400' },
            { initials: 'AV', name: 'Aman', tone: 'bg-brand-900' },
            { initials: 'PN', name: 'Pooja', tone: 'bg-accent-500' },
            { initials: 'SK', name: 'Sahil', tone: 'bg-brand-500' },
            { initials: 'MR', name: 'Meena', tone: 'bg-brand-700' },
          ].map((person, index) => (
            <div
              key={person.initials}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl ${person.tone} ${
                person.host ? 'ring-2 ring-accent-400 ring-offset-2 ring-offset-white' : ''
              }`}
            >
              {person.host && photo ? (
                <Image
                  src={photo}
                  alt={`${site.founder} teaching a live class`}
                  width={220}
                  height={165}
                  priority
                  sizes="120px"
                  style={{ objectPosition: site.founderPhotoPosition }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center text-lg font-bold text-white/95">
                  {person.initials}
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-1.5 pb-1 pt-3 text-[10px] font-medium text-white">
                {person.name}
                {person.host ? ' (host)' : ''}
              </span>
              {index === 1 && (
                <span className="absolute inset-0 rounded-xl ring-[3px] ring-inset ring-green-300" aria-hidden />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2.5 rounded-2xl bg-sand p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Today&apos;s speaking task</p>
          <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm text-ink shadow-sm">
            &ldquo;Describe your morning routine — 60 seconds, no Hindi.&rdquo;
          </div>
          <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-brand-600 px-4 py-2.5 text-sm text-white shadow-sm">
            I wake up at six and I go for a walk…
          </div>
          <div className="flex items-center gap-2 pl-1 pt-1">
            <span className="flex gap-1" aria-hidden>
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </span>
            <span className="text-xs text-ink-muted">Sahil is speaking…</span>
          </div>
        </div>
      </div>
    </div>
  );
}
