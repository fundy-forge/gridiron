export const beer = {
  name: 'beer',
  title: 'Beer',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: R => R.required() },
    { name: 'style', title: 'Style', type: 'string' },
    { name: 'desc', title: 'Description', type: 'text', rows: 3 },
    { name: 'abv', title: 'ABV (%)', type: 'number' },
    { name: 'ibu', title: 'IBU', type: 'number' },
    {
      name: 'tag', title: 'Tag', type: 'string',
      options: { list: ['flagship', 'seasonal', 'guest', 'hidden'] },
    },
    {
      name: 'styleCat', title: 'Style Category', type: 'string',
      options: { list: [
        { title: 'Lager', value: 'lager' },
        { title: 'Amber & Pale', value: 'amber' },
        { title: 'IPA', value: 'ipa' },
        { title: 'Dark', value: 'dark' },
      ]},
    },
    { name: 'canColor', title: 'Can Colour (hex, e.g. #d8c450)', type: 'string' },
    {
      name: 'canLabel', title: 'Can Label Lines (2 lines)', type: 'array',
      of: [{ type: 'string' }],
      validation: R => R.max(2),
    },
    { name: 'lightText', title: 'Light text on can?', type: 'boolean', initialValue: false },
    { name: 'onTap', title: 'On Tap Now?', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'name', subtitle: 'style' },
  },
};
