import { defineType } from 'sanity'

export default defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Simple, Transparent Pricing'
    },
    {
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text',
      initialValue: 'Choose the perfect plan for your business needs. Start free and scale as you grow.'
    },
    {
      name: 'pricingPlans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'planName',
              title: 'Plan Name',
              type: 'string'
            },
            {
              name: 'planType',
              title: 'Plan Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Basic', value: 'basic' },
                  { title: 'Popular', value: 'popular' },
                  { title: 'Enterprise', value: 'enterprise' }
                ]
              }
            },
            {
              name: 'isPopular',
              title: 'Mark as Popular',
              type: 'boolean',
              description: 'This will add a "Most Popular" badge to the plan'
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g., ₹7,500/month or Free'
            },
            {
              name: 'originalPrice',
              title: 'Original Price (Optional)',
              type: 'string',
              description: 'Show crossed-out original price for discounts'
            },
            {
              name: 'billingPeriod',
              title: 'Billing Period',
              type: 'string',
              description: 'e.g., per month, per year, one-time'
            },
            {
              name: 'description',
              title: 'Plan Description',
              type: 'text'
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'featureText',
                      title: 'Feature Text',
                      type: 'string'
                    },
                    {
                      name: 'included',
                      title: 'Included',
                      type: 'boolean',
                      initialValue: true
                    },
                    {
                      name: 'highlight',
                      title: 'Highlight Feature',
                      type: 'boolean',
                      description: 'Make this feature stand out'
                    }
                  ]
                }
              ]
            },
            {
              name: 'ctaButton',
              title: 'Call to Action Button',
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
                  name: 'isPrimary',
                  title: 'Primary Button Style',
                  type: 'boolean'
                }
              ]
            },
            {
              name: 'additionalInfo',
              title: 'Additional Information',
              type: 'text',
              description: 'Small text below the button'
            }
          ]
        }
      ],
      validation: (Rule) => Rule.max(3).min(1).error('Please add between 1 and 3 pricing plans')
    },
    {
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'FAQ Section Title',
          type: 'string',
          initialValue: 'Frequently Asked Questions'
        },
        {
          name: 'sectionSubtitle',
          title: 'FAQ Section Subtitle',
          type: 'string',
          initialValue: 'Everything you need to know about AIChat Support.'
        },
        {
          name: 'questions',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'question',
                  title: 'Question',
                  type: 'string'
                },
                {
                  name: 'answer',
                  title: 'Answer',
                  type: 'text'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'testimonial',
      title: 'Pricing Page Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text'
        },
        {
          name: 'authorName',
          title: 'Author Name',
          type: 'string'
        },
        {
          name: 'authorTitle',
          title: 'Author Title',
          type: 'string'
        },
        {
          name: 'authorCompany',
          title: 'Author Company',
          type: 'string'
        },
        {
          name: 'authorImage',
          title: 'Author Image',
          type: 'image'
        }
      ]
    },
    {
      name: 'bottomCta',
      title: 'Bottom Call to Action',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'CTA Headline',
          type: 'string'
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'text'
        },
        {
          name: 'primaryButton',
          title: 'Primary Button',
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
            }
          ]
        },
        {
          name: 'secondaryButton',
          title: 'Secondary Button',
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
            }
          ]
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
          type: 'string'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text'
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }
  ],
  initialValue: {
    pageTitle: 'Simple, Transparent Pricing',
    pageSubtitle: 'Choose the perfect plan for your business needs. Start free and scale as you grow.',
    pricingPlans: [
      {
        planName: 'Starter',
        planType: 'basic',
        isPopular: false,
        price: 'Free',
        billingPeriod: 'forever',
        description: 'Perfect for small businesses getting started with WhatsApp automation',
        features: [
          { featureText: 'Up to 100 contacts', included: true },
          { featureText: 'Basic chatbot flows', included: true },
          { featureText: '24/7 support', included: false },
          { featureText: 'Advanced analytics', included: false }
        ],
        ctaButton: {
          text: 'Get Started Free',
          link: '/signup',
          isPrimary: false
        }
      },
      {
        planName: 'Professional',
        planType: 'popular',
        isPopular: true,
        price: '₹7,500',
        billingPeriod: 'per month',
        description: 'Everything you need to scale your WhatsApp business automation',
        features: [
          { featureText: 'Up to 5,000 contacts', included: true },
          { featureText: 'Advanced chatbot flows', included: true },
          { featureText: '24/7 priority support', included: true },
          { featureText: 'Advanced analytics', included: true }
        ],
        ctaButton: {
          text: 'Start Professional',
          link: '/signup?plan=pro',
          isPrimary: true
        }
      },
      {
        planName: 'Enterprise',
        planType: 'enterprise',
        isPopular: false,
        price: 'Custom',
        billingPeriod: 'contact us',
        description: 'Custom solutions for large-scale operations and enterprise needs',
        features: [
          { featureText: 'Unlimited contacts', included: true },
          { featureText: 'Custom integrations', included: true },
          { featureText: 'Dedicated account manager', included: true },
          { featureText: 'Custom features', included: true }
        ],
        ctaButton: {
          text: 'Contact Sales',
          link: '/contact',
          isPrimary: false
        }
      }
    ]
  }
})
