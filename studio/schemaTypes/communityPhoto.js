export const communityPhoto = {
  name: 'communityPhoto',
  title: 'Community Photo',
  type: 'document',
  fields: [
    { name: 'alt', title: 'Alt text', type: 'string', validation: R => R.required() },
    { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, validation: R => R.required() },
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
  },
};
