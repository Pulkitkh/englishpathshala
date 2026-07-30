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

**Bhavya's photo — just drop the file in, no code to edit.**
Save the photo as **`public/bhavya.jpg`** (`.png` and `.webp` also work) and it appears
automatically in two places: the large portrait in the "Meet the founder" section, and the
host tile in the live-class card at the top of the page. Until the file exists, a clean
initials card is shown instead, so the site never displays a broken image.

- **Best photo to use:** a portrait (taller than wide), roughly 1000×1500 pixels, with the
  face in the upper third and a plain background. Keep it under about 500 KB — Next.js
  compresses and resizes it for each screen automatically.
- **If the crop cuts off the head or shows too much floor**, adjust one line in
  `lib/site.ts`:
  ```ts
  founderPhotoPosition: '50% 20%',   // second number = how far down the crop sits
  ```
  Lower it (`10%`) to pull the crop up, raise it (`35%`) to push it down.
- **Different filename?** Set `founderPhoto: '/your-file.jpg'` in `lib/site.ts` and that
  takes priority over the automatic lookup.

**Logo** — `public/logo.svg` is a hand-drawn stand-in for the real logo. Replace that file,
keeping the same name, with the actual logo.

**Student photos** — optional `photo: '/testimonials/riya.jpg'` on any testimonial.

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

## Deploying for free (recommended)

Everything below costs **₹0 per month**. The only recurring cost is the domain renewal.

| Piece | Service | Cost | Why |
| --- | --- | --- | --- |
| The website | **Netlify** free tier | ₹0 | Runs Next.js properly, free HTTPS, commercial use allowed |
| The database | **Neon** free tier | ₹0 | Netlify's disk is read-only, so enquiries need a database |
| The domain | Hostinger | already bought | Just point it at Netlify |
| Email alerts | **Resend** free tier | ₹0 | Optional — 3,000 emails/month |

> **Why not Vercel?** It is marginally better for Next.js, but its free Hobby plan is
> licensed for **non-commercial** use only. This site sells courses, so Netlify's free
> tier — which does allow commercial use — is the correct free option.

### Step 1 — Put the code on GitHub
The repo is already pushed. Just make sure the branch you want to deploy is up to date.

### Step 2 — Create the free database (5 minutes)
1. Sign up at [neon.tech](https://neon.tech) with GitHub. No card needed.
2. Create a project — any name, and pick the **Singapore** region (closest to India).
3. Copy the **connection string**. It looks like:
   ```
   postgresql://user:password@ep-something-123.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Keep that tab open — you paste this into Netlify next.

The `leads` table creates itself the first time someone submits the form. Nothing to set up.

> Neon's free database goes to sleep after a few minutes of no traffic, so the very first
> enquiry after a quiet spell takes about an extra second to save. Nobody notices, and the
> visitor is handed to WhatsApp regardless.

### Step 3 — Deploy on Netlify (5 minutes)
1. Sign up at [netlify.com](https://netlify.com) with GitHub.
2. **Add new site → Import an existing project → GitHub**, and pick this repo.
3. Leave the build settings alone — `netlify.toml` in this repo already sets them.
4. Before clicking deploy, open **Environment variables** and add:

   | Key | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://englishpathshala.online` |
   | `ADMIN_PASSWORD` | a long password you invent — this guards student phone numbers |
   | `DATABASE_URL` | the Neon connection string from step 2 |

5. Deploy. You get a temporary address like `random-name-123.netlify.app` — open it and
   check the site works before touching the domain.

### Step 4 — Point the Hostinger domain at Netlify
In Netlify: **Domain management → Add a domain →** type `englishpathshala.online`.

Netlify then offers two ways. **Use the nameserver method** — it is fewer steps and it
handles the certificate and the `www` redirect for you:

1. Netlify shows you four nameservers, like `dns1.p03.nsone.net`, `dns2.p03.nsone.net`, …
   Copy all four exactly as shown (yours will differ from this example).
2. In Hostinger: **Domains → englishpathshala.online → DNS / Nameservers → Change
   nameservers → Use custom nameservers**, and paste the four in.
3. Save. DNS changes take anywhere from 15 minutes to a few hours to spread worldwide.

Once it resolves, Netlify issues a free Let's Encrypt HTTPS certificate automatically.
Do not pay Hostinger for an SSL certificate — you do not need one.

> Prefer to keep DNS at Hostinger? Then use the records Netlify's **"Add DNS records"**
> panel shows you — an `A` record for the root domain pointing at Netlify's load balancer,
> and a `CNAME` for `www` pointing at your `.netlify.app` address. Read the values off that
> panel rather than copying them from any guide, including this one — they do change.

### Step 5 — Optional email alerts
Without this, new enquiries still reach you on WhatsApp and appear in `/admin`. If you also
want an email for each one: sign up at [resend.com](https://resend.com), create an API key,
and add `RESEND_API_KEY` and `NOTIFY_EMAIL_TO` in Netlify's environment variables.

### After deploying, check these
- `https://englishpathshala.online/api/health` → should say `"storage": "postgres"`.
  If it says `json-file`, your `DATABASE_URL` did not get picked up.
- Submit a test enquiry, then confirm it appears at `/admin`
- Paste your homepage link into a WhatsApp chat — the preview card should appear
- Open the site on your phone and tap every WhatsApp button
- Delete your test enquiry from `/admin` when you are done

### Changing the site later
Edit `lib/site.ts` or `lib/content.ts`, commit, and push to GitHub. Netlify rebuilds and
publishes within a couple of minutes on its own. There is nothing to upload by hand.

---

## Other hosting options

### A VPS (Hostinger VPS, DigitalOcean, Contabo…) — roughly ₹400–600/month
Worth it only if you want everything in one account, or you outgrow the free tiers.
```bash
npm ci && npm run build
npm run start          # listens on port 3000
```
Put Nginx or Caddy in front for HTTPS, and keep it running with `pm2` or a systemd unit.
Here you can skip `DATABASE_URL` entirely — `data/leads.json` works, because a VPS has a
real writable disk. Back that file up.

### What will NOT work
Hostinger's shared **Web Hosting** / cPanel plans are built for PHP and WordPress. This is
a Node.js application, so uploading the files there will not run it. The "free coming soon
page or link in bio site" bundled with the domain is also unrelated — that is a one-page
placeholder, not this website.

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
