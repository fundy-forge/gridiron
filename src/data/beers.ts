export interface Beer {
  name: string;
  style: string;
  desc: string;
  abv: number;
  ibu: number;
  tag: 'flagship' | 'seasonal' | 'guest' | 'hidden';
  styleCat: 'lager' | 'amber' | 'ipa' | 'dark';
  canColor: string;
  canLabel: [string, string];
  lightText: boolean;
  onTap: boolean;
  // Generated
  canBg: string;
}

function lighten(hex: string): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + 40);
  const g = Math.min(255, ((n >> 8) & 0xff) + 40);
  const b = Math.min(255, (n & 0xff) + 40);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const modules = import.meta.glob('./beers/*.json', { eager: true });

export const beers: Beer[] = Object.values(modules)
  .map(m => (m as { default: Omit<Beer, 'canBg'> }).default)
  .map(b => ({
    ...b,
    canBg: `linear-gradient(${lighten(b.canColor)},${b.canColor})`,
  }));
