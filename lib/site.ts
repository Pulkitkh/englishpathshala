/**
 * ============================================================
 *  ENGLISH PATHSHALA — MAIN SETTINGS
 * ------------------------------------------------------------
 *  This is the ONE file you need to edit for day-to-day changes:
 *  phone number, links, prices, batch timings, stats.
 *  Text content (programs, testimonials, FAQs) lives in
 *  `lib/content.ts`.
 * ============================================================
 */

export const site = {
  name: 'English Pathshala',
  tagline: 'Bolna seekhiye, sirf padhna nahi.',
  founder: 'Bhavya Jain',
  founderRole: 'Founder & Lead Trainer, English Pathshala',

  /**
   * Founder photo. Drop a square-ish photo into /public (e.g. /public/bhavya.jpg)
   * and set this to '/bhavya.jpg'. Leave it empty and a clean initials card is
   * shown instead — but a real photo converts far better, so add one before launch.
   */
  founderPhoto: '',

  /** Used for SEO, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://englishpathshala.in',

  description:
    'Live online spoken English classes with Bhavya Jain. Small batches, daily speaking practice, and personal feedback — for students, job seekers and working professionals across India.',

  /** WhatsApp number in international format, digits only (no +, no spaces). */
  whatsappNumber: '919261804979',
  /** The same number, formatted nicely for display. */
  phoneDisplay: '+91 92618 04979',
  /** tel: link target. */
  phoneHref: '+919261804979',

  email: 'hello@englishpathshala.in',

  socials: {
    instagram: 'https://www.instagram.com/_englishpathshala_',
    instagramHandle: '@_englishpathshala_',
    youtube: '',
    facebook: '',
  },

  /** Shown in the trust bar under the hero. Update these as you grow. */
  stats: [
    { value: '500+', label: 'Students taught' },
    { value: '4.9★', label: 'Average rating' },
    { value: '12', label: 'Students per batch' },
    { value: '3', label: 'Months to fluency' },
  ],

  /** Live class details shown on the pricing / CTA cards. */
  batch: {
    mode: 'Live online on Zoom (recordings included)',
    duration: '60 minutes a day, Mon–Fri',
    nextStart: 'New batch starts on the 1st & 15th of every month',
    timings: ['7:00 AM – 8:00 AM', '6:30 PM – 7:30 PM', '9:00 PM – 10:00 PM'],
  },

  /** Set to false to hide the price on the site and only share it on WhatsApp. */
  showPricing: true,
} as const;

/** Default message pre-filled when someone taps a WhatsApp button. */
export const defaultWhatsAppMessage =
  `Hi ${site.founder}! I found English Pathshala on Instagram and I'd like to know more about the spoken English classes.`;

/**
 * Builds a wa.me link with a pre-filled message so you always know
 * where the lead came from.
 */
export function whatsappLink(message: string = defaultWhatsAppMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
