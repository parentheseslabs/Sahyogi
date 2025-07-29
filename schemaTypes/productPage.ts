import { defineType } from 'sanity'

export default defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Your All-In-One Business Tool on WhatsApp'
    },
    {
      name: 'productIntro',
      title: 'Product Introduction',
      type: 'text',
      initialValue: 'Sahyogi brings chatbot flows, campaign management, invoicing, and analytics—all into WhatsApp. One login. Zero code.'
    },
    {
      name: 'interactiveDemo',
      title: 'Interactive Demo',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Demo Type',
          type: 'string',
          options: {
            list: [
              { title: 'Video', value: 'video' },
              { title: 'Image', value: 'image' },
              { title: 'Embed Code', value: 'embed' }
            ]
          },
          initialValue: 'video'
        },
        {
          name: 'description',
          title: 'Demo Description',
          type: 'string',
          description: 'Description text that appears above the demo'
        },
        // Video Section
        {
          name: 'videoSelection',
          title: 'Video Source',
          type: 'string',
          options: {
            list: [
              { title: 'YouTube/External URL', value: 'url' },
              { title: 'Upload Video File', value: 'upload' }
            ]
          },
          initialValue: 'url',
          hidden: ({ parent }) => parent?.type !== 'video'
        },
        {
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'YouTube URL or direct video file URL (.mp4, .webm, .mov, etc.)',
          hidden: ({ parent }) => parent?.type !== 'video' || parent?.videoSelection !== 'url'
        },
        {
          name: 'uploadedVideo',
          title: 'Upload Video File',
          type: 'file',
          description: 'Upload your video file directly (MP4, WebM, MOV, etc.)',
          options: {
            accept: 'video/*'
          },
          hidden: ({ parent }) => parent?.type !== 'video' || parent?.videoSelection !== 'upload'
        },
        {
          name: 'videoThumbnail',
          title: 'Video Thumbnail (Optional)',
          type: 'image',
          description: 'Custom thumbnail image for uploaded videos',
          hidden: ({ parent }) => parent?.type !== 'video' || parent?.videoSelection !== 'upload'
        },
        // Image Section
        {
          name: 'imageSelection',
          title: 'Image Source',
          type: 'string',
          options: {
            list: [
              { title: 'Upload Image', value: 'upload' },
              { title: 'Image URL', value: 'url' }
            ]
          },
          initialValue: 'upload',
          hidden: ({ parent }) => parent?.type !== 'image'
        },
        {
          name: 'uploadedImage',
          title: 'Upload Image',
          type: 'image',
          hidden: ({ parent }) => parent?.type !== 'image' || parent?.imageSelection !== 'upload'
        },
        {
          name: 'imageUrl',
          title: 'Image URL',
          type: 'url',
          hidden: ({ parent }) => parent?.type !== 'image' || parent?.imageSelection !== 'url'
        },
        // Embed Section
        {
          name: 'embedCode',
          title: 'Embed Code',
          type: 'text',
          description: 'HTML embed code (iframe, etc.)',
          hidden: ({ parent }) => parent?.type !== 'embed'
        }
      ]
    },
    {
      name: 'keyModules',
      title: 'Key Modules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Module Title',
              type: 'string'
            },
            {
              name: 'icon',
              title: 'Module Icon',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Module Description',
              type: 'text'
            },
            {
              name: 'features',
              title: 'Module Features',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        }
      ],
      initialValue: [
        {
          title: 'Chatbot Builder',
          icon: '🤖',
          description: 'Create intelligent conversational flows without coding',
          features: [
            'Visual flow builder',
            'Templates library',
            'Conditional logic'
          ]
        },
        {
          title: 'Campaign Manager',
          icon: '📢',
          description: 'Manage and automate your marketing campaigns',
          features: [
            'WhatsApp Blasts',
            'Drip Campaigns',
            'Lead tags'
          ]
        },
        {
          title: 'Analytics Dashboard',
          icon: '📊',
          description: 'Track performance with real-time insights',
          features: [
            'Live metrics & heatmaps',
            'Funnel tracking',
            'Agent performance reports'
          ]
        }
      ]
    },
    {
      name: 'pricingSnapshot',
      title: 'Pricing Snapshot',
      type: 'object',
      fields: [
        {
          name: 'startingPrice',
          title: 'Starting Price',
          type: 'string',
          initialValue: '₹7,500/month'
        },
        {
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          initialValue: 'View Full Pricing'
        },
        {
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          initialValue: '/pricing'
        }
      ]
    },
    {
      name: 'ctaButtons',
      title: 'Call-to-Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Button Link',
              type: 'string'
            },
            {
              name: 'type',
              title: 'Button Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' }
                ]
              }
            }
          ]
        }
      ],
      initialValue: [
        {
          text: 'Start Free Trial',
          link: '/trial',
          type: 'primary'
        },
        {
          text: 'Schedule Demo',
          link: '/demo',
          type: 'secondary'
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          initialValue: 'Sahyogi - Your All-In-One Business Tool on WhatsApp'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          initialValue: 'Sahyogi brings chatbot flows, campaign management, invoicing, and analytics—all into WhatsApp. One login. Zero code.'
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['WhatsApp business', 'chatbot builder', 'campaign management', 'business automation', 'WhatsApp analytics']
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'productIntro'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Product Page',
        subtitle: subtitle
      }
    }
  }
})
