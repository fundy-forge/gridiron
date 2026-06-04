import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const photos = await client.fetch('*[_type == "communityPhoto" && defined(legacySrc)] { _id }');
console.log(`Patching ${photos.length} community photos...`);
const tx = client.transaction();
for (const p of photos) tx.patch(p._id, patch => patch.unset(['legacySrc']));
await tx.commit();
console.log('Done.');
