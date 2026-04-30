# Elshadai Home Healthcare — Complete Deployment & Operations Guide

## Quick Answer to Your Questions

### Is Vercel free for a static website? YES ✅
- Vercel Hobby (free) = unlimited static deployments
- 100GB bandwidth/month free
- Custom domain free
- HTTPS free
- Your site is static HTML/JS/CSS — perfectly fits free tier forever

### Private repo on Vercel — does it work? YES ✅
- Vercel can deploy from **private GitHub repos** on the free plan
- Your code stays private, only the built website is public
- Credentials (API keys) go into Vercel's Environment Variables — never in code

### Are credentials safe on a static site?
- `VITE_` prefixed variables get **baked into the JS bundle at build time**
- Anyone can find them with browser DevTools → Sources
- This is **acceptable** for Brevo API key (it's a send-only key, not admin)
- The real protection: Brevo lets you restrict the key to only send emails
- Google Sheets webhook URL is also low-risk (it only appends rows)
- **Never put payment keys, database passwords, or admin tokens in VITE_ vars**

---

## Table of Contents
1. [Deploy on Vercel (Recommended)](#1-deploy-on-vercel-recommended)
2. [Connect GoDaddy Domain to Vercel](#2-connect-godaddy-domain-to-vercel)
3. [Deploy on GitHub Pages (Alternative)](#3-deploy-on-github-pages-alternative)
4. [Credential Security — Full Explanation](#4-credential-security--full-explanation)
5. [First-time Git Push to GitHub](#5-first-time-git-push-to-github)
6. [SEO Checklist](#6-seo-checklist)
7. [Updating Content](#7-updating-content)
8. [Email & Google Sheets Setup](#8-email--google-sheets-setup)

---

## 1. Deploy on Vercel (Recommended)

Vercel is better than GitHub Pages for SPAs — no 404 redirect hacks, faster CDN, better analytics.

### Step 1 — Create GitHub repo first

1. Go to https://github.com/new
2. Sign in as `elsha222`
3. Name: `elshadaiathome`
4. Set to **Private** (your code stays hidden)
5. Do NOT add README or any files
6. Click **Create repository**

### Step 2 — Push your code

Open terminal in your project folder and run:

```bash
git push -u origin main
```

If it asks for credentials, use your GitHub username + a Personal Access Token
(GitHub → Settings → Developer settings → Personal access tokens → Generate new token → check "repo" scope)

### Step 3 — Deploy on Vercel

1. Go to https://vercel.com → Sign up with GitHub (use elsha222 account)
2. Click **Add New Project**
3. Click **Import** next to `elshadaiathome` (private repos show up too)
4. Framework Preset: **Vite** (auto-detected)
5. Build settings (auto-filled, verify):
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`
6. Click **Environment Variables** → Add these two:

   | Name | Value |
   |------|-------|
   | `VITE_BREVO_API_KEY` | your Brevo API key from `.env` file |
   | `VITE_SHEETS_WEBHOOK_URL` | your Google Sheets webhook URL from `.env` file |

7. Click **Deploy**

Your site goes live at: `https://elshadaiathome.vercel.app` in ~2 minutes.

### Step 4 — Every future update

```bash
# Make changes to any file, then:
git add .
git commit -m "describe what you changed"
git push
# Vercel auto-detects the push and redeploys in ~90 seconds
```

---

## 2. Connect GoDaddy Domain to Vercel

Your domain: **elshadaihealthcare.com** (registered at GoDaddy, expires Oct 7 2026)

### Step A — Add domain in Vercel

1. In Vercel → your project → **Settings** → **Domains**
2. Type `elshadaihealthcare.com` → click **Add**
3. Also add `www.elshadaihealthcare.com` → click **Add**
4. Vercel shows you DNS records to add — keep this tab open

### Step B — Add DNS records in GoDaddy

1. Go to https://dcc.godaddy.com/manage/elshadaihealthcare.com/dns
   (or: GoDaddy → My Products → elshadaihealthcare.com → DNS)
2. Delete any existing **A record** pointing to `@` (the root domain)
3. Add these records:

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | A | @ | 76.76.21.21 | 600 |
   | CNAME | www | cname.vercel-dns.com | 600 |

   > The A record IP `76.76.21.21` is Vercel's IP. The CNAME for www points to Vercel.

4. Save

### Step C — Wait for DNS propagation

- Takes 10 minutes to 48 hours (usually under 1 hour with GoDaddy)
- Check status at: https://dnschecker.org/#A/elshadaihealthcare.com
- Once green globally, Vercel auto-issues a free SSL certificate

### Step D — Set root domain as primary in Vercel

1. Vercel → Settings → Domains
2. Click the three dots next to `elshadaihealthcare.com` → **Set as Primary**
3. Vercel auto-redirects `www` → root domain

Your site is now live at **https://elshadaihealthcare.com** 🎉

---

## 3. Deploy on GitHub Pages (Alternative)

Use this only if you don't want Vercel. GitHub Pages is free but has limitations:
- No server-side redirects (uses 404.html hack — already set up)
- Slower CDN than Vercel
- Public repo required for free Pages (private repo needs GitHub Pro = $4/month)

### Step 1 — Create repo as PUBLIC on GitHub

1. Go to https://github.com/new
2. Name: `elshadaiathome`
3. Set to **Public** (required for free Pages)
4. Create repository

### Step 2 — Push code

```bash
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to https://github.com/elsha222/elshadaiathome/settings/pages
2. Source → **GitHub Actions**
3. Save

### Step 4 — Add secrets

1. https://github.com/elsha222/elshadaiathome/settings/secrets/actions
2. Add `VITE_BREVO_API_KEY` and `VITE_SHEETS_WEBHOOK_URL`

### Step 5 — Connect GoDaddy domain to GitHub Pages

In GoDaddy DNS, add:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | elsha222.github.io | 600 |

Then in GitHub Pages settings → Custom domain → type `elshadaihealthcare.com` → Save → check **Enforce HTTPS**.

---

## 4. Credential Security — Full Explanation

### What happens to VITE_ variables

```
Your .env file  →  Vite build  →  dist/assets/index-xxx.js  →  Vercel CDN  →  User's browser
```

The API key ends up **inside the JavaScript file** that browsers download.
Anyone can open DevTools → Sources → search for the key.

### Is this a problem for your specific keys?

| Key | Risk Level | Why it's OK |
|-----|-----------|-------------|
| `VITE_BREVO_API_KEY` | Low | Can only send emails, not read/delete. Restrict it in Brevo dashboard to only the "transactional" permission. Worst case: someone sends spam from your account — you revoke and regenerate the key. |
| `VITE_SHEETS_WEBHOOK_URL` | Very Low | Can only append rows to your sheet. No sensitive data at risk. |

### What you must NEVER put in VITE_ variables

- Database passwords (MongoDB, MySQL, etc.)
- Stripe/Razorpay secret keys
- AWS secret access keys
- Any admin/full-access API tokens
- JWT secrets

### How Vercel protects your keys

1. Keys are stored encrypted in Vercel's vault
2. They're injected only at **build time** — not exposed in Vercel's UI after saving
3. Your **source code** (private repo) never contains the keys
4. The built JS contains them — but that's unavoidable for client-side apps

### Best practice for Brevo key

1. Log into https://app.brevo.com
2. Settings → SMTP & API → API Keys
3. Create a **new restricted key** with only "Transactional emails" permission
4. Use that key instead of a full-access key
5. If the key leaks, revoke it and create a new one — takes 30 seconds

### Private repo on Vercel — what it protects

✅ Your source code is hidden (competitors can't copy your components)
✅ Your `.env.example` structure is hidden
✅ Your business logic is hidden
❌ Does NOT hide the built JS from browser DevTools
❌ Does NOT hide VITE_ variables from the final bundle

**Conclusion:** Private repo on Vercel is the right choice. Use it.

---

## 5. First-time Git Push to GitHub

Run these commands in order in your terminal:

```bash
# Navigate to project
cd "C:\Users\Ashish jaiswal\Downloads\eliza-care-blueprint-main"

# Push to GitHub (repo must exist first — create at github.com/new)
git push -u origin main
```

If you get "Authentication failed":
```bash
# Use a Personal Access Token instead of password
# GitHub → Settings → Developer settings → Personal access tokens (classic)
# → Generate new token → check "repo" → copy token
# When git asks for password, paste the token
```

For future updates:
```bash
git add .
git commit -m "what you changed"
git push
```

---

## 6. SEO Checklist

### Done automatically ✅
- Meta title + description on every page
- Keywords meta tag
- Open Graph (WhatsApp/Facebook preview)
- Twitter Card
- Canonical URLs
- robots.txt
- sitemap.xml (all 14 pages)
- Schema.org structured data (MedicalBusiness, FAQPage, MedicalProcedure)
- Geo meta tags (Bhiwandi, Maharashtra)
- lazy loading on images
- Security headers (via vercel.json)

### You must do these (takes 1 hour total)

**1. Create favicon** (15 min)
- Go to https://favicon.io/favicon-generator/
- Text: "E", Background: #0E7C6E (teal), Font: any bold font
- Download ZIP → extract → copy these to `/public/`:
  - `favicon.ico`
  - `favicon-32x32.png`
  - `favicon-16x16.png`
  - `apple-touch-icon.png`

**2. Create OG image** (20 min)
- Go to https://canva.com → New design → Custom size: 1200 × 630 px
- Add: "Elshadai Home Healthcare" text, teal background (#0E7C6E), tagline
- Export as JPG → save as `public/og-image.jpg`
- This image shows when you share the link on WhatsApp

**3. Submit sitemap to Google** (5 min, do after first deploy)
- Go to https://search.google.com/search-console
- Add property → URL prefix → `https://elshadaihealthcare.com`
- Verify ownership → Sitemaps → submit `https://elshadaihealthcare.com/sitemap.xml`

**4. Google Business Profile** (30 min)
- Go to https://business.google.com
- Create listing for "Elshadai Home Healthcare"
- Address: 2nd Floor, Opp Fire Brigade, 6 Kasar Ali, Bhiwandi, Thane 421308
- This makes you appear in Google Maps searches

---

## 7. Updating Content

All website text is in one file: `src/content/site.ts`

| What to update | Field in site.ts |
|----------------|-----------------|
| Phone number | `business.phone` and `business.phoneDisplay` |
| WhatsApp number | `business.whatsapp` (no + sign, e.g. `917573923584`) |
| Email | `business.email` |
| Address | `business.address` |
| Services list | `services` array |
| Equipment list | `equipment` array |
| Testimonials | `testimonials` array |
| FAQs | `faqs` array |
| Cities served | `cities` array |
| Stats (5000+ families) | `stats` array |

After editing:
```bash
git add .
git commit -m "Update phone number"
git push
# Auto-deploys in ~90 seconds on Vercel
```

---

## 8. Email & Google Sheets Setup

### Brevo (Email) — sends booking confirmation to you

1. Sign up free at https://app.brevo.com (300 emails/day free)
2. Settings → SMTP & API → API Keys → Create API key
3. Name it "Elshadai Website", permission: Transactional only
4. Copy the key
5. In Vercel: Project → Settings → Environment Variables → add `VITE_BREVO_API_KEY`
6. Verify sender: Senders & IPs → Add sender → `elshadaiathome25@gmail.com`

### Google Sheets (CRM) — logs every booking

1. Create a new Google Sheet at https://sheets.google.com
2. Name it "Elshadai Bookings"
3. Extensions → Apps Script → paste this code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.city || "",
    data.service || "",
    data.duration || "",
    data.date || "",
    data.notes || ""
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy → New deployment → Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL
6. In Vercel: add `VITE_SHEETS_WEBHOOK_URL` with that URL

### Test it works

1. Go to your live site → fill the booking form → submit
2. Check `elshadaiathome25@gmail.com` for the email
3. Check your Google Sheet for the new row

---

## Summary — Recommended Setup

```
Private GitHub repo (elsha222/elshadaiathome)
         ↓  git push
Vercel (free Hobby plan)
         ↓  auto-build with VITE_ secrets injected
elshadaihealthcare.com (GoDaddy DNS → Vercel)
         ↓
Users visit your site, fill form
         ↓
Email → elshadaiathome25@gmail.com (via Brevo)
CRM  → Google Sheets (via Apps Script)
```

**Cost: ₹0/month** (Vercel free + GoDaddy domain already paid until Oct 2026)
