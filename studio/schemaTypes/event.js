export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'desc', title: 'Description', type: 'text', rows: 3 },
    { name: 'when', title: 'When (e.g. Fri · 7:00 PM)', type: 'string' },
    { name: 'day', title: 'Day number (e.g. 05)', type: 'string' },
    { name: 'month', title: 'Month (e.g. JUN)', type: 'string' },
    { name: 'calDate', title: 'Calendar date (ISO, e.g. 2026-06-05T19:00)', type: 'string' },
    { name: 'cover', title: 'Cover charge (blank or "No Fee")', type: 'string' },
    { name: 'image', title: 'Event image', type: 'image', options: { hotspot: true } },
    { name: 'recurring', title: 'Recurring weekly event?', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'title', subtitle: 'when', media: 'image' },
  },
};
