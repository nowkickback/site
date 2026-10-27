---
name: Kickback
description: Warm shop-stone marketing system with Kickback mark red and product-accent apps
colors:
  kickback-mark-red: "#DE4444"
  kickback-mark-deep: "#C62F2F"
  kickback-mark-ink: "#A32121"
  shop-paper: "#FBFAF8"
  shop-surface: "#FFFFFF"
  shop-ink: "#1A1614"
  shop-ink-secondary: "#423C36"
  shop-ink-muted: "#7C746B"
  shop-border: "#D6D0C9"
  shop-border-strong: "#ABA39A"
  costing-moss: "#6F9334"
  costing-moss-deep: "#587A26"
  followup-tide: "#41778D"
  followup-tide-deep: "#336077"
  midnight-page: "#0F0C0B"
  midnight-surface: "#1A1614"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Space Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  xs: "2px"
  sm: "2px"
  md: "4px"
  lg: "6px"
  xl: "8px"
  pill: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  14: "56px"
  16: "64px"
  20: "80px"
  24: "96px"
  28: "112px"
components:
  button-primary:
    backgroundColor: "{colors.kickback-mark-red}"
    textColor: "{colors.shop-surface}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 16px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.kickback-mark-deep}"
    textColor: "{colors.shop-surface}"
  button-primary-lg:
    backgroundColor: "{colors.kickback-mark-red}"
    textColor: "{colors.shop-surface}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "{colors.shop-surface}"
    textColor: "{colors.shop-ink-secondary}"
    rounded: "{rounded.sm}"
    height: "40px"
    padding: "0 16px"
  button-secondary-hover:
    backgroundColor: "{colors.shop-paper}"
    textColor: "{colors.shop-ink-secondary}"
  card:
    backgroundColor: "{colors.shop-surface}"
    rounded: "{rounded.sm}"
    padding: "24px"
  input:
    backgroundColor: "{colors.shop-surface}"
    textColor: "{colors.shop-ink}"
    rounded: "{rounded.sm}"
    height: "36px"
    padding: "0 12px"
  badge:
    backgroundColor: "{colors.shop-paper}"
    textColor: "{colors.shop-ink-secondary}"
    rounded: "{rounded.pill}"
    height: "20px"
    padding: "2px 8px"
    typography: "{typography.label}"
  nav-link:
    textColor: "{colors.shop-ink-secondary}"
    typography: "{typography.body}"
---

# Design System: Kickback

## Overview

**Creative North Star: "The Job-Site Ledger"**

Kickback’s marketing surfaces feel like field-accurate paperwork made digital: warm shop-stone paper, monospace stamps and tabular figures, and a sharp red mark that behaves like a stamp of approval. The living product UI (Invoice Inbox, matching flow) is the artifact on the ledger — proof, not decoration.

Density is intentional and crisp. Corners stay tight (mostly 2px). Shadows are short, outlined drops rather than soft glow. Atmosphere comes from warm neutrals, a faint grain/dot-grid texture, and product accents (moss for Costing, tide for Follow-Up) that color words and icons without turning the page into a rainbow.

Visual rejections already enforced by the codebase and product canon: no purple SaaS gradients, no marshmallow soft-UI cards, no manual theme toggle (follow `prefers-color-scheme` only), no chatbot-chic chrome.

**Key Characteristics:**
- Warm stone paper + Kickback mark red as the platform voice
- Product accents (moss / tide) for app identity, not generic decoration
- Sharp 2px geometry; crisp outline+drop elevation
- Space Grotesk display + Inter body + Space Mono labels
- Product demo shots and keyboard cues as signature proof language

## Colors

Warm, low-chroma stone neutrals with a single vivid brand red; product ramps are reserved for Costing/Follow-Up (and unused marketing apps).

### Primary
- **Kickback Mark Red** (`#DE4444` / `--red-500` / `--accent-500` on platform): primary fills — Book a Demo buttons, brand word accents, focus borders, CTA bands. Deepen to `#C62F2F` (`--red-600`) for hover and brand text (`--fg-brand`).

### Secondary
- **Costing Moss** (`#6F9334` / `--moss-500`): Costing product identity — icon tiles, suite highlights, inline “Costing” word color. Prefer deeper moss (`#587A26`) for small body text to hold AA contrast.

