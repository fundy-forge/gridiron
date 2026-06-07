# Gridiron Brewing — Gemini Project Guide

## 🛠 Project Overview
Static brewery website for **Gridiron Brewing**, Hampton, New Brunswick.
**Stack:** Astro 6.4.2 · TypeScript · Sanity CMS · Cloudflare Pages.

---

## 🛰 Workflow (The "Hand-Lettered" Process)

To ensure the highest quality and respect for the brewery's "rooted in place" philosophy, I follow a strict **Plan-Confirm-Commit-Push** workflow for all code changes.

1.  **Plan:** I will describe the proposed changes, the technical rationale, and the impact on the design or SEO.
2.  **Confirm:** I will wait for your explicit approval before modifying any files.
3.  **Commit:** Once approval is granted, I will make the changes and ask for permission to perform the `git commit`.
4.  **Push:** After committing, I will ask for a final permission to `git push` to trigger the Cloudflare build.

**Content Strategy:**
- **Code Changes:** Follow the workflow above.
- **Content Updates (Beers, Events, Photos):** Always performed in **Sanity Studio**. No code changes or commits required.

---

## 🎨 Design Philosophy
**IMPORTANT — The Gridiron Name:** "Gridiron" does not refer to football. The brewery is named after the Gridiron, a section of rapids on the Kennebecasis River near Hampton, NB. Do not make football-themed suggestions, copy, or design choices.

**Warm, unpretentious, rooted in place.**
The site should feel like the Gridiron taproom: dark wood, amber light, and hand-lettered signage. Every design choice must reinforce that this is a local, community-focused brewery on the Kennebecasis River.

### Visual Guardrails
- **Color:** Strictly use CSS variables (tokens) from `global.css`. Never use raw hex codes.
- **Typography:**
  - **Archivo:** Body copy, prices, UI (Readability).
  - **Anton:** Display headings, large stats (Impact).
  - **DM Mono:** Technical labels, kickers, tags (Detail).
- **Bands:** Use the Section Band classes (`.band-dark`, `.band-amber`, `.band-paper2`) to alternate visual rhythm. Never place two identical bands adjacent to each other.

---

## 🏷 Rules & Conventions

**The Tap Rule:**
Tap count is **always 12**. Hardcode as `12` in stats and `twelve` in prose. Never derive this dynamically from beer availability.

**Data Standards:**
- **Beer Sorting:** Handled in GROQ via `src/data/beers.ts` (On-Tap first).
- **SEO/Metadata:** Every page must pass a title and description to `Layout.astro`. Structured data (JSON-LD) for Events and LocalBusiness must be kept in sync with Sanity.
- **Images:** Static assets in `public/assets/` must be **WebP**. Sanity assets use the `img()` helper for responsive variants.

**Committing:**
Use **Conventional Commits** (e.g., `feat:`, `fix:`, `style:`, `seo:`).

---

## 📍 Key Locations
- **Schemas:** `studio/schemaTypes/`
- **Data Fetchers:** `src/data/` (Beers, Events, Community, Settings)
- **Global Styles:** `src/styles/global.css`
- **Layout:** `src/layouts/Layout.astro`
