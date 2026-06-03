import { sanity } from '../lib/sanity';

export interface CommunityPhoto {
  src: string;
  alt: string;
}

export const photos: CommunityPhoto[] = await sanity.fetch<CommunityPhoto[]>(`
  *[_type == "communityPhoto"] | order(_createdAt asc) {
    "src": image.asset->url,
    alt
  }
`);
