## Learned User Preferences
- Prefer CRM-agnostic product copy: replace explicit `Housecall Pro`/`HCP` mentions with `your CRM`.
- Prefer UI labels and navigation text in Title Case.
- Prefer simpler, harder-hitting marketing copy over verbose phrasing.
- Prefer outcomes-focused copy for home-service owners (busywork, weekends, burnout) over AI-literacy or chatbot framing; AI should feel background and anticipatory, not ChatGPT-style prompting.
- Prefer platform-wide product framing (not Job Costing only): eliminate busywork and surface only what needs owner action.
- Prefer Book a Demo as the primary CTA everywhere (accounts are invitation-only; no Start Free, no free tier) with Sign In in the nav; keep a single homepage product path (app lineup → How It Works → proof) without repeating app deep dives on the homepage.
- Prefer a static hero headline (no rotating or switching H1).
- Prefer marketing surfaces that feature only released apps (Costing, Follow-Up and Warehouse) and the platform; never HUD, Coach or Foreman; no status badges; homepage app lineup tiles link to each product page.
- Do not write automated tests for the marketing site; verify by building and looking at pages (390px and 1280px, light and dark).
- Prefer respecting the system color scheme; do not add a manual theme switcher.
- Prefer reusable section templates (hero, features, etc.) so pages can be reused across Kickback apps.
- Use `Kickback` in marketing copy; use `Kickback, LLC` in footer and legal; never `Kickback Group`.
- Prefer the homepage layout/nav template on every page (no alternate legal-page chrome).

## Learned Workspace Facts
- Site is built with Eleventy via `@awesome.me/buildawesome`; page sources live under `src/` (e.g. `src/index.njk`) with shared styles in `css/site.css` and mockup styles in `css/shots/<page>.css`.
- Shared site and product config lives in `src/_data/` (notably `site.json` for nav and URLs, `products/<slug>.json` for product pages, `platform.json` for /platform, and `pricing.json`, the only place prices live).
- Product pages render from their data file through `layouts/product.njk` in one fixed section order: hero, works-with, how, capabilities, automation, other-apps, faq, pricing, demo.
- The Phosphor icon font in `assets/phosphor/` is a subset; run `node scripts/subset-icons.mjs` (needs `pip install fonttools brotli`) after adding a new `ph-*` icon class.
- Spacing and design tokens live in `css/tokens.css`; prefer tokens over hardcoded spacing values on the homepage.
- Product and auth links use `https://platform.nowkickback.com` (not the old `costing.nowkickback` host).
- Company branding in the footer and legal is Kickback, LLC, based in Richmond, VA; marketing surfaces use Kickback without LLC.
- Pages use pretty URLs/permalinks.
- Homepage hero keeps the navbar transparent at the top (logo left, right-side links visible; middle nav hidden until scroll). Inner pages show the middle nav (Apps menu, Platform, Pricing, FAQ) from the top.
