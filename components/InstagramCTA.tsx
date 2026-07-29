import { site } from '@/lib/site';
import { Reveal } from './Reveal';
import { InstagramIcon, SparkleIcon } from './Icons';

const reelTeasers = [
  '5 English phrases you are using wrong',
  'How to introduce yourself in 30 seconds',
  '“Have” vs “Has” — the 10-second rule',
  'Stop saying “I am agree”',
  'Daily words most people mispronounce',
  'Answer “Tell me about yourself” like this',
];

export function InstagramCTA() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-accent-400/10 shadow-soft">
          <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
            <Reveal>
              <span className="eyebrow">
                <SparkleIcon className="h-3.5 w-3.5" />
                Free daily practice
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Not ready to join yet?
                <br />
                <span className="text-brand-600">Learn with me on Instagram.</span>
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
                Short daily lessons, common mistakes, and pronunciation tips — completely free.
                Watch for a few weeks, and when you are ready to actually speak, the demo class is waiting.
              </p>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7"
                data-cta="instagram-follow"
              >
                <InstagramIcon className="h-5 w-5" />
                Follow {site.socials.instagramHandle}
              </a>
            </Reveal>

            <Reveal delay={120}>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {reelTeasers.map((teaser) => (
                  <li
                    key={teaser}
                    className="flex items-start gap-2.5 rounded-2xl border border-brand-100 bg-white/80 p-4 text-sm font-medium leading-snug text-ink-soft backdrop-blur"
                  >
                    <span className="mt-0.5 text-brand-400" aria-hidden>
                      ▶
                    </span>
                    {teaser}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
