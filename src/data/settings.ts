import { sanity } from '../lib/sanity';

export interface Schedule {
  title: string;
  heroSummary: string;
  holidayNote: string;
  days: {
    day: string;
    isClosed: boolean;
    opens: string;
    closes: string;
    showIsh: boolean;
  }[];
}

export async function fetchActiveSchedule(): Promise<Schedule | null> {
  try {
    const data = await sanity.fetch(`
      *[_type == "siteSettings"][0] {
        "active": activeSchedule-> {
          title,
          heroSummary,
          holidayNote,
          days[] {
            day,
            isClosed,
            opens,
            closes,
            showIsh
          }
        }
      }
    `);
    return data?.active || null;
  } catch (err) {
    console.error('[sanity] Failed to load active schedule:', err);
    return null;
  }
}

export const activeSchedule = await fetchActiveSchedule();
