"use client";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { PRODUCT_PAGE_QUERY } from "../../lib/productQuery";
import { standardHeadingStyle, standardSectionTitleStyle, standardBodyTextStyle } from "../../styles/standardStyles";

const ProductPage: React.FC = () => {
  const [productData, setProductData] = useState<any>(null);

  // Helper function to check if URL is a YouTube video
  const isYouTubeUrl = (url: string): boolean => {
    if (!url) return false;
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  // Helper function to extract YouTube video ID
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Helper function to check if URL is a direct video file
  const isVideoFile = (url: string): boolean => {
    if (!url) return false;
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)(\?.*)?$/i;
    return videoExtensions.test(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(PRODUCT_PAGE_QUERY);
        setProductData(data || getDefaultData());
      } catch (error) {
        console.log('Using default data');
        setProductData(getDefaultData());
      }
    };
    fetchData();
  }, []);

  const getDefaultData = () => ({
    headline: "Your All-In-One Business Tool on WhatsApp",
    productIntro: "Sahyogi brings chatbot flows, campaign management, invoicing, and analytics—all into WhatsApp. One login. Zero code.",
    interactiveDemo: {
      type: "video",
      description: "Watch how Sahyogi transforms your WhatsApp into a powerful business platform",
      videoSelection: "url",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Sample YouTube URL
      uploadedVideo: null,
      videoThumbnail: null
    },
    keyModules: [
      {
        title: "Chatbot Builder",
        icon: "🤖",
        description: "Create intelligent conversational flows without coding",
        features: [
          "Visual flow builder",
          "Templates library", 
          "Conditional logic"
        ]
      },
      {
        title: "Campaign Manager",
        icon: "📢",
        description: "Manage and automate your marketing campaigns",
        features: [
          "WhatsApp Blasts",
          "Drip Campaigns",
          "Lead tags"
        ]
      },
      {
        title: "Analytics Dashboard",
        icon: "📊",
        description: "Track performance with real-time insights",
        features: [
          "Live metrics & heatmaps",
          "Funnel tracking",
          "Agent performance reports"
        ]
      }
    ],
    pricingSnapshot: {
      startingPrice: "₹7,500/month",
      ctaText: "View Full Pricing",
      ctaLink: "/pricing"
    },
    ctaButtons: [
      { text: "Start Free Trial", link: "/trial", type: "primary" },
      { text: "Schedule Demo", link: "/contact", type: "secondary" }
    ]
  });

  if (!productData) return <div>Loading...</div>;

  return (
    <div style={{ background: '#ffffffff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: 'clamp(3rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem)', 
        textAlign: 'center',
        background:'#1a365e',
        color: '#ffffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            ...standardHeadingStyle,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            lineHeight: 1.2
          }}>
            {productData.headline}
          </h1>
          <p style={{ 
            ...standardBodyTextStyle,
            color: '#ffffff',
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto clamp(2rem, 3vw, 2.5rem) auto',
            lineHeight: 1.6
          }}>
            {productData.productIntro}
          </p>
          <div style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 1.5rem)', justifyContent: 'center', flexWrap: 'wrap' }}>
            {productData.ctaButtons?.map((button: any, index: number) => (
              <button 
                key={index}
                style={{
                  background: button.type === 'primary' ? '#ffffff' : 'transparent',
                  color: button.type === 'primary' ? '#1a355e' : '#ffffff',
                  border: button.type === 'primary' ? 'none' : '2px solid #ffffff',
                  padding: 'clamp(1rem, 2vw, 1.2rem) clamp(1.5rem, 3vw, 2.5rem)',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: 'clamp(140px, 30vw, 180px)'
                }}
                onMouseEnter={(e) => {
                  if (button.type === 'primary') {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  } else {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#1a355e';
                  }
                }}
                onMouseLeave={(e) => {
                  if (button.type === 'primary') {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(0)';
                  } else {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section style={{ padding: 'clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem)', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '3rem',
            fontWeight: 700,
            color: '#1a355e',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            Interactive Demo
          </h2>
          <p style={{ 
            ...standardBodyTextStyle,
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto clamp(2rem, 3vw, 3rem) auto'
          }}>
            {productData.interactiveDemo?.description}
          </p>
          <div style={{
            background: '#f8fafc',
            borderRadius: 'clamp(12px, 3vw, 20px)',
            padding: 'clamp(1.5rem, 3vw, 3rem)',
            border: '1px solid rgba(226, 232, 240, 0.5)',
            boxShadow: '0 4px 24px 0 rgba(26, 53, 94, 0.08)'
          }}>
            {productData.interactiveDemo?.type === 'video' ? (
              <>
                {/* Video URL (YouTube or direct link) */}
                {productData.interactiveDemo?.videoSelection === 'url' && productData.interactiveDemo?.videoUrl ? (
                  <>
                    {isYouTubeUrl(productData.interactiveDemo.videoUrl) ? (
                      // YouTube video rendering
                      <div style={{
                        position: 'relative',
                        paddingBottom: '56.25%', // 16:9 aspect ratio
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.15)'
                      }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(productData.interactiveDemo.videoUrl)}?rel=0&showinfo=0&modestbranding=1`}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '12px'
                          }}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Product Demo Video"
                        />
                      </div>
                    ) : (
                      // Direct video URL
                      <video
                        controls
                        controlsList="nodownload"
                        style={{
                          width: '100%',
                          maxHeight: '500px',
                          borderRadius: '12px',
                          boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.15)'
                        }}
                      >
                        <source src={productData.interactiveDemo.videoUrl} type="video/mp4" />
                        <source src={productData.interactiveDemo.videoUrl} type="video/webm" />
                        <source src={productData.interactiveDemo.videoUrl} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </>
                ) : productData.interactiveDemo?.videoSelection === 'upload' && productData.interactiveDemo?.uploadedVideo ? (
                  // Uploaded video file rendering
                  <video
                    controls
                    controlsList="nodownload"
                    style={{
                      width: '100%',
                      maxHeight: '500px',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.15)'
                    }}
                    poster={productData.interactiveDemo?.videoThumbnail?.asset?.url || undefined}
                  >
                    <source src={productData.interactiveDemo.uploadedVideo.asset.url} type="video/mp4" />
                    <source src={productData.interactiveDemo.uploadedVideo.asset.url} type="video/webm" />
                    <source src={productData.interactiveDemo.uploadedVideo.asset.url} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  // Video placeholder when no video is selected
                  <div style={{
                    background: '#1a355e',
                    borderRadius: '12px',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    gap: '1rem'
                  }}>
                    <div>🎥 Video Demo</div>
                    <div style={{ fontSize: '1rem', opacity: 0.8 }}>
                      Select a video source in Sanity Studio
                    </div>
                  </div>
                )}
              </>
            ) : productData.interactiveDemo?.type === 'image' ? (
              <>
                {/* Image rendering */}
                {productData.interactiveDemo?.imageSelection === 'upload' && productData.interactiveDemo?.uploadedImage ? (
                  <img
                    src={productData.interactiveDemo.uploadedImage.asset.url}
                    alt="Product Demo"
                    style={{
                      width: '100%',
                      maxHeight: '500px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.15)'
                    }}
                  />
                ) : productData.interactiveDemo?.imageSelection === 'url' && productData.interactiveDemo?.imageUrl ? (
                  <img
                    src={productData.interactiveDemo.imageUrl}
                    alt="Product Demo"
                    style={{
                      width: '100%',
                      maxHeight: '500px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.15)'
                    }}
                  />
                ) : (
                  <div style={{
                    background: '#e2e8f0',
                    borderRadius: '12px',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    fontSize: '1.5rem'
                  }}>
                    🖼️ Select an image in Sanity Studio
                  </div>
                )}
              </>
            ) : productData.interactiveDemo?.type === 'embed' && productData.interactiveDemo?.embedCode ? (
              // Embed code rendering
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.15)'
                }}
                dangerouslySetInnerHTML={{ __html: productData.interactiveDemo.embedCode }}
              />
            ) : (
              // Default placeholder
              <div style={{
                background: '#e2e8f0',
                borderRadius: '12px',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                fontSize: '1.5rem'
              }}>
                📱 Configure demo in Sanity Studio
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Modules Section */}
      <section style={{ padding: 'clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem)', background: '#fffef9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '3rem',
            fontWeight: 700,
            color: '#1a355e',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            Key Features:
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 90vw, 350px), 1fr))', 
            gap: 'clamp(1.5rem, 3vw, 3rem)' 
          }}>
            {productData.keyModules?.map((module: any, index: number) => (
              <div key={index} style={{
                background: '#ffffff',
                borderRadius: 'clamp(16px, 3vw, 24px)',
                padding: 'clamp(1.5rem, 3vw, 3rem)',
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
              >
                <div style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)', textAlign: 'center' }}>
                  {module.icon}
                </div>
                <h3 style={{ 
                  fontSize: 'clamp(1.3rem, 3vw, 2rem)', 
                  fontWeight: 700, 
                  color: '#1a355e',
                  marginBottom: 'clamp(0.5rem, 1vw, 1rem)',
                  textAlign: 'center'
                }}>
                  {module.title}
                </h3>
                <p style={{ 
                  color: '#64748b', 
                  lineHeight: '1.6',
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  marginBottom: 'clamp(1rem, 2vw, 2rem)',
                  textAlign: 'center'
                }}>
                  {module.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1vw, 0.8rem)' }}>
                  {module.features?.map((feature: string, featureIndex: number) => (
                    <div key={featureIndex} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(0.5rem, 1vw, 0.8rem)'
                    }}>
                      <div style={{
                        width: 'clamp(16px, 2vw, 20px)',
                        height: 'clamp(16px, 2vw, 20px)',
                        background: '#10b981',
                        borderRadius: '2px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'clamp(10px, 1.5vw, 12px)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>✓</div>
                      <span style={{ 
                        color: '#1a355e', 
                        fontWeight: 500,
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                      }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Snapshot Section */}
      <section style={{ 
        padding: '5rem 2rem', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            color: '#1a355e',
            marginBottom: '2rem'
          }}>
            Simple, Transparent Pricing
          </h2>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.08)',
            border: '1px solid rgba(226, 232, 240, 0.5)'
          }}>
            <div style={{ 
              fontSize: '3.5rem', 
              fontWeight: 900, 
              color: '#1a365e',
              marginBottom: '1rem'
            }}>
              {productData.pricingSnapshot?.startingPrice}
            </div>
            <p style={{ 
              fontSize: '1.3rem', 
              color: '#64748b',
              marginBottom: '2.5rem'
            }}>
              Plans start from
            </p>
            <button 
              onClick={() => window.location.href = '/pricing'}
              style={{
              background: '#1a365e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '1.2rem 2.5rem',
              fontSize: '1.2rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px 0 rgba(46, 196, 241, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px 0 rgba(46, 196, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(46, 196, 241, 0.3)';
            }}
            >
              {productData.pricingSnapshot?.ctaText}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
