import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function writeEntry(dir, slug, data) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${slug}.json`), JSON.stringify(data, null, 2) + '\n');
  console.log(`  ✓ ${slug}.json`);
}

// ── Beers ──────────────────────────────────────────────────────────────────
const beersDir = join(ROOT, 'src/data/beers');
const beersRaw = JSON.parse(readFileSync(join(ROOT, 'src/data/beers.json'), 'utf8'));
console.log('\nMigrating beers...');
for (const beer of beersRaw.beers) {
  writeEntry(beersDir, slugify(beer.name), beer);
}

// ── Events ─────────────────────────────────────────────────────────────────
const eventsDir = join(ROOT, 'src/data/events');
const eventsRaw = JSON.parse(readFileSync(join(ROOT, 'src/data/events.json'), 'utf8'));
const slugsSeen = new Set();
console.log('\nMigrating events...');
for (const ev of eventsRaw.events) {
  let base = ev.recurring
    ? slugify(ev.title)
    : `${ev.calDate.substring(0, 10)}-${slugify(ev.title)}`;
  let slug = base;
  let counter = 2;
  while (slugsSeen.has(slug)) slug = `${base}-${counter++}`;
  slugsSeen.add(slug);
  writeEntry(eventsDir, slug, ev);
}

// ── Community ──────────────────────────────────────────────────────────────
const communityDir = join(ROOT, 'src/data/community');
const communityRaw = JSON.parse(readFileSync(join(ROOT, 'src/data/community.json'), 'utf8'));
console.log('\nMigrating community photos...');
for (const photo of communityRaw.photos) {
  writeEntry(communityDir, slugify(photo.alt), photo);
}

console.log('\nDone! Run the following to finish:\n  1. Delete src/data/beers.json, events.json, community.json\n  2. Delete public/admin/');
