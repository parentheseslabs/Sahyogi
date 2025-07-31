'use client';

import React, { useEffect, useState } from 'react';
import { WHY_SAHYOGI_QUERY } from '../../lib/queries';
import { client } from '../../lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { standardSectionTitleStyle, standardBodyTextStyle } from '../../styles/standardStyles';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).width(80).height(80).fit('max').url();
}

const sectionStyle: React.CSSProperties = {
  width: '100%',
  background: 'linear-gradient(135deg, #1a355e 0%, #0f1e2e 100%)',
  padding: 'clamp(2rem, 3vw, 2.5rem) 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(1.5rem, 2.5vw, 2rem)',
  alignItems: 'center',
};

const headerSectionStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '900px',
};

const cardsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: 'clamp(0.8rem, 1.5vw, 1.2rem)',
  width: '100%',
  justifyItems: 'center',
};

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: 'clamp(1rem, 2vw, 1.5rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '200px',
  width: '100%',
  maxWidth: '220px',
};

const headingStyle: React.CSSProperties = {
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 700,
  color: '#ffffff',
  lineHeight: 1.2,
  marginBottom: '1.5rem',
};

const subHeadingStyle: React.CSSProperties = {
  ...standardBodyTextStyle,
  fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
  color: '#a0a0a0',
  lineHeight: 1.5,
  marginBottom: '1rem',
};

const numberBadgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #1a355e 0%, #0f1e2e 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  fontWeight: 700,
  color: '#ffffff',
  border: '2px solid rgba(255, 255, 255, 0.2)',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
  fontWeight: 700,
  color: '#ffffff',
  lineHeight: 1.3,
  marginTop: '1rem',
};

const cardDescStyle: React.CSSProperties = {
  ...standardBodyTextStyle,
  color: '#a0a0a0',
  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
  lineHeight: 1.6,
};

const iconContainerStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, rgba(26, 53, 94, 0.1) 0%, rgba(15, 30, 46, 0.1) 100%)',
  border: '1px solid rgba(26, 53, 94, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0.5rem',
};

export default function WhySahyogi() {
  const [data, setData] = useState<any>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    client.fetch(WHY_SAHYOGI_QUERY).then(setData);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!data || !data.cards || !data.cards.length) return null;

  // Show all cards (up to 5) in a uniform grid
  const allCards = data.cards.slice(0, 5);

  const getCardStyle = (cardId: string) => ({
    ...cardStyle,
    transform: hoveredCard === cardId ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    borderColor: hoveredCard === cardId ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
    boxShadow: hoveredCard === cardId 
      ? '0 20px 40px rgba(26, 53, 94, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)' 
      : '0 8px 32px rgba(0, 0, 0, 0.3)',
  });

  const getCardsGridStyle = () => ({
    ...cardsGridStyle,
    gridTemplateColumns: isMobile 
      ? 'repeat(2, 1fr)'
      : 'repeat(5, 1fr)',
    maxWidth: isMobile ? '400px' : '1200px',
  });

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        {/* Header Section */}
        <div style={headerSectionStyle}>
          <h2 style={headingStyle}>
            Unlock Exponential Growth<br />Without the Growing Pains
          </h2>
          <p style={subHeadingStyle}>
            From plug-and-play launch to agent handoffs and full funnel automation,<br />
            we support every step of your SME's journey with zero technical headaches and pricing built for scale.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div style={getCardsGridStyle()}>
          {allCards.map((card: any, index: number) => (
            <div 
              key={card._id} 
              style={getCardStyle(card._id)}
              onMouseEnter={() => setHoveredCard(card._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={numberBadgeStyle}>
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <div style={iconContainerStyle}>
                {card.icon && (
                  <img 
                    src={urlFor(card.icon)} 
                    alt={card.title} 
                    style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                  />
                )}
              </div>
              
              <h3 style={cardTitleStyle}>{card.title}</h3>
              <p style={cardDescStyle}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
