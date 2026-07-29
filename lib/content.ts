/**
 * ============================================================
 *  WEBSITE CONTENT
 * ------------------------------------------------------------
 *  Programs, testimonials, results and FAQs.
 *
 *  ⚠️  IMPORTANT — READ BEFORE GOING LIVE
 *  The testimonials and result numbers below are PLACEHOLDER
 *  EXAMPLES written to show the layout. They are NOT real
 *  students. Replace every one of them with real quotes,
 *  real names and real screenshots from your students before
 *  you publish the site. Publishing invented reviews is both
 *  dishonest and, in India, a violation of the CCPA guidelines
 *  on fake reviews (BIS IS 19000:2022).
 * ============================================================
 */

export type Program = {
  slug: string;
  icon: string;
  title: string;
  who: string;
  blurb: string;
  outcomes: string[];
  duration: string;
  price?: string;
  popular?: boolean;
};

export const programs: Program[] = [
  {
    slug: 'spoken-english',
    icon: '🗣️',
    title: 'Spoken English Foundation',
    who: 'For beginners who freeze up while speaking',
    blurb:
      'Start from zero hesitation. We fix the fear first, grammar second — so you are speaking full sentences from week one, not memorising rules.',
    outcomes: [
      'Daily 20-minute speaking practice in class',
      'Everyday vocabulary you will actually use',
      'Grammar taught through conversation, not lectures',
      'Pronunciation and accent clarity drills',
    ],
    duration: '3 months • Mon–Fri • 1 hour/day',
    price: '₹2,499/month',
    popular: true,
  },
  {
    slug: 'interview-prep',
    icon: '💼',
    title: 'Interview & Job-Ready English',
    who: 'For job seekers and campus placements',
    blurb:
      'Walk into your interview knowing exactly what to say. Mock interviews, HR answers, self-introduction and confident body language.',
    outcomes: [
      'Tell-me-about-yourself, scripted and rehearsed',
      '1-on-1 mock interviews with recorded feedback',
      'Group discussion practice',
      'Email and resume language cleanup',
    ],
    duration: '6 weeks • Mon–Fri • 1 hour/day',
    price: '₹3,499 (full course)',
  },
  {
    slug: 'professionals',
    icon: '📈',
    title: 'Business English for Professionals',
    who: 'For working professionals and team leads',
    blurb:
      'Speak up in meetings, present without notes, and write emails that get replies. Built around real workplace situations.',
    outcomes: [
      'Meeting and presentation practice',
      'Professional email and chat etiquette',
      'Client calls and negotiation phrases',
      'Flexible early-morning and late-evening batches',
    ],
    duration: '2 months • Mon/Wed/Fri • 1 hour',
    price: '₹3,999/month',
  },
  {
    slug: 'kids',
    icon: '🎒',
    title: 'Junior Pathshala (Class 5–10)',
    who: 'For school students',
    blurb:
      'Grammar, reading and confident speaking for school kids — taught with stories, games and lots of encouragement.',
    outcomes: [
      'School grammar made simple',
      'Reading comprehension and writing skills',
      'Stage confidence and presentation practice',
      'Monthly progress report for parents',
    ],
    duration: '3 months • Mon/Wed/Fri • 45 min',
    price: '₹1,999/month',
  },
];

export type Testimonial = {
  name: string;
  role: string;
  city: string;
  quote: string;
  rating: number;
  /** Optional: put a photo in /public/testimonials/ and reference it here. */
  photo?: string;
  initials: string;
};

/** ⚠️ PLACEHOLDER EXAMPLES — replace with real student quotes before launch. */
export const testimonials: Testimonial[] = [
  {
    name: 'Riya Sharma',
    role: 'B.Com Student',
    city: 'Jaipur',
    quote:
      'I used to shake before speaking in class. After two months with Bhavya ma\'am I gave a presentation in front of 60 people. The daily speaking practice is what changed everything for me.',
    rating: 5,
    initials: 'RS',
  },
  {
    name: 'Aman Verma',
    role: 'Software Engineer',
    city: 'Pune',
    quote:
      'The mock interviews were brutal in the best way. I got feedback on every filler word I used. Cleared my TCS interview in the first attempt.',
    rating: 5,
    initials: 'AV',
  },
  {
    name: 'Pooja Nair',
    role: 'Homemaker',
    city: 'Indore',
    quote:
      'I joined at 38 thinking it was too late. The batch was small and nobody ever laughed at my mistakes. Now I speak to my daughter\'s teachers in English without any fear.',
    rating: 5,
    initials: 'PN',
  },
  {
    name: 'Sahil Khan',
    role: 'MBA Aspirant',
    city: 'Lucknow',
    quote:
      'Group discussions were my weakest point. Ma\'am made us do one every single Friday. That practice got me through my GD-PI round.',
    rating: 5,
    initials: 'SK',
  },
  {
    name: 'Meenakshi Rao',
    role: 'Class 10 Student',
    city: 'Hyderabad',
    quote:
      'My English marks went from 62 to 88. But the bigger thing is I actually enjoy reading now. The classes never feel boring.',
    rating: 5,
    initials: 'MR',
  },
  {
    name: 'Devendra Singh',
    role: 'Bank Employee',
    city: 'Kota',
    quote:
      'Early morning 7 AM batch fit perfectly before my shift. Six months in, I handle customer calls in English every day without preparing a script.',
    rating: 5,
    initials: 'DS',
  },
];

