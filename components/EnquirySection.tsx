import { site, whatsappLink } from '@/lib/site';
import { LeadForm } from './LeadForm';
import { Reveal } from './Reveal';
import { CheckIcon, ClockIcon, PhoneIcon, UsersIcon, VideoIcon, WhatsAppIcon } from './Icons';

const reassurances = [
  'A free 20-minute level check before anything else',
  'One full live class with a running batch — free',
  'Live batch or recorded course, whichever suits you',
  'You only pay after you have decided it works for you',
  'Full refund if you tell us within the first week',
];

export function EnquirySection() {
  return (
    <section id="enquiry" className="section scroll-mt-24 bg-sand">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
          <Reveal>
            <span className="eyebrow">Free demo class</span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              Try one class.
              <br />
              <span className="text-brand-600">Then decide.</span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">
              Fill this in and you&apos;ll be handed straight to WhatsApp with your message ready.
              Or skip the form entirely and message {site.founder} directly — both reach the same phone.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-8 space-y-3">
              {reassurances.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-ink-soft">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-whatsapp/10 text-whatsapp-dark">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <InfoTile
                icon={<VideoIcon className="h-5 w-5" />}
                label="Formats"
                value="Live batch or recorded course"
              />
              <InfoTile
                icon={<ClockIcon className="h-5 w-5" />}
                label="Timings"
                value="Flexible — batches open around students"
              />
              <InfoTile icon={<UsersIcon className="h-5 w-5" />} label="Batch size" value="Maximum 12 students" />
              <InfoTile
                icon={<PhoneIcon className="h-5 w-5" />}
                label="Talk to us"
                value={site.phoneDisplay}
                href={`tel:${site.phoneHref}`}
              />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-6 w-full sm:w-auto"
              data-cta="enquiry-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Skip the form, message on WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}

function InfoTile({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</span>
        <span className="block text-sm font-medium leading-snug text-ink">{value}</span>
      </span>
    </>
  );

  const className =
    'flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-4 shadow-soft transition hover:border-brand-300';

  return href ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}
