export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'missionIcon',
      title: 'Mission Icon',
      type: 'image',
      options: { 
        hotspot: true,
        accept: 'image/*'
      },
      description: 'Upload an icon for the Mission section (SVG, PNG, or JPG recommended)'
    },
    {
      name: 'mission',
      title: 'Mission',
      type: 'text',
      description: 'The mission statement for the company.'
    },
    {
      name: 'visionIcon',
      title: 'Vision Icon',
      type: 'image',
      options: { 
        hotspot: true,
        accept: 'image/*'
      },
      description: 'Upload an icon for the Vision section (SVG, PNG, or JPG recommended)'
    },
    {
      name: 'vision',
      title: 'Vision',
      type: 'text',
      description: 'The vision statement for the company.'
    },
    {
      name: 'whoWeAreIcon',
      title: 'Who We Are Icon',
      type: 'image',
      options: { 
        hotspot: true,
        accept: 'image/*'
      },
      description: 'Upload an icon for the Who We Are section (SVG, PNG, or JPG recommended)'
    },
    {
      name: 'whoWeAre',
      title: 'Who We Are',
      type: 'text',
      description: 'A block describing who the company is.'
    },
    {
      name: 'whoWeAreBlock',
      title: 'Who We Are Block',
      type: 'text',
      description: 'Detailed Who We Are section for About page.'
    },
    {
      name: 'ourGoalIcon',
      title: 'Our Goal Icon',
      type: 'image',
      options: { 
        hotspot: true,
        accept: 'image/*'
      },
      description: 'Upload an icon for the Our Goal section (SVG, PNG, or JPG recommended)'
    },
    {
      name: 'ourGoal',
      title: 'Our Goal',
      type: 'text',
      description: 'Content for the Our Goal card in the About page.'
    }
  ]
}; 