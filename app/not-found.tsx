import Link from 'next/link';
import { site, whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from '@/components/Icons';

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-16 text-center">
      <div className="max-w-md">
        <p className="font-display text-6xl font-semibold text-brand-200">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">This page took a day off</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          The link you followed doesn&apos;t exist any more. Head back to the homepage, or just
          message {site.founder} — that is the fastest route anyway.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to homepage
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
