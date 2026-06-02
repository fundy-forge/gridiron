# Gridiron Brewing Co. — Project Guide

## Project Overview
Static brewery website for **Gridiron Brewing Co.**, Hampton, New Brunswick.
Built with Astro 6.4.2 + TypeScript + Tailwind CSS 4.3.0. Node >= 22.12.0 required.

Live site: **gridironbrewing.ca**
GitHub: https://github.com/docfunbags/gridiron.git (branch: `main`)
CMS: Decap CMS at `/admin` (git-gateway backend)

---

## Workflow

**Before starting work:** always `git pull` first — CMS edits commit directly to GitHub and need to be pulled down before making local changes.

**After making changes:** commit and push. Netlify detects the push and auto-deploys (1–2 min).

```
git pull
# ... make changes ...
git add <files>
git commit -m "description"
git push
```

If there's a merge conflict, it's almost always `src/data/*.json` being edited via CMS at the same time. Resolve by keeping the CMS version of content and re-applying the code change.

---

## Content Management (Decap CMS)

All content is managed through `/admin` on the live site. CMS edits commit directly to GitHub as JSON. Never hardcode content that belongs in these files:

| CMS Collection | Data File | Used By |
|---|---|---|
| 🍺 Beer List | `src/data/beers.json` | `beers.astro`, `OnTap.astro` |
| 📅 Events | `src/data/events.json` | `Events.astro` |
| 📸 Community Photos | `src/data/community.json` | `Community.astro` |

`src/data/beers.ts` imports `beers.json` and computes `canBg` (gradient from `canColor`) and aliases `cn`/`light` — this is the single source of truth for beer data consumed by components.

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
Hero (paper) → OnTap (dark) → Taproom (amber) → About (paper) → Events (paper-2) → Instagram (dark) → Community (amber) → Footer (dark)

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

## Rules & Conventions

**Tap count is always 12.** There are 12 physical tap handles. Never derive this number dynamically from the `onTap` flag in `beers.json` — that flag is for CMS filtering only. Hardcode as `12` in stats and `twelve` in prose.

**The `onTap` flag** in `beers.json` controls display order and on-tap indicators in the UI. It does not represent the physical tap count.

**Beer data shape** (`beers.json`):
- `canColor` — single hex used as the darker stop; `beers.ts` auto-generates the gradient
- `canLabel` — two-element array for the two lines of can label text
- `lightText` — true if can is very dark and needs light-coloured label text
- `tag` — `flagship` | `seasonal` | `guest` | `hidden`

**Community photos** cycle client-side: 6 slots shown, one random slot crossfades every 3 seconds through the full pool in `community.json`. Pool is managed via Decap CMS.

**Committing:** always include `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` in commit messages.

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
    beers.json        — Beer list (CMS-managed)
    beers.ts          — Imports beers.json, computes canBg/cn/light
    events.json       — Events (CMS-managed)
    community.json    — Community photo pool (CMS-managed)
  styles/
    global.css        — All design tokens, band classes, component styles
  layouts/
    Layout.astro      — Base HTML shell, imports Navbar + Footer
public/
  admin/
    config.yml        — Decap CMS configuration
    index.html        — CMS entry point
  assets/
    photos/           — Community and general photos
    logos/            — Gridiron logo variants
    cans/             — Beer can images
```
