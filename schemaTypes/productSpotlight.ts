export default {
  name: 'productSpotlight',
  title: 'Product Spotlight',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'copy',
      title: 'Copy',
      type: 'text',
    },
    {
      name: 'carouselImages',
      title: 'Carousel Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.min(1),
    },
  ],
}; 