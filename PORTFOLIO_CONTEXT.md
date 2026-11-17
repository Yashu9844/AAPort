# Portfolio: Project Context & Audit

> Living document. Audited **2026‑10‑24** on branch `14-upload-real-images-and-content--yashavanth-r`.
> Purpose: one place to understand the codebase, what's fake/broken, and the plan to make it production-grade.

## ✅ Phase 1 status: done (2026‑10‑24, uncommitted)

Verified with `tsc` (0 errors, was 100), `eslint` (0 errors; 16 `<img>` warnings left for Phase 2), `next build` with type-checking **on**, and a smoke test against `next start`.

| Item | Result |
|---|---|
| Fake pages | `/achievements/*`, `/case-study-1..3`, `/project-1` deleted → 404 |
| Webhook relay | `/api/webhooks/resend` deleted |
| Contact API | Sends to `CONTACT_TO_EMAIL` (default: profile email) from `CONTACT_FROM_EMAIL`; input validated and length-capped; HTML escaped (footer rich text keeps only bare `b/i/u/p/br/ul/li` tags); honeypot field `website`; per-instance rate limit; returns 503 if `RESEND_API_KEY` is missing |
| Links | Resume → `/resume.pdf`; footer Work/About → `/projects`, `/about`; `/about2` renamed to `/about` (308 redirect kept); contact page email/GitHub/LeetCode fixed. All come from `src/lib/site.ts` |
| SEO | `metadataBase` from `NEXT_PUBLIC_SITE_URL` (falls back to the Vercel production URL); generated `app/opengraph-image.tsx` replaces the missing `og-image.jpg` |
| Scrolling | One Lenis instance (`components/SmoothScroll.tsx` in the root layout, synced to the GSAP ticker/ScrollTrigger, off for `prefers-reduced-motion`). Removed: the wheel-hijacking scroller, the leaked carousel Lenis, CDN GSAP (`SheryScripts`), `html { scroll-behavior: smooth }`. Overlays use `data-lenis-prevent` + `lockScroll()` from `src/lib/lenis.ts` |
| Preloader | 600 ms + 0.7 s reveal (was ~3 s); once per session via a pre-paint inline script; skipped for reduced motion |
| Live links | AI Image Editor → working `-rosy` URL; Airbnb (500) and SaveMe.life (expired cert) commented out with a note |
| Dead code | 43 unused `ui/*` files, 9 dead components, `bun.lock`, unused deps (`locomotive-scroll`, `lottie-web`), 6 unused TTFs + Geist, unused webp variants, raw screenshots, create-next-app SVGs. `ignoreBuildErrors` removed |
| Misc | `/projects` stagger capped at 0.5 s; year range computed from data; console logs removed; `.env.example` added |

**Still to verify by hand in a browser:** the scroll feel, nav menu scrolling, modal scroll, and the preloader on first vs repeat visit.

## ✅ Resume sync (2026‑11‑18)

Source of truth: `public/resume.pdf` (Nov 2026 resume). Site content now matches it.

