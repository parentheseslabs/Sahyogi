"use client";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { RESOURCES_PAGE_QUERY } from "../../lib/resourcesQuery";
import ResourceModal from "../Modal/ResourceModal";

const ResourcesPage: React.FC = () => {
  const [resourcesData, setResourcesData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [email, setEmail] = useState<string>('');
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
    pageTitle: "Resources",
    pageSubtitle: "Insights, guides, and success stories to help you grow your business with WhatsApp automation",
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
    ],
    categories: [
      {
        name: "Guides",
        slug: "guides",
        description: "Comprehensive guides to help you master WhatsApp automation",
        icon: "📖",
        color: "#2ec4f1"
      },
      {
        name: "Case Studies",
        slug: "case-studies",
        description: "Real success stories from our customers",
        icon: "📊",
        color: "#22c55e"
      },
      {
        name: "Tips & Tricks",
        slug: "tips",
        description: "Quick tips to optimize your WhatsApp strategy",
        icon: "💡",
        color: "#f59e0b"
      }
    ],
    newsletter: {
      headline: "Stay Updated with Latest Insights",
      description: "Get weekly tips, case studies, and updates delivered to your inbox",
      buttonText: "Subscribe Now",
      placeholderText: "Enter your email address"
    }
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filteredPosts = selectedCategory === 'all' 
    ? resourcesData?.featuredPosts 
    : resourcesData?.featuredPosts?.filter((post: any) => post.category === selectedCategory);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    // Add newsletter signup logic here
  };

  if (!resourcesData) return <div>Loading...</div>;

  return (
    <div style={{ background: '#ffffffff', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ 
        padding: '8rem 2rem 4rem 2rem', 
        textAlign: 'center',
        background: '#142640',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: 900, 
            marginBottom: '2rem',
            letterSpacing: '-0.025em',
            lineHeight: '1.1'
          }}>
            {resourcesData.pageTitle}
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            opacity: 0.9,
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {resourcesData.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ padding: '3rem 2rem 1rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                background: selectedCategory === 'all' ? '#2ec4f1' : 'transparent',
                color: selectedCategory === 'all' ? '#ffffff' : '#1a355e',
                border: '2px solid #2ec4f1',
                borderRadius: '25px',
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              All Posts
            </button>
            {resourcesData.categories?.map((category: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.slug)}
                style={{
                  background: selectedCategory === category.slug ? category.color : 'transparent',
                  color: selectedCategory === category.slug ? '#ffffff' : '#1a355e',
                  border: `2px solid ${category.color}`,
                  borderRadius: '25px',
                  padding: '0.8rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Grid */}
      <section style={{ padding: '2rem 2rem 6rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '3rem' 
          }}>
            {filteredPosts?.map((post: any, index: number) => (
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
                {/* Featured Image */}
                <div style={{
                  height: '200px',
                  backgroundColor: post.featuredImage?.asset?.url ? 'transparent' : '#142640',
                  backgroundImage: post.featuredImage?.asset?.url ? `url(${post.featuredImage.asset.url})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
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
                  {post.isFeatured && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: '#f59e0b',
                      color: '#ffffff',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
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
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      {post.author?.avatar?.asset?.url ? (
                        <img
                          src={post.author.avatar.asset.url}
                          alt={post.author.name}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
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
                      )}
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a355e' }}>
                          {post.author?.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {post.author?.role}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                      {post.readTime}
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {post.tags?.slice(0, 3).map((tag: string, tagIndex: number) => (
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

                  {/* Date */}
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    {formatDate(post.publishDate)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Resources Button */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button style={{
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
      </section>

      {/* Newsletter Signup */}
      {resourcesData.newsletter && (
        <section style={{ 
          padding: '6rem 2rem', 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              color: '#1a355e',
              marginBottom: '1rem'
            }}>
              {resourcesData.newsletter.headline}
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#64748b',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              {resourcesData.newsletter.description}
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{
              display: 'flex',
              gap: '1rem',
              maxWidth: '400px',
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={resourcesData.newsletter.placeholderText}
                required
                style={{
                  flex: 1,
                  minWidth: '250px',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <button type="submit" style={{
                background: '#1a365e',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                {resourcesData.newsletter.buttonText}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <ResourceModal isOpen={isModalOpen} post={selectedPost} onClose={closeModal} />
      )}
    </div>
  );
};

export default ResourcesPage;
