"use client";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { RESOURCES_PAGE_QUERY } from "../../lib/resourcesQuery";
import ResourceModal from "../Modal/ResourceModal";

const ResourcesSection: React.FC = () => {
  const [resourcesData, setResourcesData] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(RESOURCES_PAGE_QUERY);
        setResourcesData(data || getDefaultData());
      } catch (error) {
        console.log('Using default data');
        setResourcesData(getDefaultData());
      }
    };
    fetchData();
  }, []);

  const openModal = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const getDefaultData = () => ({
    featuredPosts: [
      {
        title: "5 WhatsApp Hacks to 2x Your Sales",
        excerpt: "Discover proven strategies that successful businesses use to double their sales through WhatsApp automation.",
        category: "tips",
        readTime: "5 min read",
        publishDate: "2024-01-15",
        author: {
          name: "Sahyogi Team",
          role: "Growth Experts"
        },
        tags: ["WhatsApp", "Sales", "Growth", "Tips"],
        isFeatured: true,
        link: "/blog/whatsapp-sales-hacks"
      },
      {
        title: "AI for SMEs: A Practical Guide",
        excerpt: "Learn how small and medium enterprises can leverage AI to streamline operations and boost productivity.",
        category: "guide",
        readTime: "8 min read",
        publishDate: "2024-01-10",
        author: {
          name: "Sahyogi Team",
          role: "AI Specialists"
        },
        tags: ["AI", "SME", "Automation", "Guide"],
        isFeatured: true,
        link: "/blog/ai-for-smes"
      },
      {
        title: "How CafeKart Reduced Support Costs by 60%",
        excerpt: "A detailed case study showing how CafeKart transformed their customer support with WhatsApp automation.",
        category: "case-study",
        readTime: "6 min read",
        publishDate: "2024-01-05",
        author: {
          name: "Sahyogi Team",
          role: "Success Stories"
        },
        tags: ["Case Study", "Support", "Cost Reduction", "Success"],
        isFeatured: true,
        link: "/blog/cafekart-case-study"
      }
    ]
  });

  const getCategoryName = (slug: string) => {
    const categoryMap: { [key: string]: string } = {
      'tips': 'Tips & Tricks',
      'guide': 'Guides',
      'case-study': 'Case Studies',
      'news': 'Industry News',
      'tutorial': 'Tutorials'
    };
    return categoryMap[slug] || slug;
  };

  const getCategoryColor = (slug: string) => {
    const colorMap: { [key: string]: string } = {
      'tips': '#f59e0b',
      'guide': '#2ec4f1',
      'case-study': '#22c55e',
      'news': '#8b5cf6',
      'tutorial': '#ef4444'
    };
    return colorMap[slug] || '#64748b';
  };

  if (!resourcesData) return <div>Loading...</div>;

  // Get only the first 3 featured posts
  const topPosts = resourcesData.featuredPosts?.slice(0, 3) || [];

  return (
    <section style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            color: '#1a355e',
            marginBottom: '1.5rem'
          }}>
            Latest Resources
          </h2>
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Insights, guides, and success stories to help you grow your business
          </p>
        </div>

        {/* Top 3 Posts Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {topPosts.map((post: any, index: number) => (
            <article key={index} style={{
              background: '#ffffff',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.08)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 48px 0 rgba(26, 53, 94, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(26, 53, 94, 0.08)';
            }}
            onClick={() => openModal(post)}
            >
              {/* Featured Image Placeholder */}
              <div style={{
                height: '200px',
                backgroundColor: post.featuredImage?.asset?.url ? 'transparent' : '#142640',
                backgroundImage: post.featuredImage?.asset?.url ? `url(${post.featuredImage.asset.url})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: getCategoryColor(post.category),
                  color: '#ffffff',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}>
                  {getCategoryName(post.category)}
                </div>
                
                {/* Placeholder icon if no image */}
                {!post.featuredImage?.asset?.url && (
                  <div style={{
                    fontSize: '3rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    📖
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#1a355e',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  {post.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  fontSize: '1rem'
                }}>
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#2ec4f1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {post.author?.name?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a355e' }}>
                        {post.author?.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {post.tags?.slice(0, 2).map((tag: string, tagIndex: number) => (
                    <span key={tagIndex} style={{
                      background: '#f1f5f9',
                      color: '#1a355e',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Resources Button */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => window.location.href = '/resources'}
            style={{
            background: '#1a365e',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            padding: '1.2rem 3rem',
            fontSize: '1.2rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px 0 rgba(26, 54, 94, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px 0 rgba(26, 54, 94, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(26, 54, 94, 0.3)';
          }}
          >
            View All Resources
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <ResourceModal isOpen={isModalOpen} post={selectedPost} onClose={closeModal} />
      )}
    </section>
  );
};

export default ResourcesSection;
