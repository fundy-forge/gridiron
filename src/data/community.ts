export interface CommunityPhoto {
  src: string;
  alt: string;
}

const modules = import.meta.glob('./community/*.json', { eager: true });

export const photos: CommunityPhoto[] = Object.values(modules)
  .map(m => (m as { default: CommunityPhoto }).default);
