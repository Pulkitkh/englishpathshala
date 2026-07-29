import { transformations } from '@/lib/content';
import { Reveal } from './Reveal';

export function Transformations() {
  return (
    <section className="section bg-brand-950 text-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-100">
            Before &amp; after
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            What actually changes in a few months
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-brand-100">
            Not perfect grammar. Not a foreign accent. Just the ability to open your mouth and have
            the words show up.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {transformations.map((item, index) => (
            <Reveal key={item.name} delay={index * 90}>
              <article className="h-full rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                  <span className="rounded-full bg-accent-500/90 px-3 py-1 text-xs font-bold text-brand-950">
                    {item.weeks} weeks
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Before</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-brand-100/90">{item.before}</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">After</p>
                    <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-white">{item.after}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm text-brand-200">
            Results depend on how regularly you attend and practise. Nobody becomes fluent in 15 days —
            anyone promising that is selling you something.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
