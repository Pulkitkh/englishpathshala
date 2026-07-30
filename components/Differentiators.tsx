import { differentiators } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export function Differentiators() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why English Pathshala"
          title={
            <>
              A classroom where <span className="text-brand-600">mistakes are the syllabus</span>
            </>
          }
          subtitle="No 200-student webinars, no hour of sitting silent while somebody lectures. Whether you take a live batch or the recorded course, the whole thing is built around you actually opening your mouth."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <article className="card group h-full hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-2xl transition-colors group-hover:bg-brand-100">
                  <span aria-hidden>{item.icon}</span>
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
