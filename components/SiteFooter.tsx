import Link from 'next/link';
import { programs } from '@/lib/content';
import { site, whatsappLink } from '@/lib/site';
import { Logo } from './Logo';
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from './Icons';

const quickLinks = [
  { href: '/#courses', label: 'Courses' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#results', label: 'Student stories' },
  { href: '/#about', label: 'About Bhavya' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#enquiry', label: 'Book a free demo' },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-soft">
              Live online spoken English classes and recorded courses from {site.founder} and his
              team. Small batches, daily speaking practice, zero judgement.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-whatsapp text-white transition hover:bg-whatsapp-dark"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100"
                aria-label="Call"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-links">
            <h2 id="footer-links" className="text-sm font-bold uppercase tracking-wider text-ink">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] text-ink-soft transition hover:text-brand-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-courses">
            <h2 id="footer-courses" className="text-sm font-bold uppercase tracking-wider text-ink">
              Courses
            </h2>
            <ul className="mt-4 space-y-2.5">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link
                    href="/#courses"
                    className="text-[15px] text-ink-soft transition hover:text-brand-700"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Get in touch</h2>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ink-soft">
              <li>
                <a href={`tel:${site.phoneHref}`} className="transition hover:text-brand-700">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-brand-700">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-brand-700"
                >
                  {site.socials.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-100 pt-7 sm:flex-row">
          <p className="text-sm text-ink-muted">
            © {year} {site.name}. Made with care by {site.founder}.
          </p>
          <div className="flex gap-5 text-sm text-ink-muted">
            <Link href="/privacy" className="transition hover:text-brand-700">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-brand-700">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
