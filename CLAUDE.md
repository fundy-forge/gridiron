# Gridiron Brewing — Project Guide

## Project Overview
Static brewery website for **Gridiron Brewing**, Hampton, New Brunswick.
Built with Astro 6.4.2 + TypeScript + Tailwind CSS 4.3.0. Node >= 22.12.0 required.

Live site: **gridironbrewing.com**
GitHub: https://github.com/docfunbags/gridiron.git (branch: `main`)

**Contact details** — use these wherever the brewery's info appears:
- Phone: `(506) 832-4592` · tel link: `tel:+15068324592`
- Email: `info@gridironbrewing.com`
- Address: `1051 Main Street, Hampton, NB E5N 6B2`

---

## Workflow

**Before starting work:** always `git pull` first.

**After making changes:** commit and push. Netlify detects the push and auto-deploys (1–2 min).

```
git pull
# ... make changes ...
git add <files>
git commit -m "description"
git push
```

If there's a merge conflict in `src/data/*/` files, resolve by keeping the correct content version and re-applying the code change.

---

## Content Management

All content is stored as individual JSON files — edit them directly in the repo. Never hardcode content that belongs in these directories:

| Collection | Data Directory | Used By |
|---|---|---|
| Beer List | `src/data/beers/*.json` | `beers.astro`, `OnTap.astro` |
| Events | `src/data/events/*.json` | `events.astro`, `Events.astro` |
| Community Photos | `src/data/community/*.json` | `gallery.astro`, `Community.astro` |

Data modules:
- `src/data/beers.ts` — globs `beers/*.json`, computes `canBg` (gradient from `canColor`), exports `beers[]`
- `src/data/events.ts` — globs `events/*.json`, sorts non-recurring chronologically then recurring, exports `events[]`
- `src/data/community.ts` — globs `community/*.json`, exports `photos[]`

Event slugs: non-recurring are date-prefixed (`2026-06-05-event-name.json`); recurring are title-slugified only.

---

## Design Philosophy

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
All images must be WebP before committing. Never commit raw PNGs or JPGs (except `logo-favicon.png`).

1. Drop new images into the appropriate `public/assets/` subfolder
2. Run `node scripts/optimize-images.mjs` — converts to WebP, resizes logos, deletes originals
3. Update any `src` references to use `.webp`

**Social card image:** `og:image` and `twitter:image` in Layout.astro currently point to `crowded-bar.webp` as a fallback. Ideally replace with a dedicated 1200×628 branded image at `public/assets/logos/og-card.webp` when one is available.

Naming conventions:
- **Logos** — role-based: `logo-nav.webp`, `logo-hero.webp`, `logo-footer.webp`, `logo-favicon.png`
- **Event images** — date-prefixed: `YYYY-MM-DD_slug.webp`
- **Photos / food / community** — descriptive slug, no date prefix

The `_unused/` folder lives at the project root (not in `public/`) so unused assets are not deployed.

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
    index.astro       — Homepage (imports all section components)
    beers.astro       — Full tap list + drinks menu
    visit.astro       — Hours, address, food trucks, private hire
  components/
    Hero.astro        — Full-bleed hero with stats strip
    OnTap.astro       — Homepage beer grid (reads beers.json, onTap:true)
    Taproom.astro     — Taproom description + CTA
    About.astro       — Story section with stats
    Events.astro      — Upcoming events list (reads events.json)
    InstagramFeed.astro — Social section
    Community.astro   — Cycling photo mosaic + community copy
    Footer.astro      — Site footer
    Navbar.astro      — Sticky nav
  data/
    beers/*.json      — Beer entries (one file per beer)
    beers.ts          — Globs beers/*.json, computes canBg
    events/*.json     — Event entries (one file per event)
    community/*.json  — Community photo entries
  styles/
    global.css        — All design tokens, band classes, component styles
  layouts/
    Layout.astro      — Base HTML shell, imports Navbar + Footer
  utils/
    lightbox.ts       — Shared lightbox open/close (focus management, aria-hidden, scroll lock)
    constants.ts      — Shared constants: siteUrl — do not redeclare this inline anywhere
public/
  assets/
    photos/           — Community and general photos
    logos/            — Gridiron logo variants
    cans/             — Beer can images
```
