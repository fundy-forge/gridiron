import { config, collection, fields } from '@keystatic/core';

const storage = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  ? {
      kind: 'github' as const,
      repo: { owner: 'docfunbags', name: 'gridiron' } as const,
    }
  : { kind: 'local' as const };

export default config({
  storage,
  ui: {
    brand: { name: 'Gridiron Brewing' },
  },

  collections: {
    beers: collection({
      label: 'Beers',
      slugField: 'name',
      path: 'src/data/beers/*',
      format: { data: 'json' },
      schema: {
        name:      fields.slug({ name: { label: 'Name' } }),
        style:     fields.text({ label: 'Style' }),
        desc:      fields.text({ label: 'Description', multiline: true }),
        abv:       fields.number({ label: 'ABV', validation: { min: 0, max: 20 } }),
        ibu:       fields.number({ label: 'IBU', validation: { min: 0, max: 200 } }),
        tag:       fields.select({
          label: 'Tag',
          options: [
            { label: 'Flagship', value: 'flagship' },
            { label: 'Seasonal', value: 'seasonal' },
            { label: 'Guest',    value: 'guest' },
            { label: 'Hidden',   value: 'hidden' },
          ],
          defaultValue: 'flagship',
        }),
        styleCat:  fields.select({
          label: 'Style Category',
          options: [
            { label: 'Lager',        value: 'lager' },
            { label: 'Amber & Pale', value: 'amber' },
            { label: 'IPA',          value: 'ipa' },
            { label: 'Dark',         value: 'dark' },
          ],
          defaultValue: 'lager',
        }),
        canColor:  fields.text({ label: 'Can Colour (hex, e.g. #d8c450)' }),
        canLabel:  fields.array(
          fields.text({ label: 'Line' }),
          { label: 'Can Label Lines (2 lines)', itemLabel: p => p.value }
        ),
        lightText: fields.checkbox({ label: 'Light text on can', defaultValue: false }),
        onTap:     fields.checkbox({ label: 'On Tap Now', defaultValue: false }),
      },
    }),

    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/data/events/*',
      format: { data: 'json' },
      schema: {
        title:     fields.slug({ name: { label: 'Title' } }),
        desc:      fields.text({ label: 'Description', multiline: true }),
        when:      fields.text({ label: 'When (e.g. Fri · 7:00 PM)' }),
        day:       fields.text({ label: 'Day number (e.g. 05)' }),
        month:     fields.text({ label: 'Month (e.g. JUN)' }),
        calDate:   fields.text({ label: 'Calendar date (ISO, e.g. 2026-06-05T19:00)' }),
        cover:     fields.text({ label: 'Cover charge (blank or "No Fee")' }),
        image:     fields.text({ label: 'Image path (/assets/events/...)' }),
        recurring: fields.checkbox({ label: 'Recurring weekly event', defaultValue: false }),
      },
    }),

    community: collection({
      label: 'Community Photos',
      slugField: 'alt',
      path: 'src/data/community/*',
      format: { data: 'json' },
      schema: {
        src: fields.text({ label: 'Image path (/assets/photos/...)' }),
        alt: fields.slug({ name: { label: 'Alt text' } }),
      },
    }),
  },
});
