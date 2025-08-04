'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HERO_QUERY } from '../../lib/queries';
import { client } from '../../lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { standardHeadingStyle, standardBodyTextStyle } from '../../styles/standardStyles';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source).width(480).url();
}

const heroContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '100vh',
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)',
  boxSizing: 'border-box',
  gap: 'clamp(3rem, 6vw, 6rem)',
  position: 'relative',
  background: 'transparent',
  flexDirection: 'column',
  overflow: 'hidden',
};

const leftCol: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 'clamp(0.8rem, 1.5vw, 1.2rem)',
  textAlign: 'left',
};

const heroTitleStyle: React.CSSProperties = {
  fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
  fontWeight: 700,
  color: '#1a355e',
  lineHeight: 1.15,
  marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)',
  textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  animation: 'fadeIn 1s ease-out',
};

const secondaryHeadingStyle: React.CSSProperties = {
  fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
  fontWeight: 600,
  color: '#2ec4f2',
  display: 'block',
  marginTop: 'clamp(0.5rem, 1vw, 0.8rem)',
};

const taglineStyle: React.CSSProperties = {
  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
  fontWeight: 600,
  color: '#2ec4f2',
  marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  animation: 'fadeIn 0.8s ease-out',
};

const subheadingStyle: React.CSSProperties = {
  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
  color: '#64748b',
  lineHeight: 1.6,
  animation: 'fadeIn 1.2s ease-out',
  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
  maxWidth: '600px',
  fontWeight: 400,
};

const statsRow: React.CSSProperties = {
  display: 'flex',
  gap: 'clamp(1rem, 3vw, 2rem)',
  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
  animation: 'fadeIn 1.4s ease-out',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
};

const statItem: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 'clamp(1.2rem, 3vw, 1.5rem) clamp(1.5rem, 4vw, 2rem)',
  background: 'rgba(26, 53, 94, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(26, 53, 94, 0.1)',
  boxShadow: '0 8px 32px rgba(26, 53, 94, 0.1)',
  minWidth: 'clamp(100px, 18vw, 120px)',
  flex: '1',
  transition: 'all 0.3s ease',
};

const statNumber: React.CSSProperties = {
  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
  fontWeight: 800,
  color: '#1a355e',
  marginBottom: '0.5rem',
  textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const statLabel: React.CSSProperties = {
  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
  color: '#64748b',
  fontWeight: 500,
  textAlign: 'center',
};

const ctaRow: React.CSSProperties = {
  display: 'flex',
  gap: 'clamp(0.8rem, 2vw, 1rem)',
  marginTop: 'clamp(0.5rem, 1vw, 1rem)',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
};

const primaryCtaStyle: React.CSSProperties = {
  padding: 'clamp(1.2rem, 3vw, 1.5rem) clamp(2.5rem, 5vw, 3rem)',
  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
  fontWeight: 700,
  borderRadius: '16px',
  border: '2px solid #1a355e',
  background: '#1a355e',
  color: '#ffffff',
  boxShadow: '0 8px 32px rgba(26, 53, 94, 0.2)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '180px',
  textAlign: 'center',
};

const secondaryCtaStyle: React.CSSProperties = {
  padding: 'clamp(1.2rem, 3vw, 1.5rem) clamp(2.5rem, 5vw, 3rem)',
  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
  fontWeight: 700,
  borderRadius: '16px',
  border: '2px solid #1a355e',
  background: 'transparent',
  color: '#1a355e',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '180px',
  textAlign: 'center',
};

const demoLinkStyle: React.CSSProperties = {
  color: '#2ec4f1',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  transition: 'all 0.2s ease',
  marginLeft: '1rem',
};

const rightCol: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '500px',
  borderRadius: '24px',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  animation: 'fadeIn 1.5s ease-out',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
};

export default function Hero() {
  const [hero, setHero] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // You can customize this - for now it also goes to contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    client.fetch(HERO_QUERY).then(setHero);
    // Add fade-in animation keyframes
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  if (!hero) return null;

  return (
    <section style={{
      width: '100%',
      background: '#fffefa',
      padding: '0',
      margin: '0',
    }}>
      <div style={{
        ...heroContainer,
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <div style={leftCol}>
        {hero.tagline && (
          <div style={taglineStyle}>{hero.tagline}</div>
        )}
        <h1 style={heroTitleStyle}>
          {hero.headingLine1}<br />
          <span style={secondaryHeadingStyle}>{hero.headingLine2}</span>
        </h1>
        <p style={subheadingStyle}>{hero.subheading}</p>
        
        {hero.stats && hero.stats.length > 0 && (
          <div style={statsRow}>
            {hero.stats.map((stat: any, index: number) => (
              <div 
                key={index} 
                style={statItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.borderColor = 'rgba(26, 53, 94, 0.2)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(26, 53, 94, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(26, 53, 94, 0.1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(26, 53, 94, 0.1)';
                }}
              >
                <div style={statNumber}>{stat.number}</div>
                <div style={statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        <div style={ctaRow}>
          <button 
            onClick={handleContactClick}
            style={primaryCtaStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(26, 53, 94, 0.3)';
              e.currentTarget.style.background = '#0f2a4a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(26, 53, 94, 0.2)';
              e.currentTarget.style.background = '#1a355e';
            }}
          >
            {hero.primaryCtaText || 'Get Started'}
          </button>
          <button 
            onClick={handleSecondaryClick}
            style={secondaryCtaStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a355e';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(26, 53, 94, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#1a355e';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {hero.secondaryCtaText || 'Book a Demo'}
          </button>
        </div>
      </div>
        <div style={rightCol}>
          {hero.image && (
            <img src={urlFor(hero.image)} alt="Hero" style={imageStyle} />
          )}
        </div>
      </div>
    </section>
  );
} 