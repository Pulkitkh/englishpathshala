import { faqs } from '@/lib/content';
import { site, whatsappLink } from '@/lib/site';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { ChevronDownIcon, WhatsAppIcon } from './Icons';

export function FAQ() {
  return (
    <section id="faq" className="section scroll-mt-24 bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Questions"
          title="Everything people ask before joining"
          subtitle="Still unsure about something? Ask it on WhatsApp — you will get a straight answer, not a sales pitch."
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-brand-100 rounded-3xl border border-brand-100 bg-sand px-2 shadow-soft">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={Math.min(index * 50, 250)}>
              <details className="group px-4 py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="text-[17px] leading-snug">{faq.q}</span>
                  <ChevronDownIcon className="h-5 w-5 shrink-0 text-brand-500 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="pb-5 pr-10 text-pretty text-[15px] leading-relaxed text-ink-soft">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-brand-50 p-6 text-center sm:p-8">
            <p className="font-display text-xl font-semibold text-ink">Still have a question?</p>
            <p className="mt-2 text-[15px] text-ink-soft">
              Message {site.founder} directly on {site.phoneDisplay}.
            </p>
            <a
              href={whatsappLink(`Hi ${site.founder}! I have a question about the classes: `)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-5"
              data-cta="faq-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Ask on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
