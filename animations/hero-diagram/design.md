# Kickback Hero Diagram — Design System

Visual identity for the Follow-Up hero diagram composition. Derived from the Kickback marketing site tokens (`css/tokens.css`). Brand hex values are sacred; application is video-scaled.

## Overview

Warm workshop stone, Kickback red accent, product-tint secondary accents (moss for Costing energy, tide for Follow-Up). Illustrated diagram language — clean geometry, soft depth, no neon SaaS glow. Feels like a field-service owner's phone getting smarter, not a sci-fi HUD.

**Mood:** Confident, practical, lightly kinetic  
**Canvas:** Light (`#FBFAF8`) — matches site `--bg-page`  
**Energy:** Medium — continuous flow + punchy swipe beats

## Colors

| Role                      | Hex       | Notes                       |
| ------------------------- | --------- | --------------------------- |
| Background                | `#FBFAF8` | stone-50 / bg-page          |
| Surface                   | `#FFFFFF` | cards, phone screen chrome  |
| Surface sunken            | `#F5F3F0` | stone-100                   |
| Foreground                | `#1A1614` | stone-900                   |
| Foreground muted          | `#5C554E` | stone-600                   |
| Foreground quiet          | `#7C746B` | stone-500                   |
| Border                    | `#D6D0C9` | stone-300                   |
| Accent (Kickback)         | `#DE4444` | red-500 — primary brand hit |
| Accent deep               | `#C62F2F` | red-600                     |
| Accent soft               | `#FDF1F1` | red-50                      |
| Moss (approve / positive) | `#6F9334` | swipe-right / send          |
| Moss deep                 | `#46621E` |                             |
| Tide (Follow-Up / CRM)    | `#41778D` | recordings/CRM tint option  |
| Tide soft                 | `#EDF4F6` |                             |
| Amber (skip / caution)    | `#C97A3C` | swipe-left soft signal      |
| Phone chassis             | `#2A2522` | stone-800                   |
| Phone bezel highlight     | `#423C36` | stone-700                   |

**Tint rule:** Neutrals stay warm (stone family). Never introduce cool gray, purple, or cyan.

## Typography

Site uses Inter / Space Grotesk / Space Mono. For video:

| Role                | Family          | Weight  | Size (video)              |
| ------------------- | --------------- | ------- | ------------------------- |
| Node labels         | `Space Mono`    | 700     | 18–22px                   |
| Card body / message | `Space Grotesk` | 500–600 | 22–28px                   |
| Card meta / chips   | `Space Mono`    | 400–700 | 14–16px                   |
| Ambient ghost type  | `Space Grotesk` | 700     | 120–180px @ 6–10% opacity |

Local font files live in repo `fonts/` (Space Mono, Space Grotesk). Prefer `@font-face` to those files. Do **not** fall back to Inter in the composition.

**Type tension:** Mono for system/data voice; Grotesk for human message copy on cards.

## Elevation & Corners

- Corner radius: **2–8px** (site language is sharp — prefer 4–8px on source nodes, ~36–44px phone outer radius, 12px inner screen)
- Shadows: soft warm (`rgba(26, 22, 20, 0.08–0.18)`), one primary depth on phone
- Borders: 2px+ on light canvas so edges survive H.264
- Depth: subtle layered — phone sits above flow layer; source nodes float slightly

## Components (diagram language)

1. **Source nodes** — rounded squares with icon + Title Case label; soft fill + 2px border
2. **Flow conduits** — stroked paths with traveling particles (seeded, not random)
3. **Intelligence hub** — larger square, Kickback accent ring or soft red wash; receives then emits
4. **Phone** — generic tall device, dark chassis, light screen, notch/dynamic island simplified
5. **Swipe cards** — stacked Follow-Up message cards; green tint right / amber-red tint left on swipe

## Motion

- Flow: continuous particle drift along paths (finite repeats from duration)
- Swipes: punchy `power3` / `expo` — approve right, skip left
- Ambient: slow breath on phone shadow + soft pulse on intelligence hub
- Entrances: staggered assemble of nodes → paths draw → phone settles → first card

## Do's and Don'ts

**Do**

- Keep CRM-agnostic copy ("Your CRM", not Housecall Pro)
- Title Case on UI labels
- Show real-looking follow-up message snippets (short, punchy)
- Loop cleanly for hero embed (~14–16s)

**Don't**

- Purple gradients, neon cyan, glow-heavy dark mode
- Photoreal product screenshots or real phone brand logos
- Dense dashboards, stat strips, or card grids outside the phone
- Exit-fade content mid-loop (keep nodes/phone visible; only cards leave via swipe)
- Inter / Roboto / Poppins / Syne
