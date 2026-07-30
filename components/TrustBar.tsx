import { site } from '@/lib/site';
import { Reveal } from './Reveal';

const marqueeItems = [
  'Live batches on Zoom',
  'Recorded courses too',
  'Max 12 per live batch',
  'Taught in Hindi + English',
  'Free demo class',
  'Daily speaking practice',
  'Male & female teachers',
  'Flexible timings',
  'Personal feedback every week',
];

export function TrustBar() {
  return (
    <section className="border-y border-brand-100 bg-white/70">
      <div className="container-page py-10">
        <Reveal>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-brand-700 sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mask-fade-x overflow-hidden border-t border-brand-100 py-3.5">
        <div className="flex w-max animate-marquee items-center gap-3 pr-3">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-800"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
