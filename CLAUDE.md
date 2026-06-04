# Gridiron Brewing — Project Guide

## Project Overview
Static brewery website for **Gridiron Brewing**, Hampton, New Brunswick.
Built with Astro 6.4.2 + TypeScript. Node >= 22.12.0 required.

Live site: **gridironbrewing.com**
GitHub: https://github.com/fundy-forge/gridiron.git (branch: `main`)

**Contact details** — use these wherever the brewery's info appears:
- Phone: `(506) 832-4592` · tel link: `tel:+15068324592`
- Email: `info@gridironbrewing.com`
- Address: `1051 Main Street, Hampton, NB E5N 6B2`

---

## Workflow

**Before starting work:** always `git pull` first.

**Code changes:** commit and push. Cloudflare Pages detects the push and auto-deploys (1–2 min). Per the user's gridiron push policy, do not push automatically — wait for explicit instruction.

**Content changes:** edit in Sanity Studio at [gridiron-brewing.sanity.studio](https://gridiron-brewing.sanity.studio). A publish triggers a Cloudflare build via the configured webhook — no commits needed.

```
git pull
# ... make code changes ...
git add <files>
git commit -m "description"
# wait for "push" before running git push
```

---

## Content Management

All content lives in Sanity (project `1ox2c8va`, dataset `production`). The git-tracked JSON under `scripts/migration-source/` is the original migration source — read-only reference, not used at runtime.

| Collection | Sanity type | Used By |
|---|---|---|
| Beer List | `beer` | `beers.astro`, `OnTap.astro` |
| Events | `event` | `events.astro`, `Events.astro` |
| Community Photos | `communityPhoto` | `gallery.astro`, `Community.astro` |

Data modules (build-time GROQ via `@sanity/client`):
- `src/data/beers.ts` — `*[_type == "beer"] | order(onTap desc, name asc)`, computes `canBg` gradient
- `src/data/events.ts` — `*[_type == "event"] | order(recurring asc, calDate asc)`, resolves Sanity image URLs with width params
- `src/data/community.ts` — `*[_type == "communityPhoto"] | order(_createdAt asc)`, returns `src` (~600px thumb) + `srcFull` (~1600px lightbox)

Required env: `SANITY_PROJECT_ID`, `SANITY_DATASET`. Set in `.env` locally and Cloudflare Pages env vars for builds. `src/lib/sanity.ts` throws a clear error if `SANITY_PROJECT_ID` is missing.

---

## Design Philosophy

**IMPORTANT — The Gridiron Name:** "Gridiron" does not refer to football. The brewery is named after the Gridiron, a section of rapids on the Kennebecasis River near Hampton, NB. Do not make football-themed suggestions, copy, or design choices.

Warm, unpretentious, rooted in place. The site should feel like the taproom: dark wood, amber light, hand-lettered signage. Not a tech startup, not a chain. Every design choice should reinforce that this is a local, community brewery on a New Brunswick river.

---

## Colour Palette

| Variable | Hex | Usage |
|---|---|---|
| `--paper` | `#f1e6d0` | Default page background |
| `--paper-2` | `#e7d8ba` | Alternate light section (e.g. Events) |
| `--cream` | `#faf3e4` | Light text on dark, beer card backgrounds |
| `--ink` | `#211711` | Dark backgrounds, primary text |
| `--ink-2` | `#3a2b1e` | Secondary body text |
| `--ink-3` | `#5a4733` | Tertiary / label text |
| `--amber` | `#c17a2b` | Brand accent, amber band background |
| `--amber-bright` | `#e0962f` | Kickers on dark, hover states |
| `--rust` | `#8b3a2b` | Stats numbers, seasonal tags, cover text |
| `--line` | `rgba(33,23,17,.16)` | Borders and dividers |

### Section Band Classes
Every page section must use one of these — **never place two identical bands adjacent to each other**:

| Class | Background | Text | Use for |
|---|---|---|---|
| *(none / `.section`)* | `--paper` | `--ink` | Primary content (About, etc.) |
| `.band-paper2` | `--paper-2` | `--ink` | Alternate light section |
| `.band-amber` | `--amber` | `#1c130c` | Warm/action sections |
| `.band-dark` | `--ink` | `--cream` | Drama, contrast sections |

Current homepage band sequence (top → bottom):
Hero (dark/ink) → OnTap (dark) → Taproom (amber) → About (paper) → Events (paper-2) → Instagram (dark) → Community (amber) → Footer (dark)

Note: Hero and OnTap are both dark — intentional, they read as one continuous immersive opening. The transition point is Taproom (amber).

---

## Typography

Three fonts are in use. Use them deliberately:

| Font | Usage |
|---|---|
| **Archivo** | Body copy, UI text, prices, event times — anything that needs to be read comfortably |
| **Anton** | Display headings, large stat numbers (tap count, ABV values) |
| **DM Mono** | Short technical labels only: nav links, kickers, filter chips, beer style tags |

**Do not use DM Mono for prices or oz sizes** — use Archivo instead for anything that needs to be read as a number in context.

---

## Design System

### Card Pattern
Any card-type element (cream background, border, rounded corners) must use:
- `background: var(--cream)` — card surface
- `border: 1px solid var(--line)` — subtle edge
- `border-radius: 6px` — consistent rounding
- `class="card"` — applies the shared warm shadow: `0 4px 20px -4px rgba(33,23,17,.18)`

Current card users: `.beer-card`, visit info cards (Parking/Kids/Accessibility), food truck cards.

Beer cards additionally get the amber gradient top bar via `::before` — this is specific to beer cards only, not the generic card pattern.

---

### Hover Conventions
Be consistent. Each interactive element type has one defined hover behaviour:

| Element | Hover effect |
|---|---|
| Cards (`.beer-card`) | `translateY(-5px)` + deeper shadow |
| Event rows | `padding-left: 12px` indent + title turns `--amber` |
| Drink rows | Warm amber tint background + title turns `--amber` |
| Links / nav | Colour → `--amber` or `--amber-bright` |
| Buttons | `translateY(-2px)` + background shift |
| Footer social icons | Icon opacity → 1 |

Do not add hover effects that deviate from these patterns without a strong reason.

---

### CSS Tokens
All magic colours must be tokens. Never hardcode hex values that already exist as variables.

| Token | Value | Use for |
|---|---|---|
| `--ink-deep` | `#1c130c` | Dark text **on amber** backgrounds — buttons, headings in amber bands |
| `--amber` | `#c17a2b` | Primary brand accent |
| `--amber-bright` | `#e0962f` | Kickers on dark, hover states |
| `--amber-deep` | `#5a2c14` | Kickers and accent text **on amber** bands |
| `--rust` | `#8b3a2b` | Stats, seasonal tags, accent text |
| `--red` | `#d83a29` | High-contrast accent on dark backgrounds (hero headline) |
| `--line` | `rgba(33,23,17,.16)` | All borders and dividers |
| `--cream-dim` | `rgba(250,243,228,.74)` | Dimmed body text on dark band sections |
| `--cream-muted` | `rgba(250,243,228,.82)` | Slightly less dimmed text on dark backgrounds |

---

### Class Naming Conventions
Follow the established modifier pattern — never invent new compound class names.

**Badge tags** (`.beer-specs .tag`):
- Type: `.tag` (flagship), `.tag.seasonal`, `.tag.guest`
- Status: `.tag.ontap`, `.tag.ask`

**Spec items**: `.spec` (ABV/IBU pairs inside `.beer-specs`)

**Stat items**: `.stat` (number + label pairs inside `.story-stats`)

**Named grid layouts** — desktop definitions live in `global.css`, mobile overrides in the `@media (max-width: 820px)` block. Never define these grids as inline styles:

| Class | Columns | Used in |
|---|---|---|
| `.taproom-grid` | `1.2fr 1fr` | Taproom.astro |
| `.community-outer` | `1fr 1fr` | Community.astro |
| `.visit-hours-grid` | `1fr 1fr` | visit.astro |
| `.visit-directions-grid` | `1.4fr 1fr` | visit.astro |
| `.visit-food-grid` | `repeat(3, 1fr)` | visit.astro |
| `.visit-private-grid` | `1fr 1fr` | visit.astro |

---

### Image Workflow

**Sanity-hosted images** (events, community photos): upload through Studio. The `img()` helper in `src/lib/sanity.ts` wraps `@sanity/image-url` so consumers get `?auto=format&w=…` URLs without thinking about it. Use width-appropriate variants (thumbnail vs. lightbox).

**Static images** under `public/assets/` (taproom interior, logos, food trucks): must be WebP before committing. Drop into the appropriate subfolder.

**Social card image:** `og:image` and `twitter:image` default to `crowded-bar.webp`. Each page passes its own via the `ogImage` prop on `Layout.astro` (events page passes the next upcoming event's image).

Naming conventions:
- **Logos** — role-based: `logo-nav.webp`, `logo-hero.webp`, `logo-footer.webp`, `logo-favicon.png`
- **Event images** — uploaded to Sanity, file name irrelevant
- **Static photos** — descriptive slug

---

## Rules & Conventions

**Tap count is always 12.** There are 12 physical tap handles. Never derive this number dynamically from the `onTap` flag in beer JSON files — that flag is for UI filtering only. Hardcode as `12` in stats and `twelve` in prose.

**The `onTap` flag** in `beers.json` controls display order and on-tap indicators in the UI. It does not represent the physical tap count.

**Beer data shape** (`beers.json`):
- `canColor` — single hex used as the darker stop; `beers.ts` auto-generates the gradient
- `canLabel` — two-element array for the two lines of can label text
- `lightText` — true if can is very dark and needs light-coloured label text
- `tag` — `flagship` | `seasonal` | `guest` | `hidden`

**Community photos** cycle client-side: 6 slots shown, one random slot crossfades every 4.5 seconds through the full pool in `src/data/community/*.json`.

**Committing:** use Conventional Commits format. Always include `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` in commit messages.

Conventional Commits prefix guide:
| Prefix | Use for |
|---|---|
| `feat:` | New feature or capability |
| `fix:` | Bug fix or broken behaviour |
| `style:` | Visual / CSS changes with no logic change |
| `content:` | Copy, data, or asset updates (events, beers, images) |
| `chore:` | Housekeeping — renaming, moving files, dependencies |
| `seo:` | Structured data, meta tags, sitemap, robots.txt |
| `perf:` | Performance improvements |
| `refactor:` | Code restructure with no behaviour change |

Example: `feat: add auto-hide for past events`

---

## Key File Locations

```
src/
  pages/
    index.astro       — Homepage (imports all section components, emits Event JSON-LD)
    beers.astro       — Full tap list + drinks menu
    events.astro      — Full events page with calendar links + structured data
    gallery.astro     — Full community photo grid
    visit.astro       — Hours, address, food trucks, private hire
  components/
    Hero.astro        — Full-bleed hero with stats strip
    OnTap.astro       — Homepage beer grid (Sanity beers where onTap:true)
    Taproom.astro     — Taproom description + CTA
    About.astro       — Story section with stats
    Events.astro      — Upcoming events list (homepage band)
    InstagramFeed.astro — Lazy-loaded Behold widget
    Community.astro   — Cycling photo mosaic + community copy
    Footer.astro      — Site footer (uses icon components)
    Navbar.astro      — Sticky nav
    Lightbox.astro    — Shared lightbox dialog (used by gallery, events, community)
    BeerTag.astro     — Beer category tag
    icons/            — Phone, Mail, Instagram, Facebook, Untappd SVG components
  data/
    beers.ts          — Sanity GROQ → Beer[], onTap-first, computes canBg
    events.ts         — Sanity GROQ → Event[], resolves image URLs (thumb + full)
    community.ts      — Sanity GROQ → CommunityPhoto[] (src thumb + srcFull lightbox)
  lib/
    sanity.ts         — Sanity client + img() URL builder; throws on missing env
  styles/
    global.css        — Design tokens, band classes, utility classes, component styles
  layouts/
    Layout.astro      — Base HTML shell. Props: title, description, ogImage, activeNav
  utils/
    lightbox.ts       — bindLightbox(lbId, itemSelector, options) — wires up triggers + keyboard
    eventSchema.ts    — buildEventSchemas, gcalUrl, icsUri (used by events.astro + index.astro)
    reveal.ts         — IntersectionObserver for .reveal animations
    constants.ts      — siteUrl, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, TAP_COUNT
public/
  _headers            — Cloudflare Pages CSP + cache headers
  robots.txt          — Sitemap reference
  assets/             — Static images (taproom, logos, food trucks)
scripts/
  migrate-to-sanity.mjs   — One-shot JSON → Sanity import (already executed)
  backfill-images.mjs     — Uploads local images to Sanity (already executed)
  migration-source/       — Read-only archive of the original JSON content
studio/                   — Sanity Studio (separate sub-project, deployed to gridiron-brewing.sanity.studio)
```