- **Resume download**: new PDF; `/resume.pdf` served with `Content-Disposition: attachment` (next.config.js) so it downloads on every browser
- **Role**: SDE – Team Lead @ FalconX (Dec 2025–present, 4‑member team, satellite telemetry, 70+ satellites); Full Stack Developer @ RoborosX (Apr–Dec 2025: SaveMe.life 2,000+ daily consultations, school‑transport GPS tracking over MQTT/RabbitMQ, −45% load time)
- **ISRO** no longer mentioned anywhere (the resume doesn't mention it)
- **New projects** (home featured order: CrewForge, DATS, Space Object Tracking, Phone Case, AI Image Editor, ApniSec), added to `Projects.tsx` (`featuredOrder`) and `allProjects.ts` (ids 51–53). Covers are illustrative SVGs in `public/projects/` (DATS + tracking are not public; tracking is under NDA)
- **CrewForge** = repo `Yashu9844/AI_bot_temmate`, live https://ai-bot-temmate.vercel.app
- **Numbers**: 500+ problems / 400+ LeetCode; 1st Web Dev, 1st ML NOVA, 1st Vertex 2.0, 3rd national hackathon; B.Tech CS @ MVJ (2022–2026, CGPA 8.7)
- **Tech stack**: removed Vue/GraphQL/Firebase (not on resume); added C++, Rust, FastAPI, Azure, RabbitMQ, Kafka

---

## 1. Project snapshot

| | |
|---|---|
| **Owner** | Yashavanth R Siddesh (co-built with Zubair Mallik: ~54 of 125 commits) |
| **Stack** | Next.js 16 (App Router, Turbopack), React 19.1, Tailwind v4, Framer Motion, GSAP + ScrollTrigger, Lenis, Resend |
| **Repo remotes** | `origin` → `Yashu9844/AAPort`, `yash-origin` → `Yashu9844/Aportfolio` |
| **Deploy target** | Vercel (`vercel.json` present), no custom domain configured in code yet |
| **Assets** | `public/` = **81 MB** (65 MB project screenshots, 11 MB stock images, 3.9 MB fonts) |
| **Tests / CI** | None |

### Home page section order (`src/app/page.tsx`)
`Navigation` → `Hero` (video + TechStack marquee) → `Projects` (6 cards + modal) → `Page2` (Experience) → `Features` (Achievements carousel) → `About` → `Feature-2` (My Approach) → `PremiumTechStack` → `CircleCarousel` (Testimonials) → `Footer` (video bg + contact form)

### Routes
| Route | Status |
|---|---|
| `/` | Main page |
| `/projects` | All 50 projects from `src/data/allProjects.ts` with filter and modal |
| `/about2` | Long-form about (rename to `/about`) |
| `/blog`, `/blog/[slug]` | 5 posts, hardcoded |
| `/contact` | Contact form |
| `/playground` | Mini-games |
| `/approach/*` (4) | "My Approach" Q&A pages |
| `/achievements/*` (8) | ⚠️ **Template content: fake awards** (see §2) |
| `/case-study-1..3` | ⚠️ **Template content: Robinhood/Mixpanel/Meta** (see §2) |
| `/project-1` | ⚠️ **Template content: fake e-commerce project** |
| `/api/send-email` | Contact form → Resend |
| `/api/webhooks/resend` | ⚠️ Unauthenticated forwarder |

### Data sources (the main source of drift)
Project data lives in **two places that have already diverged**:
- `src/components/Projects.tsx`: 8 inline projects (home page). AI Image Editor → `ai-image-editor-rosy.vercel.app` ✅
- `src/data/allProjects.ts`: 50 projects (`/projects`). AI Image Editor → `ai-image-editor-deployed.vercel.app` ❌ 404

Experience, achievements, testimonials, about and blog content are all hardcoded inside their components.

---

## 2. Pain points, ranked

### 🔴 P0: Credibility & broken basics (fix before sharing the link with anyone)

| # | Problem | Where | Fix effort |
|---|---|---|---|
| 1 | **Fabricated award pages** claim Awwwards, Behance, Dribbble, CSS Design Awards, Framer, SiteInspire, LogoLounge and A1 Gallery recognition. They're unlinked but publicly routable and indexable. A recruiter finding them is an instant disqualifier. | `src/app/achievements/*` + `components/AchievementStory.tsx` | 5 min: delete |
| 2 | **Case studies describe other people's work**: "I led the redesign of Robinhood's onboarding…", Mixpanel rebrand, Meta iconography. Credited to Zubair Mallik, assets hot-linked from `framerusercontent.com`. | `src/app/case-study-1..3`, `components/CaseStudy.tsx` | 5 min: delete |
| 3 | **Fake project page** "E-commerce Platform… thousands of daily transactions", `link="https://example.com"` | `src/app/project-1/page.tsx`, `components/ProjectDetail.tsx` | 2 min: delete |
| 4 | **Contact form messages never reach you**: sends to Resend's *test inbox* `delivered@resend.dev` from `onboarding@resend.dev`. | `src/app/api/send-email/route.ts:20-21` | 15 min |
| 5 | **Open email relay**: webhook has no signature check and forwards to `zubair7035@gmail.com`. Anyone can POST to it. Message HTML is also unescaped in both routes (HTML injection). | `src/app/api/webhooks/resend/route.ts`, `send-email/route.ts:23-34` | 10 min: delete webhook, escape input |
| 6 | **Contact page shows a fake email**: `yashavanth.siddesh@example.com`. Also wrong GitHub (`YashavanthR` vs real `Yashu9844`) and wrong LeetCode (`yashavanth_r_siddesh` vs `mr_alpha`). | `src/app/contact/page.tsx:117,120,157,173,375` | 5 min |
| 7 | **Resume download 404s**: links to `/Resume-YashavanthRSiddesh.pdf`, but the file is `public/resume.pdf` | `components/Navigation.tsx:184,302` | 1 min |
| 8 | **Footer nav 404s**: "Work" → `/work`, "About" → `/about`; real routes are `/projects`, `/about2` | `components/Footer.tsx:461-463` | 2 min |
| 9 | **SEO placeholders**: `url`/`canonical` = `https://your-domain.com`, OG image `/og-image.jpg` doesn't exist, so every share on LinkedIn/WhatsApp shows no preview | `src/app/layout.tsx:27,31,37,44` | 20 min |
| 10 | **Broken live demos linked from cards** (see §6): Airbnb → HTTP 500, AI Image Editor (on /projects) → 404, SaveMe.life → **expired SSL cert**, TechyBlog (Render) → 20s+ timeout | `allProjects.ts`, `Projects.tsx` | 30 min |
| 11 | **~30 project cards + all achievements + approach + blog use unrelated stock photos** (tote bags, cheese, a cat on whisks; see §3) | many | Needs real assets |

### 🟠 P1: Performance & UX (what makes it *feel* junior)

| # | Problem | Where |
|---|---|---|
| 12 | **Three smooth-scroll systems fighting**: custom wheel hijack (`preventDefault` on every wheel event → breaks trackpad momentum, pinch-zoom, nested scroll areas), a **second Lenis instance** whose RAF loop is never cancelled or destroyed (memory leak), plus `html { scroll-behavior: smooth }`. A 4th (`LocomotiveScrollProvider`) is installed but unused. | `components/SmoothScroll.tsx:53-57`, `CircleCarousel.tsx:47-68`, `globals.css:136` |
| 13 | **Forced ~3 s preloader** on every hard load (1.5 s fake progress + 1.4 s reveal) and locks body scroll. Hurts LCP and bounce rate, and recruiters open many tabs. | `components/Preloader.tsx:10` |
| 14 | **GSAP loaded twice**: npm `gsap@3.13` is bundled, *and* `gsap@3.12.2` + ScrollTrigger are injected from cdnjs | `components/SheryScripts.tsx:21-26` |
| 15 | **Unoptimized images**: screenshots are 2–9.4 MB PNGs (`empowerhome.png` = 9.4 MB) via raw `<img>`; no `next/image`, no lazy-loading, no `sizes`. The `-mobile/-tablet/-desktop.webp` files generated by the Python scripts **are never referenced**. | `Projects.tsx`, `ProjectsGrid.tsx`, `Page2.tsx`, `CircleCarousel.tsx` |
| 16 | **Hero video downloaded twice** (Hero + Footer) and autoplays in both | `Hero.tsx:11`, `Footer.tsx:239` |
| 17 | **/projects stagger delay = `index * 0.1s`**, so card #50 appears after 5 s | `components/ProjectsGrid.tsx` (`transition={{ delay: index * 0.1 }}`) |
| 18 | **Font bloat + licensing**: `* { font-family: 'KH Teka' !important }` overrides everything, so `Primary/Secondary/Accent/Light` TTFs and the `next/font` Geist import are downloaded but never used. KH Teka files are **TRIAL** builds (`KHTekaTRIAL-*`); check `public/fonts/KH Teka/KH Type EULA.pdf` before public use. | `globals.css:8-150`, `layout.tsx:8-16` |
| 19 | **Project details are modals, not URLs**: can't share or deep-link a project, no SEO per project, browser Back button closes the site instead of the modal | `Projects.tsx`, `ProjectsGrid.tsx` |
| 20 | **Hover-only interactions** on touch devices: "My Approach" image swap relies on `onMouseEnter`; nav menu is hover-driven with touch workarounds | `Feature-2.tsx:105`, `Navigation.tsx` |
| 21 | **Accessibility**: `alt=''`/`alt="image"`/`alt="xyz"` on content images, menu not keyboard-operable, modals lack focus-trap/`role="dialog"`, no `prefers-reduced-motion` handling anywhere | multiple |

### 🟡 P2: Code health (what a senior reviewer notices in the repo)

| # | Problem |
|---|---|
| 22 | `next.config.js` has `typescript.ignoreBuildErrors: true`, which hides real type errors |
| 23 | **~45 shadcn `ui/*` files import ~35 packages that are NOT in `package.json`** (`@radix-ui/*`, `recharts`, `vaul`, `cmdk`…). Only `Contact`/`Footer` import from `ui/`. The rest is dead code that would break the build the moment it's imported. |
| 24 | Dead components: `Testimonials.tsx` (contains fake "Sarah Johnson" testimonial), `AnimatedTechStack.tsx`, `LocomotiveScrollProvider.tsx`, `Resume.tsx`, `ProjectCard.jsx` (imported but unused), `Contact.tsx` (imported on home, not rendered) |
| 25 | Unused deps: `locomotive-scroll`, `lottie-web`, `lightningcss` (direct), and `@types/*` + `typescript` sitting in `dependencies` |
| 26 | Two package managers' lockfiles: `bun.lock` **and** `package-lock.json` |
| 27 | `About.tsx` rewrites React-owned DOM via `innerHTML` and leaves `console.log`s in production |
| 28 | Header/arrow-hover pattern (`<h2>` + animated `↘`) is copy-pasted in 6 components; `ArrowUpRight` SVG redefined 3× |
| 29 | Root `README.md` is the create-next-app boilerplate |
| 30 | `public/portfolio-images-work/raw-screenshots/` contains a Stripe **checkout session URL** in a filename (`checkout.stripe.com_c_pay_cs_test_…`). Test mode, so harmless, but it's untidy and unused. |
| 31 | Python helper scripts (`convert_to_webp.py`, etc.) live in repo root, and their output is unused |

---

## 3. Dummy image inventory

`public/images/pimg1–16.jpg` are **generic agency/branding stock photos** (tote bag, snowmobile, coffee packaging, beer can, freckled eye, cheese, cat on whisks, man in green cap, gallery screens, "WE ARE BEST" man, phone with water, business card, purple portrait, office building, BBQ dentures, whisky glass). None of them relate to your work.

| Used in | Images | Replace with |
|---|---|---|
| `Features.tsx` (Achievements: Web Dev 1st, ML NOVA 1st, 500+ problems, FalconX×ISRO, Hackathon 3rd, DSA 2nd, SaveMe.life, 300+ mentored) | pimg1–8 | Certificate photos, on-stage/team photos, LeetCode profile screenshot, FalconX/RoborosX logos on a branded tile |
| `Page2.tsx` (Experience): Software Dev Club, Freelance | pimg9, pimg13 | Club event photo, freelance client site screenshot |
| `Page2.tsx`: FalconX, RoborosX | `falcon.png` (282×179), `roborosx.jpg` (200×200) | **Stretched to 500–620 px tall and pixelated.** Use an SVG logo centred on a solid tile, or a (permitted) product screenshot |
| `Feature-2.tsx` + `/approach/*` | pimg1, 3, 10, 14 | Your own photos (desk, whiteboard, sketches) or abstract generated art in your palette |
| `Projects.tsx` (home): BeyondChats, TechyBlog | pimg7, pimg8 | Real screenshots (both apps are yours) |
| `allProjects.ts`: projects #7–#50 | pimg1–16 cycled (pimg1 alone = NextYouTube, GeminiAPI, WebSocket Chat, SIH EmpowerHub) | Real screenshots for the top ~12. **Cut the rest** (see §7) |
| `/blog`, `/blog/[slug]` | pimg1, 3, 5, 7, 9 | Simple generated cover cards (title on a gradient). Can be automated with `next/og` |
| `layout.tsx` OG image | `/og-image.jpg`, **missing** | 1200×630 card: name + role + headshot. Generate with `app/opengraph-image.tsx` |

**Real assets you already have ✅**: `portfolio-images-work/figma-working/*` (phone case, Airbnb, EmpowerHub, AI editor, Rejouice, ApniSec), `testimonial1–7.png` (genuine testimonial cards), `image1pro.png`, `hero-video.mp4`, `resume.pdf`.
Note: `testimonial1–5` are rendered twice in the carousel to fill 12 slots.

---

## 4. Dummy / inconsistent content inventory

| What | Where | Problem |
|---|---|---|
| Email | `/contact` | `yashavanth.siddesh@example.com`; Footer uses `yashavanthrsiddesh@gmail.com` |
| GitHub handle | `/contact` | `YashavanthR`; everywhere else `Yashu9844` |
| LeetCode handle | `/contact` | `yashavanth_r_siddesh`; Hero uses `mr_alpha` |
| LeetCode count | Blog says **300+**, About says **400+ LeetCode / 500+ total**, Hero says **500+** | Pick one number and source it from one constant |
| SaveMe.life scale | About/Features: **"2,000+ daily consultations"**; Blog: **"1000+ monthly transactions for 500+ doctors"** | Reconcile |
| "50+ Projects" | Hero stat | Inflated by 7 entries pointing at the same `Complete-Langchain-Tutorials` repo, plus starter templates and tutorial follow-alongs |
| "selected works from 2023–2025" | `ProjectsGrid.tsx` header | Stale (it's late 2026); compute from data |
| Experience cards | `Page2.tsx` | All `link: '#'`; first card shows a 📸 emoji tag, others 📄 |
| Achievement cards | `Features.tsx` | All `link: '#'` except LeetCode |
| `allProjects.ts` | every entry | `link: "#"` (unused field) |
| Hero label | `Hero.tsx` | "Creative Developer"; title tag says "Full Stack Developer & UI/UX Designer". Choose one positioning |
| Specializations | Hero | "Mobile Development": no mobile project in the portfolio backs this up |
| Rejouice credits | `Projects.tsx` | Correctly says "Design Inspiration: Rejouice Agency". **Keep this honesty**, but label it a *clone/recreation* in the card itself |
| Blog dates | `/blog` | Jul–Nov 2024; nothing since. Either post or hide dates |

---

## 5. Responsiveness issues

| Component | Issue | Fix |
|---|---|---|
| `Page2.tsx:104` Experience | Image `h-[500px]` on **mobile**: 4 cards ≈ 2,400 px of mostly-pixelated logos | `aspect-[4/3] md:aspect-[4/5]` and drop fixed heights |
| `Features.tsx:164-169` Achievements | Fixed `w-[360px] h-[420px]` cards: wider than a 320–360 px phone; carousel is a GSAP auto-tween that ignores touch/swipe | `w-[80vw] sm:w-[360px]`, pause on touch, or use CSS scroll-snap on mobile |
| `Feature-2.tsx:52,76` Approach | `px-8` + `gap-32` (128 px) on mobile; image column `min-h-[400px]`; hover-only image swap | `gap-10 lg:gap-40`, hide image or make it tap-driven on mobile |
| `About.tsx:71` | Hard `px-8`, ignores the `px-3 sm:px-4…` rhythm used everywhere else; `min-h-screen` causes empty space on short content | Use shared section padding |
| `Projects.tsx:447` home cards | Row is `h-[70vh]` with 2 stacked images on mobile, so each image is squeezed to ~35vh and cropped hard | `aspect-video` per card on mobile |
| `Projects.tsx:517` modal close button | `fixed top-8 right-8` collides with notch / safe-area on iOS | `top-[max(1rem,env(safe-area-inset-top))]` |
| `Hero.tsx:151` | TechStack marquee absolutely positioned at `bottom: -20px`. On short landscape phones it overlaps the stats/CTA | Put it in normal flow below content |
| `Hero.tsx` | `h-screen` → iOS Safari URL-bar jump | `h-[100svh]` |
| `CircleCarousel.tsx` | Mobile/desktop chosen in JS (`isMobile` starts `true`), so desktop flashes the mobile layout first; `window.innerWidth*0.5` computed during render | CSS breakpoints; render both and hide one |
| `Footer.tsx` | Contact form `hidden md:block`, so **phones have no inline form** (only the CTA). Acceptable, but the footer video still downloads on mobile | `preload="none"` + poster on mobile |
| `Navigation.tsx` | Menu width `w-[85vw]` + `max-h-[70vh]` overflow-scroll inside a fixed element, and the wheel/scroll `stopPropagation` hacks exist because of the custom smooth-scroll | Becomes simpler once #12 is fixed |
| Global | No `prefers-reduced-motion` handling; marquees, preloader and parallax all run regardless | Wrap motion in a `useReducedMotion()` check |

*Not yet verified in a real browser.* Next step is a pass at 360 / 390 / 768 / 1024 / 1440 widths with Lighthouse mobile.

---

## 6. Live-link health (checked 2026‑10‑24)

| Project | URL | Result |
|---|---|---|
| Custom Phone Case | next-case-seven.vercel.app | ✅ 200 (5.3 s) |
| Airbnb Stays | next-pro-3.vercel.app | ❌ **500 server error** (likely DB/env expired) |
| EmpowerHub | empower-hub-deployed-version.vercel.app | ✅ 200 (4.5 s) |
| AI Image Editor (home) | ai-image-editor-rosy.vercel.app | ✅ 200 |
| AI Image Editor (/projects) | ai-image-editor-deployed.vercel.app | ❌ **404** |
| ApniSec | apni-sec-azure.vercel.app | ✅ 200 |
| BeyondChats | beyond-chats-assignment-4v4q.vercel.app | ✅ 200 |
| Rejouice | yashu9844.github.io/Project_07 | ✅ 200 |
| TechyBlog | techy-blog.onrender.com | ⚠️ **Timed out at 20 s** (Render free tier cold start) |
| SaveMe.life | saveme.life | ❌ **HTTPS cert expired**: browsers show a security warning |

GitHub repo links were not checked (some may be private).

---

## 7. Plan: making this a portfolio that shines

### Positioning (decide first, it drives everything)
One clear headline beats a list of four specializations. Your strongest *real* story:
> **Full-stack engineer shipping production systems: ISRO drone mission-planning & telemetry at FalconX, clinic platform serving 2,000+ daily consultations at RoborosX.**

That's rarer and more credible than "Creative Developer / UI/UX / AI/ML / Mobile". Lead with it in the Hero, title tag, and OG image.

### Curate: 50 projects → 6 featured + ~10 more
Senior portfolios show **fewer, deeper** projects. Suggested tiers:

- **Featured (home, full case study page each):** FalconX drone mission planning (screens if permitted, else architecture diagram), SaveMe.life clinic module, NextYouTube (Mux/tRPC/Drizzle), Custom Phone Case (Stripe, live), AI Image Editor (live), ApniSec (live)
- **More work (/projects grid):** NextTwitch, EmpowerHub (SIH), BeyondChats, CodeScanAPI, Disaster mgmt, MCP client/server, Rejouice (labelled *recreation*), TechyBlog
- **Cut or collapse into one "Learning archive" row:** the 7 LangChain tutorial entries, DOM projects, GSAP practice, Netflix/IMDb clones, starter templates, Laravel API starters

Each featured case study should answer: **Problem → My role → Architecture (diagram) → Hard part I solved → Measurable result → Links**. Your `fullDescription` copy already follows this shape.

### Phase 1: Quick wins (½–1 day, no new assets needed)
1. Delete `/achievements/*`, `/case-study-*`, `/project-1` and their components (`AchievementStory`, `CaseStudy`, `ProjectDetail`, `Testimonials`, `AnimatedTechStack`, `LocomotiveScrollProvider`, `Resume`, `ProjectCard`)
2. Fix resume link, footer links, contact email/handles, rename `/about2` → `/about` (add redirect)
3. Fix `send-email`: verified sender domain, `to: process.env.CONTACT_TO_EMAIL`, escape HTML, basic rate limit + honeypot field; delete the webhook route
4. Remove `SheryScripts` CDN GSAP, custom `SmoothScroll`, and the Lenis inside `CircleCarousel`; use **one** Lenis instance in a root provider synced to ScrollTrigger
5. Cut preloader to ≤ 600 ms and only on first visit (`sessionStorage` flag), or remove it
6. Fix live links (§6), hide links that are down rather than ship a 500
7. Remove `ignoreBuildErrors`, delete unused `ui/*` files, remove unused deps, keep one lockfile
8. Single source of truth: `src/data/` → `projects.ts`, `experience.ts`, `achievements.ts`, `profile.ts` (email, handles, stats). Every component reads from these.

### Phase 2: Real content & performance (2–3 days, needs your assets)
1. Replace all `pimg*` usage (§3), then delete `public/images/pimg*` and all generated webp variants
2. Move every image to `next/image` with `sizes`; convert screenshots to WebP/AVIF ≤ 300 KB each
3. Project detail **routes**: `/projects/[slug]` with `generateStaticParams` + per-project `generateMetadata` and OG image. Keep the modal on home via intercepting routes (`@modal/(.)projects/[slug]`) for the nice animation *and* shareable URLs.
4. Responsiveness fixes from §5; add `prefers-reduced-motion`
5. Record 15–30 s muted screen captures of the 3–4 strongest live apps (MP4/WebM < 2 MB, `poster` image) for the case-study pages
6. Reconcile all numbers (§4) into `profile.ts`

### Phase 3: Senior-level polish (ongoing)
- `app/sitemap.ts`, `app/robots.ts`, `metadataBase`, JSON-LD `Person` schema
- `app/opengraph-image.tsx` (dynamic OG for home, each project, each blog post)
- Blog → MDX files in repo (`content/blog/*.mdx`) instead of hardcoded TSX; write the FalconX telemetry post (Redis/RabbitMQ/MQTT) — that's your differentiator
- Live **GitHub activity / LeetCode stats** card fetched at build time with ISR (`revalidate: 86400`), so numbers stay true automatically
- Uptime check on featured live demos (GitHub Action cron that pings URLs and opens an issue on failure)
- Accessibility pass: focus-trap modals, keyboard menu, real alt text, contrast on `text-white/40`
- Proper `README.md`: screenshot, stack, Lighthouse scores, architecture notes

---

## 8. Deployment plan

**Target: Vercel + custom domain** (already the de-facto host; `vercel.json` exists).

1. **Domain:** buy `yashavanth.dev` / `yashavanthr.com` (or similar), add it in Vercel → Domains, set it as primary. Redirect `*.vercel.app` → custom domain.
2. **Env vars (Vercel → Settings → Environment Variables):**
   - `RESEND_API_KEY`: real key
   - `CONTACT_TO_EMAIL`: your inbox
   - `CONTACT_FROM_EMAIL`: e.g. `hello@yourdomain` (domain verified in Resend via DNS records)
   - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain`, used for `metadataBase`, canonical, sitemap
3. **Simplify `vercel.json`**: the custom `npm install --include=optional` build command and `.npmrc optional=true` were workarounds for `lightningcss` native binaries; with one lockfile and Next 16 they're likely unnecessary. Verify by deploying a preview without them.
4. **Observability:** `@vercel/analytics` + `@vercel/speed-insights` (two lines in `layout.tsx`) gives real-user Core Web Vitals.
5. **CI (GitHub Actions on PR):** `npm ci` → `npm run lint` → `tsc --noEmit` → `next build` → Lighthouse CI against the Vercel preview URL with budgets (Perf ≥ 90 mobile, LCP < 2.5 s, CLS < 0.1).
6. **Branch flow:** `main` = production; feature branches get Vercel preview URLs; protect `main` with required CI.
7. **Search Console:** verify domain, submit `sitemap.xml`; request removal of any indexed `/achievements/*` or `/case-study-*` URLs after deleting them.
8. **Fix the dependent demos:** Airbnb (500): check its DB/env on Vercel; TechyBlog: move off Render free tier or add a "may take 30 s to wake" note; AI Image Editor: point everything at the working `-rosy` URL.

---

## 9. What I need from you (to make content real)

- [ ] Real email to show publicly, and confirm GitHub = `Yashu9844`, LeetCode = `mr_alpha`
- [ ] Current status at FalconX (still "SDE Intern"? dates?) and what screens/diagrams you're **allowed** to show
- [ ] Final numbers: LeetCode count, SaveMe.life scale, competition placements (+ certificate photos)
- [ ] Photos: headshot (for OG + About), events/hackathons/workshops
- [ ] Screenshots for: BeyondChats, TechyBlog, NextYouTube, NextTwitch, CodeScanAPI, Disaster, MCP project
- [ ] Which ~6 projects to feature and which to cut
- [ ] Domain name preference
- [ ] KH Teka font: do you hold a full licence? If not, swap to a free alternative (e.g. Inter Tight / Geist / Satoshi)
- [ ] Is Zubair still contributing? (affects whether shared-credit content stays)

---

## 10. Key file map

| Concern | File |
|---|---|
| Root layout, metadata, global widgets | `src/app/layout.tsx` |
| Home composition | `src/app/page.tsx` |
| Nav + resume button | `src/components/Navigation.tsx` |
| Home projects + modal (own data copy) | `src/components/Projects.tsx` |
| All projects data | `src/data/allProjects.ts` |
| /projects grid + filter + modal | `src/components/ProjectsGrid.tsx` |
| Experience | `src/components/Page2.tsx` |
| Achievements carousel | `src/components/Features.tsx` |
| Approach | `src/components/Feature-2.tsx` + `src/app/approach/*` |
| Testimonials | `src/components/CircleCarousel.tsx` |
| Footer + inline contact form | `src/components/Footer.tsx` |
| Contact API | `src/app/api/send-email/route.ts` |
| Fonts + global CSS | `src/app/globals.css` |