### Tertiary
- **Follow-Up Tide** (`#41778D` / `--tide-500`): Follow-Up product identity — same pattern as moss for icons and inline product words.

### Neutral
- **Shop Paper** (`#FBFAF8` / `--stone-50` / `--bg-page`): default page ground.
- **Shop Surface** (`#FFFFFF` / `--stone-0` / `--bg-surface`): cards, nav actions, secondary buttons.
- **Shop Ink** (`#1A1614` / `--stone-900` / `--fg-1`): primary text.
- **Shop Ink Secondary** (`#423C36` / `--stone-700` / `--fg-2`): supporting copy and secondary controls.
- **Shop Ink Muted** (`#7C746B` / `--stone-500` / `--fg-3`): captions and meta — keep for large/meta type; avoid for small body.
- **Shop Border** (`#D6D0C9` / `--stone-300` / `--border-default`): default strokes.
- **Midnight Page** (`#0F0C0B`): dark-mode page ground when `data-theme="dark"`.

### Named Rules
**The One Mark Rule.** Platform chrome speaks in Kickback Mark Red. Product accents appear only when naming or demonstrating that product — never as competing page-wide themes on the platform homepage.

**The Paper, Not Plastic Rule.** Neutrals stay warm (hue ~22°) and low-chroma. Cool gray, slate, or purple-tinted surfaces are out of system.

## Typography

**Display Font:** Space Grotesk (with Inter / system sans)
**Body Font:** Inter (with system UI sans)
**Label/Mono Font:** Space Mono

**Character:** Display is bold and tight — a stamped headline on the ledger. Body is workaday Inter for owner-readable prose. Mono handles eyebrows, prices, statuses, and keyboard hints like form fields on a job packet.

### Hierarchy
- **Display** (700, up to `--text-5xl` 72px / clamp heroes, leading 1.15, tracking ≈ -0.025em to -0.04em on heroes): homepage and product heroes.
- **Headline** (700, `--text-3xl` 40px / clamp ~28–40px section titles): section heads.
- **Title** (600, `--text-xl` 20px): card and feature titles.
- **Body** (400, `--text-base` 15px / lede `--text-md` 17px, leading 1.5): paragraphs; prefer readable measure, not full-bleed walls of text.
- **Label** (500, 11px mono, uppercase, tracking `0.08em`, brand or muted color): eyebrows, badges, shot chrome, pricing meta.

### Named Rules
**The Stamp Label Rule.** Uppercase mono labels mark structure (section, status, price meta). They never replace a real headline.

**The Static Headline Rule.** Heroes stay fixed copy — no rotating H1 carousel.

## Layout

Marketing pages sit in a **1280px** max container (`--page-max`) with **24px** gutters (`--page-gutter`). Section vertical rhythm uses `--section-y` (112px) desktop, compact 96px, mobile 72px. Homepage hero pads heavily from the top (`--hero-pad-top` 176px) so the fixed transparent nav can clear the brand mark; product UI shots pull up under the hero (`--hero-shot-pull`).

Breakpoints observed in CSS: ~900px collapses desk/mobile chrome and multi-column bands; ~700px / ~640px tighten how-it-works and secondary grids. Prefer CSS grid with `minmax(0, 1fr)` over fixed card columns.

Spacing scale is **4px-based** (`--space-1` … `--space-28`). Prefer tokens over ad-hoc pixel spacing on new work.

## Elevation & Depth

Depth is **structural, not atmospheric**: short Y-offset drops plus a 1px outline ring. Token comments call this “crisp 1px drops, never blurry.” Surfaces mostly read flat; elevation marks cards, shots, and recommended pricing tiers.

### Shadow Vocabulary
- **Hairline / xs** (`--shadow-xs`): quiet separators.
- **Card / sm** (`--shadow-sm`): default cards and FAQ shells.
- **Raised / md–lg** (`--shadow-md`, `--shadow-lg`): product shots and emphasized tiers (often combined with a 2px accent outline).
- **Modal / xl** (`--shadow-xl`): lightboxes and high lift.
- **Focus ring** (`--ring-focus`: `0 0 0 3px rgba(accent-rgb, 0.25)`): keyboard focus — required on interactive controls.

