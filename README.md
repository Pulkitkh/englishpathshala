# English Pathshala

The website for **English Pathshala** — live online spoken English classes taught by
**Bhavya Jain**.

It is deliberately *not* a traditional company website. Traffic arrives from Instagram
already half-interested, so the whole page has one job: build trust fast, then hand the
visitor to WhatsApp. Every section ends in a WhatsApp button, and there is a floating
WhatsApp bubble that follows the visitor down the page.

```
Instagram  →  this website  →  WhatsApp  →  free demo class  →  student
```

---

## Quick start

```bash
npm install
cp .env.example .env.local     # then open it and set ADMIN_PASSWORD
npm run dev                    # http://localhost:3000
```

That is all you need. Enquiries are saved to `data/leads.json` until you add a database.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check, no build |

---

## What is on the site

| Route | Purpose |
| --- | --- |
| `/` | The single landing page — hero, courses, testimonials, founder story, enquiry form, FAQ |
| `/admin` | Private dashboard listing every enquiry (password protected) |
| `/privacy`, `/terms` | Privacy policy and refund/class terms |
| `/api/leads` | `POST` a new enquiry · `GET` all enquiries (admin only) |
| `/api/leads/[id]` | `PATCH` status/notes · `DELETE` (admin only) |
| `/api/admin/login`, `/api/admin/logout` | Dashboard session |
| `/api/admin/export` | Downloads all enquiries as CSV for Excel |
| `/api/health` | Health check — tells you which storage and notifications are active |
| `/opengraph-image` | Auto-generated link preview card for WhatsApp/Instagram shares |

---

## Editing the content (no coding needed)

Almost everything you will want to change lives in two files.

### `lib/site.ts` — the settings file
Phone number, WhatsApp number, Instagram link, email, stats shown under the hero, and the
preferred-timing windows offered in the enquiry form.

Prices are **hidden by default** (`showPricing: false`) so you can quote each student on
WhatsApp. To publish them instead, set `showPricing: true` and add a `price` to any course
in `lib/content.ts`.

### `lib/content.ts` — the words
Courses, testimonials, before/after stories, the "why us" points, the four "how it works"
steps, and the FAQ.

Each course carries a `formats` list — `['live']`, `['recorded']` or both. That drives the
badges on the course cards, so a course you only teach live simply lists `['live']`.

> ### ⚠️ Before you go live: replace the sample testimonials
> The testimonials, before/after stories and the "500+ students" figure in this repo are
> **placeholder examples** written to show the layout. They are not real students.
> Replace all of them with genuine quotes and real numbers before publishing.
> Publishing invented reviews is dishonest, and in India it also breaks the CCPA
> guidelines on fake reviews (BIS IS 19000:2022).

### Images to add
- **Logo** — `public/logo.svg` is a hand-drawn stand-in for your real logo. Replace that
  file (keep the name) with your actual logo file.
- **Founder photo** — drop a photo into `public/` (e.g. `public/bhavya.jpg`) and set
  `founderPhoto: '/bhavya.jpg'` in `lib/site.ts`. Until you do, a clean initials card
  shows instead. A real photo converts noticeably better — add one.
- **Student photos** — optional `photo: '/testimonials/riya.jpg'` on any testimonial.

---

## Where enquiries go

When someone submits the form, three things happen:

1. **It is saved** — to Postgres if `DATABASE_URL` is set, otherwise to `data/leads.json`.
   The record includes whether they want a live batch or the recorded course.
2. **You are notified** — by email and/or webhook, if you configured either (optional).
3. **The visitor is handed to WhatsApp** with a message already typed out for them.

Step 3 is the important one, and it works even if steps 1 and 2 fail. A dead database can
never cost you a student.

### Storage

| Situation | What to set |
| --- | --- |
| Local development, or a VPS you control | Nothing. Enquiries go to `data/leads.json` |
| Vercel / Netlify / any serverless host | **Set `DATABASE_URL`** — their filesystems are read-only, so file storage silently does nothing |

Any Postgres works. Free options: [Neon](https://neon.tech), [Supabase](https://supabase.com),
[Railway](https://railway.app). Paste the connection string into `DATABASE_URL` and the
`leads` table is created automatically on first use.

### Notifications (both optional)

```bash
RESEND_API_KEY=re_xxx                 # free tier at resend.com
NOTIFY_EMAIL_TO=bhavya@example.com    # emails you every enquiry
LEAD_WEBHOOK_URL=https://...          # POSTs the lead as JSON to Zapier / Sheets / n8n
```

---

## The admin dashboard

Go to `/admin` and enter your `ADMIN_PASSWORD`. You can:

- see every enquiry with the course, chosen format (live or recorded), level, preferred
  timing and where they came from
- open WhatsApp or call them in one tap
- mark each one **New → Contacted → Enrolled / Dropped**
- search by name, number or course
- export everything to CSV

Choose a long password — anyone who has it can read your students' phone numbers.
The dashboard is excluded from Google in `robots.ts`.

---

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to your real domain on any host, or link previews and the
sitemap will point at the wrong place.

### Vercel (easiest)
1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — it detects Next.js on its own.
3. Add environment variables: `NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD`, `DATABASE_URL`.
4. Deploy, then add your domain under **Settings → Domains**.

### Netlify
Same flow — `netlify.toml` in this repo already sets the build command and the Next.js
plugin. Add the same environment variables under **Site settings → Environment variables**.

### A VPS (Hostinger, DigitalOcean, Contabo…)
```bash
npm ci && npm run build
npm run start          # listens on port 3000
```
Put Nginx or Caddy in front for HTTPS, and keep it running with `pm2` or a systemd unit.
Here you can skip `DATABASE_URL` — `data/leads.json` works fine. Back that file up.

### After deploying, check these
- `https://yourdomain.com/api/health` → shows storage and notification status
- Submit a test enquiry, then confirm it appears in `/admin`
- Paste your homepage link into a WhatsApp chat — the preview card should appear
- Open the site on your phone and tap every WhatsApp button

---

## Tracking which Instagram post is working

The form records where each visitor came from. Add UTM tags to the links in your bio or
stories and the source shows up next to every enquiry in the dashboard:

```
https://yourdomain.com/?utm_source=instagram&utm_campaign=reel_interview_tips
```

---

## Tech

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Zod validation · Postgres or JSON
file storage. No tracking scripts, no cookie banner, no third-party account required to
run it.

Security basics that are already handled: server-side validation on every field, a
honeypot and per-IP rate limiting on the enquiry form, rate-limited admin login with an
HMAC-signed session cookie, CSV export hardened against spreadsheet formula injection,
and `data/*.json` git-ignored so student phone numbers never reach GitHub.
