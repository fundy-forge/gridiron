import { sanity } from '../lib/sanity';

export interface Event {
  title: string;
  desc: string;
  when: string;
  day: string;
  month: string;
  calDate: string;
  cover: string;
  image: string;
  recurring: boolean;
}

export const events: Event[] = await sanity.fetch<Event[]>(`
  *[_type == "event"] | order(recurring asc, calDate asc) {
    title, desc, when, day, month, calDate, cover,
    "image": image.asset->url,
    recurring
  }
`);
