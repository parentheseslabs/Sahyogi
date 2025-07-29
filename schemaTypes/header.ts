export default {
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'string', // Change to 'image' if you want image upload
    },
    {
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
          ],
        },
      ],
    },
  ],
}; 