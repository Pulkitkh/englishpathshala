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
   * Founder photo.
   *
   * Easiest way: just drop the photo into the /public folder and name it
   * `bhavya.jpg` (.png and .webp also work). It is picked up automatically —
   * you do not need to touch this line at all.
   *
   * Only set this if you want to use a different filename, e.g. '/team/bj.jpg'.
   * With no photo present, a clean initials card is shown instead.
   */
  founderPhoto: '',

  /**
   * How the photo sits inside its frame, since portraits get cropped to fit.
   * '50% 20%' keeps the face high in the frame, which suits a standing shot.
   * Raise the second number to pull the crop down, lower it to pull it up.
   */
  founderPhotoPosition: '50% 20%',

  /** Used for SEO, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://englishpathshala.online',

  description:
    'Live online spoken English classes with Bhavya Jain. Small batches, daily speaking practice, and personal feedback — for students, job seekers and working professionals across India.',

  /** WhatsApp number in international format, digits only (no +, no spaces). */
  whatsappNumber: '919261804979',
  /** The same number, formatted nicely for display. */
  phoneDisplay: '+91 92618 04979',
  /** tel: link target. */
  phoneHref: '+919261804979',

  email: 'hello@englishpathshala.online',

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

  /** Live batch details shown on the course and CTA cards. */
  batch: {
    mode: 'Live online on Zoom',
    duration: 'Around an hour a day, on the days your batch picks',
    /**
     * Broad windows rather than fixed slots — a new batch opens as soon as a
     * small group with matching timings is ready, so the timing is agreed with
     * the students in it.
     */
    timings: [
      'Early morning (6 – 9 AM)',
      'Late morning (9 AM – 12 PM)',
      'Afternoon (12 – 5 PM)',
      'Evening (5 – 9 PM)',
      'Night (9 – 11 PM)',
      'Weekends only',
    ],
  },

  /**
   * Prices are shared personally on WhatsApp rather than published, since the
   * fee depends on the course, the format and the batch. Flip this to true and
   * fill in `price` on any course in lib/content.ts to show them on the cards.
   */
  showPricing: false,
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
