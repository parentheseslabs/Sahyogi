'use client';

import React, { useEffect, useState } from 'react';
import { PRODUCT_SPOTLIGHT_QUERY } from '../../lib/queries';
import { client } from '../../lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { standardSectionTitleStyle, standardBodyTextStyle } from '../../styles/standardStyles';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).width(400).height(300).fit('crop').url();
}

const sectionStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 'clamp(1.5rem, 3vw, 3rem)',
  background: '#fffef9',
  boxShadow: '0 12px 40px 0 rgba(26, 53, 94, 0.08)',
  borderRadius: '24px',
  border: '1px solid rgba(226, 232, 240, 0.6)',
  marginBottom: '2rem',
};

const leftCol: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 'clamp(0.5rem, 1vw, 0.8rem)',
  paddingRight: '0',
};

const headlineStyle: React.CSSProperties = {
  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
  fontWeight: 700,
  color: '#1a355e',
  letterSpacing: '-0.025em',
  textAlign: 'left',
  marginBottom: 'clamp(0.2rem, 0.5vw, 0.3rem)',
  lineHeight: 1.2,
};

const subheadingStyle: React.CSSProperties = {
  fontSize: 'clamp(1.2rem, 2.8vw, 1.8rem)',
  fontWeight: 600,
  color: '#2ec4f1',
  letterSpacing: '-0.02em',
  textAlign: 'left',
  marginBottom: 'clamp(0.3rem, 0.6vw, 0.5rem)',
  lineHeight: 1.3,
};

const copyStyle: React.CSSProperties = {
  ...standardBodyTextStyle,
  fontWeight: 500,
  margin: 0,
  lineHeight: 1.7,
  maxWidth: '100%',
};

const carouselCol: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'clamp(350px, 70vw, 500px)',
  position: 'relative',
  overflow: 'visible',
  width: '100%',
};

const carouselImgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: '20px',
  objectFit: 'cover',
};

const navBtnStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #fffef9 0%, #f7fafc 100%)',
  border: '1px solid rgba(226, 232, 240, 0.6)',
  borderRadius: '50%',
  width: '44px',
  height: '44px',
  fontSize: '1.3rem',
  color: '#1a355e',
  cursor: 'pointer',
  margin: '0 0.8rem',
  boxShadow: '0 4px 16px 0 rgba(26, 53, 94, 0.08)',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
};

const leftNavStyle: React.CSSProperties = {
  ...navBtnStyle,
  left: '-22px',
};

const rightNavStyle: React.CSSProperties = {
  ...navBtnStyle,
  right: '-22px',
};

const carouselContainer: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  maxWidth: 'clamp(350px, 95vw, 500px)',
  height: 'clamp(280px, 70vw, 400px)',
  overflow: 'hidden',
  borderRadius: '20px',
  boxShadow: '0 20px 48px 0 rgba(26, 53, 94, 0.12)',
};

const slideContainer: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2.2rem',
  fontWeight: 800,
  marginBottom: '2.5rem',
  color: '#3fc2ec',
  letterSpacing: '1px',
  textAlign: 'center',
};

const headingStyle: React.CSSProperties = {
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  fontWeight: 800,
  color: '#1a355e',
  letterSpacing: '-0.025em',
  textAlign: 'center',
  marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
};

export default function ProductSpotlight() {
  const [data, setData] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    client.fetch(PRODUCT_SPOTLIGHT_QUERY).then((data) => {
      console.log('ProductSpotlight data:', data);
      setData(data);
    });
  }, []);

  const images = data?.carouselImages || [];

  // Auto-slide effect
  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, current]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
      setIsAnimating(false);
    }, 300);
  };

  if (!data) return null;

  const getSlideStyle = (index: number): React.CSSProperties => {
    const isActive = index === current;
    
    return {
      ...carouselImgStyle,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: isActive ? 'translateX(0)' : 'translateX(100%)',
      opacity: isActive ? 1 : 0,
      zIndex: isActive ? 2 : 1,
      transition: 'all 0.5s ease-in-out',
    };
  };

  return (
    <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 3rem) clamp(0.5rem, 2vw, 1rem)' }}>
      <div style={{
        ...sectionStyle,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 'clamp(1.5rem, 4vw, 2rem)' : 'clamp(2rem, 5vw, 5rem)',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        <div style={{
          ...leftCol,
          paddingRight: isMobile ? '0' : '0'
        }}>
          <div style={headlineStyle}>Turn Conversations into Conversions.</div>
          <div style={subheadingStyle}>
            Run Your Business.<br />
            Entirely on WhatsApp.
          </div>
          <div style={copyStyle}>
            From customer acquisition to order fulfillment, manage your entire business workflow through WhatsApp with AI-powered automation that scales with your growth.
          </div>
        </div>
        <div style={carouselCol}>
          {images.length > 0 ? (
            <div style={carouselContainer}>
              <div style={slideContainer}>
                {images.map((image: any, index: number) => (
                  <img
                    key={index}
                    src={urlFor(image)}
                    alt={`Product screen ${index + 1}`}
                    style={getSlideStyle(index)}
                  />
                ))}
              </div>
              {images.length > 1 && (
                <>
                  <button 
                    style={leftNavStyle} 
                    onClick={prevSlide} 
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(26, 53, 94, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(26, 53, 94, 0.08)';
                    }}
                    aria-label="Previous image"
                  >
                    &#8592;
                  </button>
                  <button 
                    style={rightNavStyle} 
                    onClick={nextSlide}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(26, 53, 94, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(26, 53, 94, 0.08)';
                    }}
                    aria-label="Next image"
                  >
                    &#8594;
                  </button>
                </>
              )}
            </div>
          ) : (
            <div style={{
              ...carouselContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f7fafc',
              color: '#4a5568',
              fontSize: '1rem'
            }}>
              No images available
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 