Grain (`.ks-grain`) and dot-grid (`.ks-dotgrid`) add paper texture without casting shadows. Dark mode drops grain opacity and inverts elevation to darker drops + light hairline rings.

### Named Rules
**The Crisp Edge Rule.** Prefer outline + short drop over large soft blurs or colored glow halos (except the deliberate brand glow on primary CTAs / live suite cards already in `theme.css`).

## Shapes

Form language is **sharp ledger geometry**: default radius **2px** (`--radius-sm` / `--radius-xs`). Slightly larger radii (4–8px) appear sparingly for media frames and icon wells. Pills (`999px`) are reserved for badges and true circular controls (how-arrows, close buttons) — not for every CTA.

Borders are 1px stone strokes; emphasis uses stronger border or a 2px accent outline, not thicker fuzzy strokes.

## Components

Controls feel **sharp, confident, and keyboard-ready** — like tools on the bench, not soft consumer chips.

### Buttons
- **Shape:** sharp corners (2px)
- **Primary (`.ks-btn-primary` / `.kb-btn--primary`):** Kickback Mark Red fill, on-brand white text; heights sm 28 / md 36–40 / lg 44. Homepage `.kb-btn` is the marketing port of the DS button.
- **Hover / Focus:** deepen to mark-deep; focus uses `--ring-focus` (ensure `.kb-btn` matches `.ks-btn:focus-visible`).
- **Secondary:** surface fill, ink/secondary text, default border; hover strengthens border and hover fill.
- **Ghost / Danger:** muted fill / deep red fill respectively (`.ks-btn-ghost`, `.ks-btn-danger`).

### Chips
- **Style:** `.ks-badge` — mono uppercase, pill radius, sunken or semantic subtle fills (paid / overdue / pending / brand).
- **State:** status semantics via color families (green/amber/red/blue/brand), not size changes.

### Cards / Containers
- **Corner Style:** 2px
- **Background:** shop surface on paper page
- **Shadow Strategy:** `--shadow-sm` default; recommended / live tiers may add 2px accent outline
- **Border:** usually shadow-outline only; explicit borders for builders and inputs
- **Internal Padding:** commonly `--space-6` / `--space-8`

### Inputs / Fields
- **Style:** surface fill, 1px default border, 2px radius, inset input shadow, 36px height
- **Focus:** brand border + focus ring
- **Placeholder:** `--fg-4`

### Navigation
- Fixed top nav; transparent over homepage hero until scroll, then frosted shop/midnight surface (`backdrop-filter` blur). On the homepage mid-links appear after scroll; inner pages show them from the top. Mid-links: Apps (disclosure menu of Costing, Follow-Up, Warehouse), Platform, Pricing, FAQ. Brand wordmark left; Sign In + Book a Demo right. Mobile: 44px menu toggle + stacked sheet with the same links. Follow system theme for wordmark light/dark assets.

### Signature: Product Shot / Invoice Inbox
In-page UI mock (window chrome, mono labels, suggested jobs, keyboard `ENTER` cues) is the system’s proof language. Treat it as a first-class component pattern: ledger chrome, not a stock screenshot collage.

### Signature: Mono Eyebrow
Space Mono uppercase brand-colored label above a Space Grotesk headline — the recurring section opener on marketing pages.

## Do's and Don'ts

### Do:
- **Do** consume `css/tokens.css` variables (`--stone-*`, `--red-*`, `--accent-*`, `--space-*`, `--radius-*`, `--shadow-*`) instead of inventing new hex/spacing.
- **Do** keep Book a Demo visually primary (mark red). Secondary actions (See the Apps, See Pricing) use the outlined surface.
- **Do** let Costing moss / Follow-Up tide color only product-named moments and product pages (`body[data-product]` accent remap).
- **Do** use Space Mono for labels, prices, statuses, and keyboard hints.
- **Do** respect OS light/dark via `data-theme` — swap wordmarks accordingly.

### Don't:
- **Don't** introduce purple gradients, glassmorphism stacks, or oversized soft card radii.
- **Don't** add a manual theme switcher.
- **Don't** feature HUD, Coach or Foreman anywhere, or put status badges (Beta, Preview, Live) on apps.
- **Don't** use muted stone (`--fg-3`) or bright moss-500 for small body text without checking AA contrast.
- **Don't** rotate hero headlines or replace the product shot with abstract illustration as the primary proof.
