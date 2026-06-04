import { siteUrl } from './constants';
import type { Event } from '../data/events';

export function buildEventSchema(ev: Event) {
  const start = new Date(ev.calDate);
  if (isNaN(start.getTime())) return null;

  const end = ev.endDate ? new Date(ev.endDate) : new Date(start.getTime() + 2 * 60 * 60 * 1000);

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: ev.title,
    description: ev.desc,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    ...(ev.imageFull ? { image: ev.imageFull } : {}),
    location: {
      '@type': 'Place',
      name: 'Gridiron Brewing',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1051 Main Street',
        addressLocality: 'Hampton',
        addressRegion: 'NB',
        addressCountry: 'CA',
      },
    },
    organizer: { '@type': 'Organization', name: 'Gridiron Brewing', url: siteUrl },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: !ev.cover || ev.cover === 'No Fee',
  };
}

export function buildEventSchemas(events: Event[]) {
  const now = new Date();
  return events
    .filter((ev) => ev.calDate && new Date(ev.calDate) > now)
    .map(buildEventSchema)
    .filter((s): s is NonNullable<ReturnType<typeof buildEventSchema>> => s !== null);
}

function fmt(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
}

export function gcalUrl(ev: Event): string {
  const start = new Date(ev.calDate);
  const end = ev.endDate ? new Date(ev.endDate) : new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: ev.desc,
    location: 'Gridiron Brewing, Hampton, NB',
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

export function icsUri(ev: Event): string {
  const start = new Date(ev.calDate);
  const end = ev.endDate ? new Date(ev.endDate) : new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const uid = `${ev.calDate.replace(/\W/g, '')}-gridiron@gridironbrewing.com`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escapeIcs(ev.title)}`,
    `DESCRIPTION:${escapeIcs(ev.desc)}`,
    'LOCATION:Gridiron Brewing, Hampton, NB',
    `UID:${uid}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines)}`;
}
