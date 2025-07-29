import { defineType } from 'sanity'

export default defineType({
  name: 'leadGenerationPutReach',
  title: 'Lead Generation & Outreach',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Lead Generation & Outreach'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      initialValue: 'Resolve queries faster, without burning out your team.'
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'object',
      fields: [
        {
          name: 'icon',
          title: 'Challenge Icon',
          type: 'string',
          initialValue: '⚠️'
        },
        {
          name: 'text',
          title: 'Challenge Text',
          type: 'text',
          initialValue: 'Customers expect instant support, but SME teams are small.'
        }
      ]
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'object',
      fields: [
        {
          name: 'icon',
          title: 'Solution Icon',
          type: 'string',
          initialValue: '💡'
        },
        {
          name: 'text',
          title: 'Solution Text',
          type: 'text',
          initialValue: 'Sahyogi\'s AI handles FAQs, order queries, and escalations instantly on WhatsApp.'
        }
      ]
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              initialValue: '✅'
            },
            {
              name: 'text',
              title: 'Feature Text',
              type: 'string'
            }
          ]
        }
      ],
      initialValue: [
        { icon: '✅', text: 'Smart auto-replies trained on your FAQs' },
        { icon: '✅', text: 'Escalation to human agents with context' },
        { icon: '✅', text: 'Real-time dashboard insights' },
        { icon: '✅', text: 'Customizable workflows' }
      ]
    },
    {
      name: 'stats',
      title: 'Performance Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string'
            },
            {
              name: 'label',
              title: 'Stat Label',
              type: 'string'
            },
            {
              name: 'value',
              title: 'Stat Value',
              type: 'string'
            },
            {
              name: 'color',
              title: 'Color (Hex)',
              type: 'string',
              description: 'Hex color code for the stat value'
            }
          ]
        }
      ],
      initialValue: [
        { icon: '⚡', label: 'Response Time', value: '↓ 65%', color: '#22c55e' },
        { icon: '📞', label: 'Agent Load', value: '↓ 50%', color: '#3b82f6' },
        { icon: '💬', label: 'CSAT', value: '↑ 2.2x', color: '#8b5cf6' }
      ]
    },
    {
      name: 'improvement',
      title: 'Improvement Highlight',
      type: 'object',
      fields: [
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          initialValue: '💡'
        },
        {
          name: 'text',
          title: 'Improvement Text',
          type: 'string',
          initialValue: 'Response Time ↓ 65%'
        }
      ]
    },
    {
      name: 'ctaButtons',
      title: 'Call to Action Buttons',
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
              type: 'url'
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
        { text: 'Talk to an Expert', link: '#contact', type: 'primary' },
        { text: 'View Pricing', link: '#pricing', type: 'secondary' }
      ]
    },
    ],
})
