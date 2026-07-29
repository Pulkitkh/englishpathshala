import { z } from 'zod';

/** Accepts 10-digit Indian mobiles as well as +91/0 prefixed and spaced forms. */
const phoneRegex = /^(\+?\d{1,3}[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name')
    .max(80, 'That name is a little too long'),
  phone: z
    .string()
    .trim()
    .min(10, 'Please enter a valid mobile number')
    .max(20, 'Please enter a valid mobile number')
    .refine((v) => phoneRegex.test(v.replace(/[()]/g, '')), 'Please enter a valid mobile number'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email')
    .max(120)
    .optional()
    .or(z.literal('')),
  program: z.string().trim().min(1, 'Please pick a course').max(80),
  level: z.string().trim().min(1, 'Please pick your current level').max(80),
  goal: z.string().trim().max(600, 'Please keep this under 600 characters').optional().or(z.literal('')),
  preferredTime: z.string().trim().max(80).optional().or(z.literal('')),
  source: z.string().trim().max(120).optional().or(z.literal('')),
  /**
   * Honeypot — real users never fill this, bots usually do. It is accepted by
   * the schema on purpose: the route handler checks it and returns a fake
   * success, so a bot never learns it was caught.
   */
  website: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Normalises whatever the visitor typed into a clean +91XXXXXXXXXX-ish string. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 11 && digits.startsWith('0')) return `+91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  return `+${digits}`;
}
