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

/**
 * Every course is offered in one or both formats:
 *   'live'     — a live batch on Zoom with a teacher and other students
 *   'recorded' — a pre-recorded course the student buys and works through
 *                at their own pace
 */
export type CourseFormat = 'live' | 'recorded';

export const formatLabels: Record<CourseFormat, string> = {
  live: 'Live batch',
  recorded: 'Recorded course',
};

export type Program = {
  slug: string;
  icon: string;
  title: string;
  who: string;
  blurb: string;
  outcomes: string[];
  duration: string;
  formats: CourseFormat[];
  /** Only shown when `showPricing` is true in lib/site.ts. */
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
    duration: 'About 3 months • 1 hour a day',
    formats: ['live', 'recorded'],
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
      '1-on-1 mock interviews with detailed feedback',
      'Group discussion practice',
      'Email and resume language cleanup',
    ],
    duration: 'About 6 weeks • 1 hour a day',
    formats: ['live', 'recorded'],
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
      'Early-morning and late-evening batches for working hours',
    ],
    duration: 'About 2 months • 3 days a week',
    formats: ['live', 'recorded'],
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
    duration: 'About 3 months • 3 days a week',
    formats: ['live'],
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
      'I used to shake before speaking in class. After two months with Bhavya sir I gave a presentation in front of 60 people. The daily speaking practice is what changed everything for me.',
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
      'Group discussions were my weakest point. Sir made us do one every single Friday. That practice got me through my GD-PI round.',
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
    body: 'Tell us your current level, what you want to fix, and which timings suit you. No call centre — you talk to a real person.',
  },
  {
    step: '02',
    title: 'Free level check + demo class',
    body: 'A 20-minute conversation to see where you actually stand, then a free demo class so you can try the teacher and the batch before paying.',
  },
  {
    step: '03',
    title: 'Pick live or recorded',
    body: 'Join a live batch of at most 12 students, or buy the recorded course and learn at your own pace. Many students do both.',
  },
  {
    step: '04',
    title: 'Speak with confidence',
    body: 'Weekly feedback, monthly progress checks, and a WhatsApp practice group that keeps you accountable between classes.',
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
    icon: '🗓️',
    title: 'Timings decided around you',
    body: 'There is no fixed intake date. A new batch opens as soon as a small group with matching timings is ready, so you learn at an hour that actually fits your day.',
  },
  {
    icon: '👩‍🏫',
    title: 'Male and female teachers',
    body: 'Our faculty includes both male and female teachers. Tell us who you would be more comfortable practising with, and you are placed with them.',
  },
];

export const faqs = [
  {
    q: 'I am a complete beginner. Will I be able to keep up?',
    a: 'Yes. The Foundation course is built for people who cannot make a full sentence yet. We start with sounds and everyday phrases, and the first two weeks are almost entirely spoken practice. Around half of every batch starts from zero.',
  },
  {
    q: 'Are the classes live or recorded?',
    a: 'Both are available, and they are two separate things. Live batches run on Zoom with a teacher and a small group — these sessions are not recorded, so everyone can speak and make mistakes freely. Separately, we sell pre-recorded courses you can buy and work through at your own pace. Pick whichever suits you, or use the recorded course alongside a live batch.',
  },
  {
    q: 'What is the difference between the live batch and the recorded course?',
    a: 'The live batch gives you speaking time, correction in the moment, a teacher who notices when you go quiet, and classmates to practise with. The recorded course gives you the same lessons and material at your own speed and price, but you practise alone. If your problem is hesitation while speaking, the live batch is what fixes it.',
  },
  {
    q: 'Can I choose a male or a female teacher?',
    a: 'Yes. Our faculty has both male and female teachers, and classes are divided among them based on what each student needs and is comfortable with. Tell us your preference when you message and we will place you accordingly.',
  },
  {
    q: 'How big is a live batch?',
    a: 'Maximum 12 students, because speaking time per student is the whole product. If a batch is full you simply go into the next one — and since new batches open whenever there is a group ready, that is rarely a long wait.',
  },
  {
    q: 'When does the next batch start?',
    a: 'There is no fixed intake date. A new batch opens as soon as a small group with matching timings is ready, so the honest answer depends on the timing you want. Message us with the hours that suit you and you will be told exactly what is starting and when. The recorded courses, of course, you can start the same day.',
  },
  {
    q: 'Is there a free demo class?',
    a: 'Yes. Message on WhatsApp and you will get a free level check plus one full demo class with a running batch, before paying anything. It is also the easiest way to see whether the teacher suits you.',
  },
  {
    q: 'What if I miss classes because of work or college?',
    a: 'Live classes are not recorded — that is deliberate, so students speak freely without a camera archive. If you miss a day, your teacher shares the notes and a short catch-up task, and you can ask your doubts in the batch group. If your schedule changes permanently, you can shift to another batch or move to the recorded course.',
  },
  {
    q: 'Do you teach IELTS or TOEFL?',
    a: 'The current focus is spoken English, interview preparation and business English. For exam-specific coaching, message on WhatsApp — if it is not the right fit we will tell you honestly.',
  },
  {
    q: 'What does it cost, and is there a refund?',
    a: 'Fees depend on the course and whether you want the live batch or the recorded version, so they are shared on WhatsApp rather than published — you will get a straight number, not a sales pitch. Live batch fees are paid by UPI or bank transfer after your free demo class. If you attend the first week and feel it is not working for you, tell us before the 7th day and the month is refunded in full.',
  },
  {
    q: 'How long before I actually see a difference?',
    a: 'Most students notice hesitation dropping in 3–4 weeks. Comfortable everyday conversation typically takes about 3 months of regular attendance and daily practice. Anyone promising fluency in 15 days is selling you something.',
  },
];
