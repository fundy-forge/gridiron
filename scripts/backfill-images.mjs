/**
 * Uploads local images to Sanity and patches documents to reference them.
 * Run after migrate-to-sanity.mjs.
 */

import { createClient } from '@sanity/client';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';

const ROOT = dirname(dirname(fileURLToPath(new URL(import.meta.url))));

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

function readJsonDir(dir) {
  return readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({ file: f, ...JSON.parse(readFileSync(join(dir, f), 'utf8')) }));
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function uploadImage(localPath) {
  const absPath = join(ROOT, 'public', localPath);
  if (!existsSync(absPath)) {
    console.warn(`  SKIP (file not found): ${absPath}`);
    return null;
  }
  const ext = extname(localPath).slice(1);
  const filename = basename(localPath);
  console.log(`  Uploading ${filename}...`);
  const asset = await client.assets.upload('image', createReadStream(absPath), {
    filename,
    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  });
  return asset._id;
}

async function backfill() {
  // --- Community photos ---
  const photos = readJsonDir(join(ROOT, 'scripts/migration-source/community'));
  console.log(`\nBackfilling ${photos.length} community photos...`);
  for (const p of photos) {
    const docId = `photo-${slugify(p.alt)}`;
    const assetId = await uploadImage(p.src);
    if (!assetId) continue;
    await client.patch(docId).set({
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    }).commit();
    console.log(`  Patched ${docId}`);
  }

  // --- Events ---
  const events = readJsonDir(join(ROOT, 'scripts/migration-source/events'));
  console.log(`\nBackfilling event images...`);
  for (const e of events) {
    if (!e.image) continue;
    const id = e.recurring
      ? `event-${slugify(e.title)}`
      : `event-${e.calDate?.substring(0, 10) ?? 'unknown'}-${slugify(e.title)}`;
    const assetId = await uploadImage(e.image);
    if (!assetId) continue;
    await client.patch(id).set({
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
    }).commit();
    console.log(`  Patched ${id}`);
  }

  console.log('\nDone!');
}

backfill().catch(console.error);
