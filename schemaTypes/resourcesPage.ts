import { defineType } from 'sanity'

export default defineType({
  name: 'resourcesPage',
  title: 'Resources Page',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Resources'
    },
    {
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text',
      initialValue: 'Insights, guides, and success stories to help you grow your business with WhatsApp automation'
    },
    {
      name: 'featuredPosts',
      title: 'Featured Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Post Title',
              type: 'string'
            },
            {
              name: 'excerpt',
              title: 'Post Excerpt',
              type: 'text',
              description: 'Brief description of the post'
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Guide', value: 'guide' },
                  { title: 'Case Study', value: 'case-study' },
                  { title: 'Tips & Tricks', value: 'tips' },
                  { title: 'Industry News', value: 'news' },
                  { title: 'Tutorial', value: 'tutorial' }
                ]
              }
            },
            {
              name: 'readTime',
              title: 'Read Time',
              type: 'string',
              description: 'e.g., "5 min read"'
            },
            {
              name: 'publishDate',
              title: 'Publish Date',
              type: 'date'
            },
            {
              name: 'featuredImage',
              title: 'Featured Image',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'author',
              title: 'Author',
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Author Name',
                  type: 'string'
                },
                {
                  name: 'role',
                  title: 'Author Role',
                  type: 'string'
                },
                {
                  name: 'avatar',
                  title: 'Author Avatar',
                  type: 'image'
                }
              ]
            },
            {
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{ type: 'string' }]
            },
            {
              name: 'content',
              title: 'Post Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'Quote', value: 'blockquote' }
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Number', value: 'number' }
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' }
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL'
                          },
                          {
                            name: 'target',
                            type: 'string',
                            title: 'Target',
                            options: {
                              list: [
                                { title: 'Same window', value: '_self' },
                                { title: 'New window', value: '_blank' }
                              ]
                            }
                          }
                        ]
                      }
                    ]
                  }
                },
                {
                  type: 'image',
                  options: {
                    hotspot: true
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text'
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption'
                    }
                  ]
                }
              ]
            },
            {
              name: 'slug',
              title: 'Post Slug',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96
              },
              description: 'URL-friendly version of the title'
            },
            {
              name: 'isFeatured',
              title: 'Featured Post',
              type: 'boolean',
              description: 'Mark as featured to highlight this post'
            }
          ]
        }
      ]
    },
    {
      name: 'categories',
      title: 'Post Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Category Name',
              type: 'string'
            },
            {
              name: 'slug',
              title: 'Category Slug',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Category Description',
              type: 'text'
            },
            {
              name: 'icon',
              title: 'Category Icon',
              type: 'string',
              description: 'Emoji or icon for the category'
            },
            {
              name: 'color',
              title: 'Category Color',
              type: 'string',
              description: 'Hex color code for the category'
            }
          ]
        }
      ]
    },
    {
      name: 'newsletter',
      title: 'Newsletter Signup',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Newsletter Headline',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Newsletter Description',
          type: 'text'
        },
        {
          name: 'buttonText',
          title: 'Subscribe Button Text',
          type: 'string'
        },
        {
          name: 'placeholderText',
          title: 'Email Placeholder Text',
          type: 'string'
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
    pageTitle: 'Resources',
    pageSubtitle: 'Insights, guides, and success stories to help you grow your business with WhatsApp automation',
    featuredPosts: [
      {
        title: '5 WhatsApp Hacks to 2x Your Sales',
        excerpt: 'Discover proven strategies that successful businesses use to double their sales through WhatsApp automation.',
        category: 'tips',
        readTime: '5 min read',
        author: {
          name: 'Sahyogi Team',
          role: 'Growth Experts'
        },
        tags: ['WhatsApp', 'Sales', 'Growth', 'Tips'],
        isFeatured: true
      },
      {
        title: 'AI for SMEs: A Practical Guide',
        excerpt: 'Learn how small and medium enterprises can leverage AI to streamline operations and boost productivity.',
        category: 'guide',
        readTime: '8 min read',
        author: {
          name: 'Sahyogi Team',
          role: 'AI Specialists'
        },
        tags: ['AI', 'SME', 'Automation', 'Guide'],
        isFeatured: true
      },
      {
        title: 'How CafeKart Reduced Support Costs by 60%',
        excerpt: 'A detailed case study showing how CafeKart transformed their customer support with WhatsApp automation.',
        category: 'case-study',
        readTime: '6 min read',
        author: {
          name: 'Sahyogi Team',
          role: 'Success Stories'
        },
        tags: ['Case Study', 'Support', 'Cost Reduction', 'Success'],
        isFeatured: true
      }
    ],
    categories: [
      {
        name: 'Guides',
        slug: 'guides',
        description: 'Comprehensive guides to help you master WhatsApp automation',
        icon: '📖',
        color: '#2ec4f1'
      },
      {
        name: 'Case Studies',
        slug: 'case-studies',
        description: 'Real success stories from our customers',
        icon: '📊',
        color: '#22c55e'
      },
      {
        name: 'Tips & Tricks',
        slug: 'tips',
        description: 'Quick tips to optimize your WhatsApp strategy',
        icon: '💡',
        color: '#f59e0b'
      }
    ],
    newsletter: {
      headline: 'Stay Updated with Latest Insights',
      description: 'Get weekly tips, case studies, and updates delivered to your inbox',
      buttonText: 'Subscribe Now',
      placeholderText: 'Enter your email address'
    }
  }
})