export type Transformation = {
  name: string;
  before: string;
  after: string;
  weeks: number;
};

/** ⚠️ PLACEHOLDER EXAMPLES — replace with real student journeys. */
export const transformations: Transformation[] = [
  {
    name: 'Riya, 20',
    before: 'Could not introduce herself for 30 seconds without switching to Hindi.',
    after: 'Hosted her college farewell event entirely in English.',
    weeks: 12,
  },
  {
    name: 'Aman, 26',
    before: 'Failed three interviews because of nervous, broken answers.',
    after: 'Cleared an IT interview and negotiated his own salary.',
    weeks: 8,
  },
  {
    name: 'Pooja, 38',
    before: 'Avoided parent-teacher meetings out of embarrassment.',
    after: 'Speaks confidently with teachers and helps her daughter study.',
    weeks: 16,
  },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Message on WhatsApp',
    body: 'Tell me your current level and what you want to fix. No forms, no sales calls — you talk directly to me.',
  },
  {
    step: '02',
    title: 'Free level check + demo class',
    body: 'A 20-minute conversation to see where you actually stand, followed by a free demo class with the live batch.',
  },
  {
    step: '03',
    title: 'Join a small batch',
    body: 'Maximum 12 students, so everyone speaks every single day. Recordings for the days you miss.',
  },
  {
    step: '04',
    title: 'Speak with confidence',
    body: 'Weekly feedback, monthly progress checks, and a WhatsApp practice group that keeps you accountable.',
  },
];

export const differentiators = [
  {
    icon: '🎯',
    title: 'You speak, every single class',
    body: 'No silent listening. Every student gets speaking time in every session — that is the whole point of a 12-student cap.',
  },
  {
    icon: '🫶',
    title: 'A judgement-free classroom',
    body: 'Mistakes are the syllabus here. Nobody is corrected harshly, and nobody is ever laughed at.',
  },
  {
    icon: '🇮🇳',
    title: 'Taught in Hindi + English',
    body: 'Concepts explained in the language you think in, practised in the language you want to speak.',
  },
  {
    icon: '📱',
    title: 'Practice beyond the class',
    body: 'Daily tasks in the WhatsApp group, voice-note corrections, and doubt clearing between sessions.',
  },
  {
    icon: '🎥',
    title: 'Miss a class, not a lesson',
    body: 'Every session is recorded and shared with the batch the same day.',
  },
  {
    icon: '👩‍🏫',
    title: 'Taught by me, not by an assistant',
    body: 'Every class in every batch is taken personally by Bhavya. That is why batch sizes stay small.',
  },
];

export const faqs = [
  {
    q: 'I am a complete beginner. Will I be able to keep up?',
    a: 'Yes. The Foundation batch is built for people who cannot make a full sentence yet. We start with sounds and everyday phrases, and the first two weeks are almost entirely spoken practice. Around half of every batch starts from zero.',
  },
  {
    q: 'Are the classes live or recorded?',
    a: 'Every class is live on Zoom so you can talk, ask questions and get corrected in real time. Recordings are shared afterwards so you can revise or catch up if you miss a day.',
  },
  {
    q: 'How big is a batch?',
    a: 'Maximum 12 students. This is a hard limit — if a batch is full, you go into the next one rather than getting squeezed in, because speaking time per student is the whole product.',
  },
  {
    q: 'Is there a free demo class?',
    a: 'Yes. Message on WhatsApp and you will get a free level check plus one full demo class with a running batch, before paying anything.',
  },
  {
    q: 'What if I miss classes because of work or college?',
    a: 'Send a message in the batch group and you get the recording plus a short catch-up task. If your schedule changes permanently, you can shift to the morning or night batch.',
  },
  {
    q: 'Do you teach IELTS or TOEFL?',
    a: 'The current focus is spoken English, interview preparation and business English. For exam-specific coaching, message on WhatsApp — if it is not the right fit I will tell you honestly.',
  },
  {
    q: 'How do I pay, and is there a refund?',
    a: 'Fees are paid monthly by UPI or bank transfer after your demo class. If you attend the first week and feel it is not working for you, tell me before the 7th day and the month is refunded in full.',
  },
  {
    q: 'How long before I actually see a difference?',
    a: 'Most students notice hesitation dropping in 3–4 weeks. Comfortable everyday conversation typically takes about 3 months of regular attendance and daily practice. Anyone promising fluency in 15 days is selling you something.',
  },
];
