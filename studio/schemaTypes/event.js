export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'desc', title: 'Description', type: 'text', rows: 3 },
    { name: 'when', title: 'When (display, e.g. Fri · 7:00 PM)', type: 'string' },
    { name: 'day', title: 'Day number (e.g. 05)', type: 'string' },
    { name: 'month', title: 'Month (e.g. JUN)', type: 'string' },
    {
      name: 'calDate',
      title: 'Start date & time',
      type: 'datetime',
      options: { timeStep: 15 },
      description: 'Required for non-recurring events so it appears in calendar feeds and search results.',
    },
    {
      name: 'endDate',
      title: 'End date & time (optional)',
      type: 'datetime',
      options: { timeStep: 15 },
      description: 'If blank, defaults to start + 2 hours in structured data.',
    },
    { name: 'cover', title: 'Cover charge (blank or "No Fee")', type: 'string' },
    { name: 'image', title: 'Event image', type: 'image', options: { hotspot: true } },
    { name: 'recurring', title: 'Recurring weekly event?', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'title', subtitle: 'when', media: 'image' },
  },
};
