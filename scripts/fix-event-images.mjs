import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const events = await client.fetch('*[_type == "event" && defined(image)] { _id }');
console.log(`Patching ${events.length} events...`);
const tx = client.transaction();
for (const e of events) tx.patch(e._id, p => p.unset(['image']));
await tx.commit();
console.log('Done.');
