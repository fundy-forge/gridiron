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

const modules = import.meta.glob('./events/*.json', { eager: true });

export const events: Event[] = Object.values(modules)
  .map(m => (m as { default: Event }).default)
  .sort((a, b) => {
    if (a.recurring !== b.recurring) return a.recurring ? 1 : -1;
    return a.calDate.localeCompare(b.calDate);
  });
