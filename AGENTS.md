## Learned User Preferences
- Prefer CRM-agnostic product copy: replace explicit `Housecall Pro`/`HCP` mentions with `your CRM`.
- Prefer UI labels and navigation text in Title Case.
- Prefer simpler, harder-hitting marketing copy over verbose phrasing.
- Prefer outcomes-focused copy for home-service owners (busywork, weekends, burnout) over AI-literacy or chatbot framing; AI should feel background and anticipatory, not ChatGPT-style prompting.
- Prefer platform-wide product framing (not Job Costing only): eliminate busywork and surface only what needs owner action.
- Prefer Start Free as the primary CTA and Book a Demo as secondary; keep a single homepage product path (app chooser → How It Works → proof) without repeating Costing/Follow-Up across deep-dive sections.
- Prefer a static hero headline (no rotating or switching H1).
- Prefer marketing surfaces that feature only shipped apps (Costing and Follow-Up); omit HUD/Coach and beta/preview badges; app lineup tiles should be fully clickable, scroll to How It Works, and select that app.
- Prefer respecting the system color scheme; do not add a manual theme switcher.
- Prefer reusable section templates (hero, features, etc.) so pages can be reused across Kickback apps.
- Use `Kickback` in marketing copy; use `Kickback, LLC` in footer and legal; never `Kickback Group`.
- Prefer the homepage layout/nav template on every page (no alternate legal-page chrome).

## Learned Workspace Facts
- Site is built with Eleventy via `@awesome.me/buildawesome`; page sources live under `src/` (e.g. `src/index.njk`) with shared styles in `css/site.css`.
- Shared site and product config lives in `src/_data/` (notably `site.json`).
- Spacing and design tokens live in `css/tokens.css`; prefer tokens over hardcoded spacing values on the homepage.
- Product and auth links use `https://platform.nowkickback.com` (not the old `costing.nowkickback` host).
- Company branding in the footer and legal is Kickback, LLC, based in Richmond, VA; marketing surfaces use Kickback without LLC.
- Pages use pretty URLs/permalinks.
- Homepage hero keeps the navbar transparent at the top (logo left, right-side links visible; middle nav hidden until scroll).
