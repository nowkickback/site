# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: home-services **owner-operators** (painting and related trades) who still own the costing backlog and quote follow-up burden — even when an office manager or bookkeeper clicks day to day. They arrive burned out by busywork and weekend catch-up.

Secondary readers: office staff who clear the Invoice Inbox; copy may acknowledge them in how-it-works / FAQ without making them the hero persuasion target.

## Product Purpose

Kickback is the AI-native **platform** for the home-services back office. It connects the CRM and vendors contractors already use, then runs back-office work (job costing, estimate follow-up, and later apps) so owners only surface what needs a human decision — and get weekends back.

This repository is the **marketing site** (`nowkickback.com`): persuade owners to Start Free or Book a Demo into the live platform at `platform.nowkickback.com`.

Success for the site: a clear owner-outcome story, honest product status, and a single primary path into the platform — not AI-literacy theater.

## Positioning

- **Not a chatbot / not “type prompts.”** AI is background and anticipatory; confirmation is keyboard-first in the product demos.
- **CRM-agnostic.** Marketing says “your CRM,” not Housecall Pro / HCP by default (integrations may still show vendor logos as tools they already use).
- **Platform, not a single-app landing.** One login, one connection, apps that share the job graph — Costing is the public proof; Follow-Up is private preview.
- **Built by owners** (Richmond, VA). Risk-free catch-up / onboarding promises must stay tied to real offer language already on the site — do not invent new guarantees.

## Operating Context

Owners evaluate on phone and desktop after vendor sync pain, quote leakage, or a piled receipt inbox. They already live in a CRM, paint/supplier portals (Sherwin, Home Depot Pro, Lowe’s Pro, etc.), and email PDFs. Demo booking and platform signup are the conversion rituals; marketing must not invent Docs/Help destinations that are still `#`.

## Capabilities and Constraints

**Shipped / featured on marketing (canon):**

- **Costing** — live / public; invoice matching to CRM jobs.
- **Follow-Up** — private preview; may appear, but not as equal “live” product.

**Do not feature as live on marketing:** HUD, Coach (omit from lineup / badges unless status is explicitly preview and user later revises this).

**CTA hierarchy:** **Start Free** primary → `platform.nowkickback.com`; **Book a Demo** secondary → demo / booking flow.

**Site stack (existing):** Eleventy via `@awesome.me/buildawesome`; sources in `src/`, tokens in `css/tokens.css`, shared data in `src/_data/`. Prefer tokens over hardcoded spacing/color on marketing pages. Respect **system color scheme** only — no manual theme switcher.

**Open / stub (do not paper over):** About, Customers, Careers, Contact, Terms stubs; resource links that still point to `#`; testimonial video lightbox still “coming soon.”

## Brand Commitments

- Marketing name: **Kickback**. Legal/footer: **Kickback, LLC** (Richmond, VA). Never “Kickback Group.”
- Voice: simpler, harder-hitting, outcomes-focused (busywork, weekends, burnout) over verbose or ChatGPT-framed copy.
- UI/nav labels: Title Case.
- Prefer static hero headline (no rotating H1).
- Prefer homepage layout/nav template on every page (no alternate legal-only chrome).
- Prefer reusable section templates across Kickback app pages.
- Wordmark / favicon assets under `assets/`; brand red theme color default `#DE4444`.

## Evidence on Hand

- Product UI demos in-page (Invoice Inbox / matching shot, product page shots under `src/_includes/shots/`).
- Vendor logo strip assets under `assets/vendors/`.
- Founder headshot `assets/troy-headshot.png` and “Watch Troy's testimonial” CTA — **video content not shipped** (lightbox placeholder).
- Live privacy policy content; Terms still stub.
- Platform/auth URLs and social links in `src/_data/site.json`.

**Do not fabricate:** customer logos, case studies, benchmarks, review quotes, or metrics not already present and verified in the repo. Treat any numeric proof on the homepage as copy to validate before amplifying.

## Product Principles

1. **Owner outcomes first** — weekends back and cleared backlog beat feature lists and AI jargon.
2. **Honest product status** — only ship what’s live; label preview; never fake HUD/Coach as available.
3. **One conversion path** — Start Free leads; Demo supports; don’t contradict free-start with a sales-only primary.
4. **CRM-native trust** — Kickback writes into their world; it doesn’t replace the CRM in the story.
5. **Token-true craft** — marketing stays on the Kickback token system and system theme; stubs stay honest until real.

## Accessibility & Inclusion

No separate contractual standard was set in init. Default bar for future work: meet **WCAG 2.2 AA** on marketing surfaces (contrast, keyboard, names/roles/states), and keep reduced-motion respectful of useful state changes — consistent with the technical audit already run on this site.
