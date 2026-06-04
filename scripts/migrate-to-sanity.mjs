/**
 * Run once to import existing JSON data into Sanity.
 * Usage: SANITY_TOKEN=<your-write-token> node scripts/migrate-to-sanity.mjs
 *
 * Get a write token from: sanity.io → your project → API → Tokens → Add API token (Editor role)
 */

import { createClient } from '@sanity/client';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(new URL(import.meta.url))));

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

function readDir(dir) {
  return readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(readFileSync(join(dir, f), 'utf8')));
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function migrate() {
  const beers = readDir(join(ROOT, 'scripts/migration-source/beers'));
  const events = readDir(join(ROOT, 'scripts/migration-source/events'));
  const photos = readDir(join(ROOT, 'scripts/migration-source/community'));

  console.log(`Migrating ${beers.length} beers, ${events.length} events, ${photos.length} photos...`);

  const tx = client.transaction();

  for (const b of beers) {
    tx.createOrReplace({
      _type: 'beer',
      _id: `beer-${slugify(b.name)}`,
      name: b.name,
      style: b.style,
      desc: b.desc,
      abv: b.abv,
      ibu: b.ibu,
      tag: b.tag,
      styleCat: b.styleCat,
      canColor: b.canColor,
      canLabel: b.canLabel,
      lightText: b.lightText ?? false,
      onTap: b.onTap ?? false,
    });
  }

  for (const e of events) {
    const id = e.recurring
      ? `event-${slugify(e.title)}`
      : `event-${e.calDate?.substring(0, 10) ?? 'unknown'}-${slugify(e.title)}`;
    tx.createOrReplace({
      _type: 'event',
      _id: id,
      title: e.title,
      desc: e.desc,
      when: e.when,
      day: e.day,
      month: e.month,
      calDate: e.calDate,
      cover: e.cover ?? '',
      recurring: e.recurring ?? false,
    });
  }

  for (const p of photos) {
    tx.createOrReplace({
      _type: 'communityPhoto',
      _id: `photo-${slugify(p.alt)}`,
      alt: p.alt,
    });
  }

  await tx.commit();
  console.log('Done! Note: community photo images must be uploaded manually in Sanity Studio.');
}

migrate().catch(console.error);
