import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  collections: {
    beers: collection({
      label: 'Beers',
      slugField: 'name',
      path: 'src/data/beers/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        style: fields.text({ label: 'Style' }),
        desc: fields.text({ label: 'Description', multiline: true }),
        abv: fields.number({ label: 'ABV' }),
        ibu: fields.integer({ label: 'IBU' }),
        tag: fields.select({
          label: 'Tag',
          options: [
            { label: 'Flagship', value: 'flagship' },
            { label: 'Seasonal', value: 'seasonal' },
            { label: 'Guest', value: 'guest' },
            { label: 'Hidden', value: 'hidden' },
          ],
          defaultValue: 'flagship',
        }),
        styleCat: fields.select({
          label: 'Style Category',
          options: [
            { label: 'Lager', value: 'lager' },
            { label: 'Amber', value: 'amber' },
            { label: 'IPA', value: 'ipa' },
            { label: 'Dark', value: 'dark' },
          ],
          defaultValue: 'lager',
        }),
        canColor: fields.text({ label: 'Can Color (hex)' }),
        canLabel: fields.array(
          fields.text({ label: 'Line' }),
          { label: 'Can Label Lines' }
        ),
        lightText: fields.checkbox({ label: 'Light Text', defaultValue: false }),
        onTap: fields.checkbox({ label: 'On Tap', defaultValue: false }),
      },
    }),

    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/data/events/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        desc: fields.text({ label: 'Description', multiline: true }),
        when: fields.text({ label: 'When' }),
        day: fields.text({ label: 'Day' }),
        month: fields.text({ label: 'Month' }),
        calDate: fields.text({ label: 'Calendar Date (ISO)' }),
        cover: fields.text({ label: 'Cover Charge' }),
        image: fields.text({ label: 'Image Path' }),
        recurring: fields.checkbox({ label: 'Recurring', defaultValue: false }),
      },
    }),

    community: collection({
      label: 'Community Photos',
      slugField: 'alt',
      path: 'src/data/community/*',
      format: { data: 'json' },
      schema: {
        alt: fields.slug({ name: { label: 'Alt Text' } }),
        src: fields.text({ label: 'Image Path' }),
      },
    }),
  },
});
