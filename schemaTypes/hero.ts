export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'headingLine1',
      title: 'Heading Line 1',
      type: 'string',
    },
    {
      name: 'headingLine2',
      title: 'Heading Line 2',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline (e.g., "Through AI Automation")',
      type: 'string',
      description: 'Small tagline that appears above or below the main heading',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'primaryCtaText',
      title: 'Primary CTA Text',
      type: 'string',
    },
    {
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'url',
    },
    {
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
    },
    {
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'url',
    },
    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}; 