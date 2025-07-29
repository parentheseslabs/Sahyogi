export default {
  name: 'coreService',
  title: 'Core Service',
  type: 'document',
  fields: [
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