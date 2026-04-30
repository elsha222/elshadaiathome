# ELIZA Healthcare — Complete Website Documentation

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Local Development Setup](#2-local-development-setup)
3. [Deploy to GitHub Pages (Step-by-Step)](#3-deploy-to-github-pages-step-by-step)
4. [Environment Variables & Email Setup](#4-environment-variables--email-setup)
5. [SEO — What's Already Done](#5-seo--whats-already-done)
6. [SEO — What You Must Do Next](#6-seo--what-you-must-do-next)
7. [Performance Optimizations](#7-performance-optimizations)
8. [Trust & Conversion Improvements](#8-trust--conversion-improvements)
9. [Alternative Hosting (Netlify / Vercel / Cloudflare Pages)](#9-alternative-hosting-netlify--vercel--cloudflare-pages)
10. [Nice-to-Have Features](#10-nice-to-have-features)
11. [Updating Content](#11-updating-content)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Project Overview

| Item | Detail |
|------|--------|
| Framework | React 19 + TanStack Router (SPA) |
| Styling | Tailwind CSS v4 |
| Build tool | Vite 7 |
| Email | Brevo (Sendinblue) transactional API |
| CRM | Google Sheets via Apps Script webhook |
| Hosting | GitHub Pages (via GitHub Actions CI/CD) |
| Domain target | `elizahealthcare.in` |

---

## 2. Local Development Setup

```bash
# 1. Clone the repo
git clone https://github.com/elsha222/elshadaiathome.git
cd elshadaiathome

# 2. Install dependencies
npm install

# 3. Copy env file and fill in your keys
cp .env.example .env
# Edit .env — add your Brevo API key and Google Sheets URL

# 4. Start dev server
npm run dev
# Opens at http://localhost:8080
```

---

## 3. Deploy to GitHub Pages (Step-by-Step)

### 3.1 — First-time Git setup (run once)

```bash
cd "path/to/eliza-care-blueprint-main"

git init
git add .
git commit -m "Initial commit — ELIZA Healthcare website"
git branch -M main
git remote add origin https://github.com/elsha222/elshadaiathome.git
git push -u origin main
```

### 3.2 — Enable GitHub Pages in repo settings

1. Go to `https://github.com/elsha222/elshadaiathome`
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Save

### 3.3 — Add secrets (for email to work in production)

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:

| Secret Name | Value |
|-------------|-------|
| `VITE_BREVO_API_KEY` | Your Brevo API key from `.env` |
| `VITE_SHEETS_WEBHOOK_URL` | Your Google Sheets webhook URL from `.env` |

### 3.4 — Trigger deployment

Every `git push` to `main` auto-deploys. Or go to **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.

Your site will be live at: `https://elsha222.github.io/elshadaiathome/`

### 3.5 — Connect custom domain `elizahealthcare.in`

1. In repo **Settings** → **Pages** → **Custom domain** → enter `elizahealthcare.in`
2. At your domain registrar (GoDaddy / Namecheap / etc.), add these DNS records:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     elsha222.github.io
```

3. Check **Enforce HTTPS** in GitHub Pages settings (after DNS propagates ~24h)

> **Important:** Once you have a custom domain, update `base: "/"` in `vite.config.ts` (already set correctly).
> If you're using the subdirectory URL `elsha222.github.io/elshadaiathome/`, change `base` to `"/elshadaiathome/"`.

### 3.6 — Subsequent deployments

```bash
# Make changes, then:
git add .
git commit -m "Update: describe what changed"
git push
# GitHub Actions auto-builds and deploys in ~2 minutes
```

---

## 4. Environment Variables & Email Setup

### 4.1 — Brevo (Email) Setup

1. Sign up free at [app.brevo.com](https://app.brevo.com)
2. Go to **Settings** → **SMTP & API** → **API Keys** → **Create a new API key**
3. Copy the key → paste into `.env` as `VITE_BREVO_API_KEY`
4. Also add it as a GitHub Secret (see 3.3 above)
5. In Brevo, verify your sender email `care@elizahealthcare.in` under **Senders & IPs**

**Test email works:** Fill the booking form on localhost — you should receive an email at `care@elizahealthcare.in`.

### 4.2 — Google Sheets (CRM) Setup

1. Create a new Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Paste this script:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.city,
    data.service,
    data.duration,
    data.date,
    data.notes
  ]);
  return ContentService.createTextOutput("OK");
}
```

4. Click **Deploy** → **New deployment** → **Web app**
5. Set **Execute as**: Me, **Who has access**: Anyone
6. Copy the Web App URL → paste into `.env` as `VITE_SHEETS_WEBHOOK_URL`
7. Add it as a GitHub Secret too

---

## 5. SEO — What's Already Done

✅ Unique `<title>` and `<meta description>` on every page  
✅ SEO keywords meta tag on all pages  
✅ Open Graph tags (Facebook, WhatsApp preview)  
✅ Twitter Card tags  
✅ Canonical URLs on all pages  
✅ `robots.txt` — allows all, blocks `/thank-you`  
✅ `sitemap.xml` — all pages with priorities  
✅ Schema.org structured data:
  - `MedicalBusiness` + `LocalBusiness` on homepage
  - `FAQPage` schema (boosts FAQ rich results in Google)
  - `MedicalProcedure` on each service page
  - `ItemList` on services and equipment pages
  - `Product` schema on equipment items
✅ `lang="en"` on `<html>`  
✅ Geo meta tags (Mumbai, Maharashtra)  
✅ `loading="lazy"` on non-hero images  
✅ `alt` text on all images  
✅ Web App Manifest (`site.webmanifest`)  
✅ `404.html` for SPA routing on GitHub Pages  

---

## 6. SEO — What You Must Do Next

### 6.1 — Add Favicon (HIGH IMPACT — do today)

Create these files and put them in `/public/`:

| File | Size | Tool |
|------|------|------|
| `favicon.ico` | 32×32 | [favicon.io](https://favicon.io) |
| `favicon-32x32.png` | 32×32 | [favicon.io](https://favicon.io) |
| `favicon-16x16.png` | 16×16 | [favicon.io](https://favicon.io) |
| `apple-touch-icon.png` | 180×180 | [favicon.io](https://favicon.io) |

**How:** Go to [favicon.io/favicon-generator](https://favicon.io/favicon-generator/) → type "E" → pick teal color `#0E7C6E` → download → extract all files to `/public/`.

### 6.2 — Add OG Image (HIGH IMPACT — do today)

Create `/public/og-image.jpg` — size **1200×630px**

This image shows when someone shares your link on WhatsApp, Facebook, LinkedIn.

**How to make it free:**
1. Go to [Canva.com](https://canva.com) → New design → Custom size 1200×630
2. Add: ELIZA logo/name, tagline "Hospital-grade care at home", teal background
3. Export as JPG → save as `public/og-image.jpg`

### 6.3 — Google Search Console (do after first deploy)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix → `https://elizahealthcare.in`
3. Verify ownership (HTML file method — download file → put in `/public/`)
4. Go to **Sitemaps** → submit `https://elizahealthcare.in/sitemap.xml`
5. Check **Coverage** report after 3–5 days

### 6.4 — Update Real Business Info

Open `src/content/site.ts` and update:

```typescript
phone: "+91XXXXXXXXXX",        // ← your real phone number
phoneDisplay: "+91 XXXXX XXXXX",
whatsapp: "91XXXXXXXXXX",      // ← without + sign
email: "care@elizahealthcare.in",
address: "Your actual address",
social: {
  instagram: "https://instagram.com/YOUR_HANDLE",
  facebook: "https://facebook.com/YOUR_PAGE",
  // ...
}
```

### 6.5 — Update Sitemap Domain

The sitemap already uses `elizahealthcare.in`. If your domain is different, update `/public/sitemap.xml`.

### 6.6 — Local SEO — City Landing Pages (HIGH IMPACT)

Create files like `src/routes/services.home-nursing-mumbai.tsx` with city-specific content:

```
/services/home-nursing-mumbai
/services/home-nursing-pune
/services/elderly-care-thane
/services/physiotherapy-navi-mumbai
```

Each page targets: "home nursing in Mumbai", "nurse at home Mumbai" etc. — these rank fast for local searches.

### 6.7 — Google Business Profile

1. Go to [business.google.com](https://business.google.com)
2. Create/claim your listing for "ELIZA Healthcare"
3. Add photos, services, hours, phone
4. This makes you appear in Google Maps and local search results

---

## 7. Performance Optimizations

### 7.1 — Compress Images (60–80% size reduction)

Run all images through [squoosh.app](https://squoosh.app):

1. Open each image from `src/assets/`
2. Set format to **WebP**, quality **80**
3. Download and replace the original

Or use the CLI:
```bash
npx @squoosh/cli --webp '{"quality":80}' src/assets/*.jpg
```

### 7.2 — Lazy Loading (already done)

All non-hero images already have `loading="lazy"`. Hero image loads eagerly (correct).

### 7.3 — Code Splitting (already done)

`vite.config.ts` splits vendor/router/ui into separate chunks — faster initial load.

### 7.4 — Check Performance Score

After deploying, run: [pagespeed.web.dev](https://pagespeed.web.dev) with your URL.
Target: **90+ on mobile**.

---

## 8. Trust & Conversion Improvements

### 8.1 — Replace Placeholder Phone Number

In `src/content/site.ts`, replace `+91 98765 43210` with your real number.
This appears in the navbar, footer, booking form, and all CTAs.

### 8.2 — Replace Stock Images

Replace files in `src/assets/` with real photos:
- `hero-nurse.jpg` — real nurse/caregiver photo
- `team.jpg` — actual team photo
- `gallery-*.jpg` — real patient/care photos (with consent)

Real photos increase trust and conversion by 30–40%.

### 8.3 — WhatsApp Business

1. Set up [WhatsApp Business](https://business.whatsapp.com/) with your number
2. Update `whatsapp: "91XXXXXXXXXX"` in `site.ts`
3. All WhatsApp buttons across the site auto-update

### 8.4 — Google Reviews Widget

After getting Google Business reviews:
1. Go to [elfsight.com/google-reviews-widget](https://elfsight.com/google-reviews-widget/) (free tier)
2. Get embed code
3. Add to `src/components/home/Testimonials.tsx` below existing testimonials

---

## 9. Alternative Hosting (Netlify / Vercel / Cloudflare Pages)

All three are better than GitHub Pages for SPAs (no 404 redirect hack needed).

### Netlify (Recommended — easiest)

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect GitHub → select `elshadaiathome` repo
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add env vars: **Site settings** → **Environment variables** → add `VITE_BREVO_API_KEY` and `VITE_SHEETS_WEBHOOK_URL`
5. Create `public/_redirects` file with:
   ```
   /*  /index.html  200
   ```
   This fixes SPA routing (no 404 hack needed).
6. Free URL: `your-site.netlify.app`
7. Custom domain: **Domain settings** → add `elizahealthcare.in`

### Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → import from GitHub
2. Framework: **Vite**
3. Build command: `npm run build`, Output: `dist`
4. Add env vars in **Settings** → **Environment Variables**
5. Vercel auto-handles SPA routing — no extra config needed
6. Free URL: `your-site.vercel.app`

### Cloudflare Pages (Original target — best performance)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages** → **Create a project**
2. Connect GitHub → select repo
3. Build command: `npm run build`, Output: `dist`
4. Add env vars in **Settings** → **Environment variables**
5. Free URL: `your-site.pages.dev`
6. Cloudflare's CDN gives fastest global load times

> **Note:** The original project used Cloudflare Workers (SSR). This version is a pure SPA — it works on all platforms above.

---

## 10. Nice-to-Have Features

### Live Chat — Tawk.to (Free, High Impact)

1. Sign up at [tawk.to](https://tawk.to)
2. Get your widget script
3. Add to `src/routes/__root.tsx` inside a `useEffect`:

```tsx
useEffect(() => {
  const s = document.createElement("script");
  s.src = "https://embed.tawk.to/YOUR_PROPERTY_ID/default";
  s.async = true;
  document.body.appendChild(s);
}, []);
```

### Google Analytics GA4 (Free, High Impact)

1. Create property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `index.html` before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Blog / Articles Section (Medium effort, High SEO impact)

Create `src/routes/blog/` with articles like:
- "How to care for elderly parents at home"
- "What to expect from a home nurse"
- "Hospital bed rental guide India"

Each article targets long-tail keywords and builds domain authority.

### Service Pricing Page

Create `src/routes/pricing.tsx` with transparent pricing ranges.
Pricing pages rank well and reduce "how much does it cost?" calls.

---

## 11. Updating Content

All website copy lives in **one file**: `src/content/site.ts`

| What to change | Where in site.ts |
|----------------|-----------------|
| Phone / WhatsApp | `business.phone`, `business.whatsapp` |
| Email | `business.email` |
| Cities served | `cities` array |
| Services list | `services` array |
| Equipment list | `equipment` array |
| Testimonials | `testimonials` array |
| FAQs | `faqs` array |
| Stats (5000+ families etc.) | `stats` array |
| Hero text | `hero` object |
| About page content | `aboutContent` object |

After editing, run `git add . && git commit -m "Update content" && git push` — auto-deploys in ~2 min.

---

## 12. Troubleshooting

### "Page not found" on refresh after deploy to GitHub Pages

The `public/404.html` handles this. If it still breaks, check that `base: "/"` is set in `vite.config.ts` (for custom domain) or `base: "/elshadaiathome/"` (for subdirectory URL).

### Email not sending in production

1. Check GitHub Secrets are set correctly (Settings → Secrets → Actions)
2. Verify sender email in Brevo dashboard
3. Check Brevo free tier limit (300 emails/day)

### Build fails in GitHub Actions

Check the **Actions** tab → click the failed run → expand the failing step.
Common causes:
- Missing `npm ci` lock file — run `npm install` locally and commit `package-lock.json`
- TypeScript errors — run `npx tsc --noEmit` locally first

### WhatsApp link not working

Update `whatsapp` in `site.ts` — must be the number **without** `+` sign, e.g. `"919876543210"`.

### Images not loading after deploy

If using subdirectory URL (`/elshadaiathome/`), set `base: "/elshadaiathome/"` in `vite.config.ts`.

---

## Quick Reference — Most Important Actions

| Priority | Action | Time | Impact |
|----------|--------|------|--------|
| 🔴 Now | Push to GitHub + enable Pages | 10 min | Live website |
| 🔴 Now | Add GitHub Secrets for email | 5 min | Email works |
| 🔴 Now | Add real phone number in site.ts | 2 min | Trust |
| 🔴 Now | Create favicon (favicon.io) | 15 min | SEO + trust |
| 🔴 Now | Create OG image (Canva) | 20 min | Social sharing |
| 🟡 Week 1 | Submit sitemap to Search Console | 10 min | Google indexing |
| 🟡 Week 1 | Compress images (squoosh.app) | 30 min | 60–80% faster |
| 🟡 Week 1 | Replace stock photos with real ones | varies | +30% conversion |
| 🟡 Week 2 | Set up Google Business Profile | 30 min | Local SEO |
| 🟡 Week 2 | Add GA4 analytics | 15 min | Track visitors |
| 🟢 Month 1 | Add city landing pages | 2–3 hrs | Local SEO |
| 🟢 Month 1 | Add Tawk.to live chat | 30 min | Conversions |
| 🟢 Month 2 | Start blog (3 articles) | 3–5 hrs | SEO authority |
