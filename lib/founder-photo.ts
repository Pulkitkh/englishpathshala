/**
 * Finds Bhavya's photo without you having to edit any code.
 *
 * Drop a photo into the `public/` folder named `bhavya.jpg` (or .jpeg / .png
 * / .webp — `founder.*` works too) and it appears on the site automatically.
 * Until then, a clean initials card is shown instead, so the site never
 * renders a broken image.
 *
 * If you would rather name the file something else, just set `founderPhoto`
 * in lib/site.ts and that wins.
 *
 * Server-only: this runs while the page is built, never in the browser.
 */

import fs from 'fs';
import path from 'path';
import { site } from './site';

const CANDIDATES = [
  'bhavya.jpg',
  'bhavya.jpeg',
  'bhavya.png',
  'bhavya.webp',
  'founder.jpg',
  'founder.jpeg',
  'founder.png',
  'founder.webp',
];

export function getFounderPhoto(): string | null {
  // An explicit setting always wins.
  if (site.founderPhoto) return site.founderPhoto;

  try {
    for (const name of CANDIDATES) {
      if (fs.existsSync(path.join(process.cwd(), 'public', name))) {
        return `/${name}`;
      }
    }
  } catch {
    // Some hosts restrict filesystem access at request time. Falling through
    // to the initials card is always safe.
  }

  return null;
}
