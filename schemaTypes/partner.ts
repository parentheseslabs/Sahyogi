export default {
  name: 'partner',
  title: 'Partner SME',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'link', title: 'Website Link', type: 'string' },
  ],
}; 