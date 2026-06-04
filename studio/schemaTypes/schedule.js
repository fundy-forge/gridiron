export const schedule = {
  name: 'schedule',
  title: 'Operating Schedule',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Season Title',
      type: 'string',
      description: 'e.g. "Summer Hours", "Winter 2026"',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroSummary',
      title: 'Hero Summary',
      type: 'string',
      description: 'Concise summary for the homepage hero (e.g. "Tue–Sun" or "Open Daily").',
      initialValue: 'Tue–Sun'
    },
    {
      name: 'days',
      title: 'Daily Hours',
      type: 'array',
      of: [{
        type: 'object',
        name: 'dailySchedule',
        fields: [
          {
            name: 'day',
            title: 'Day of Week',
            type: 'string',
            options: {
              list: [
                'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                'Friday', 'Saturday', 'Sunday'
              ]
            }
          },
          { name: 'isClosed', title: 'Closed?', type: 'boolean' },
          { 
            name: 'opens', 
            title: 'Opens', 
            type: 'string', 
            hidden: ({ parent }) => parent?.isClosed 
          },
          { 
            name: 'closes', 
            title: 'Closes', 
            type: 'string', 
            hidden: ({ parent }) => parent?.isClosed 
          },
          {
            name: 'showIsh',
            title: 'Add "ish"?',
            type: 'boolean',
            initialValue: false,
            description: 'Appends "ish" to the closing time on the website (e.g. 9:00 PM \'ish) without affecting SEO.',
            hidden: ({ parent }) => parent?.isClosed
          }
        ],
        preview: {
          select: {
            title: 'day',
            closed: 'isClosed',
            opens: 'opens',
            closes: 'closes',
            ish: 'showIsh'
          },
          prepare({ title, closed, opens, closes, ish }) {
            return {
              title: title,
              subtitle: closed ? '🚫 Closed' : `⏰ ${opens} — ${closes}${ish ? " 'ish" : ""}`
            }
          }
        }
      }]
    },
    {
      name: 'holidayNote',
      title: 'Holiday Note',
      type: 'string',
      initialValue: 'Usually open on Holiday Mondays — check social media for updates.'
    }
  ]
}
