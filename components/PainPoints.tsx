import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { CheckIcon } from './Icons';

const pains = [
  'You understand English perfectly, but the words disappear when you have to speak.',
  'You build the sentence in Hindi first, then translate — and the moment passes.',
  'You have finished two grammar courses and still cannot hold a 5-minute conversation.',
  'You go quiet in meetings and interviews, even when you know the answer.',
  'You are scared of being judged for your accent or a wrong tense.',
  'You have watched hundreds of free videos, but never actually practised out loud.',
];

export function PainPoints() {
  return (
    <section className="section bg-sand">
      <div className="container-page">
        <SectionHeading
          eyebrow="Sound familiar?"
          title={
            <>
              The problem isn&apos;t your English.
              <br />
              It&apos;s that <span className="text-brand-600">you never get to speak it.</span>
            </>
          }
          subtitle="Most of us spent 12 years learning English on paper and zero hours using it out loud. That gap is exactly what these classes are built to close."
        />

        <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
          {pains.map((pain, index) => (
            <Reveal as="li" key={pain} delay={index * 60}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <p className="text-[15px] leading-relaxed text-ink-soft">{pain}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200} className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-lg font-medium text-ink">
            If you nodded at even two of these, you are exactly who this class was made for.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
