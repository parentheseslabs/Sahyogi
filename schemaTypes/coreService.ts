export default {
  name: 'coreService',
  title: 'Core Service',
  type: 'document',
  fields: [
    {
      name: 'icon',
      title: 'Service Icon',
      type: 'image',
      options: { 
        hotspot: true,
        accept: 'image/*'
      },
      description: 'Upload an icon for this service (SVG, PNG, or JPG recommended)'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'benefit',
      title: 'Benefit',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Service Page Link',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    
    {
      name: 'overlayText',
      title: 'Overlay Text',
      type: 'text',
      description: 'Text to show in the overlay on card hover.'
    },
  ],
}; 