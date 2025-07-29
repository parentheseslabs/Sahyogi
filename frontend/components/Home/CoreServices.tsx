'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CORE_SERVICES_QUERY } from '../../lib/queries';
import { client } from '../../lib/sanity';

const sectionStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  padding: 'clamp(4rem, 6vw, 6rem) clamp(1rem, 3vw, 2rem)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
  fontWeight: 800,
  marginBottom: 'clamp(3rem, 5vw, 4rem)',
  color: '#ffffff',
  letterSpacing: '-0.025em',
  textAlign: 'center',
  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 'clamp(2rem, 3vw, 3rem)',
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
};

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: 'clamp(16px, 3vw, 20px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  padding: 'clamp(2rem, 3vw, 2.5rem)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  textAlign: 'left',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'clamp(280px, 30vw, 320px)',
};

const cardHoverStyle: React.CSSProperties = {
  transform: 'translateY(-8px) scale(1.02)',
  boxShadow: '0 20px 60px rgba(26, 53, 94, 0.4)',
  borderColor: 'rgba(255, 255, 255, 0.4)',
};

const cardIconStyle: React.CSSProperties = {
  width: 'clamp(50px, 6vw, 60px)',
  height: 'clamp(50px, 6vw, 60px)',
  borderRadius: 'clamp(12px, 2vw, 16px)',
  background: 'linear-gradient(135deg, rgba(26, 53, 94, 0.2) 0%, rgba(15, 30, 46, 0.2) 100%)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(26, 53, 94, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
  color: '#ffffff',
  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
  fontWeight: 'bold',
};

const cardTitleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
  color: '#ffffff',
  letterSpacing: '-0.025em',
  lineHeight: 1.3,
  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
};

const cardDescStyle: React.CSSProperties = {
  color: '#a0a0a0',
  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
  lineHeight: 1.6,
  marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
};

const cardLinkStyle: React.CSSProperties = {
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  transition: 'all 0.3s ease',
  padding: '0.75rem 1.5rem',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  justifyContent: 'center',
};

const cardOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(26, 53, 94, 0.95)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  padding: '2rem',
  textAlign: 'center',
};

export default function CoreServices() {
  const [data, setData] = useState<any>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    client.fetch(CORE_SERVICES_QUERY).then(setData);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cards = data?.cards || [];

  // Define the mapping for service card titles to their respective routes
  const getServiceRoute = (title: string, link?: string) => {
    // Use the link from CMS if available, otherwise fallback to hardcoded routes
    if (link) {
      return link;
    }
    
    const routes: { [key: string]: string } = {
      'Customer Support Automation': '/services/customer-support-automation',
      'Business Process Automation': '/services/business-process-automation', 
      'Lead Generation & Outreach': '/services/lead-generation-outreach',
      'Social Media Automation': '/services/social-media-automation'
    };
    return routes[title] || '/services';
  };

  const handleCardClick = (title: string, link?: string) => {
    const route = getServiceRoute(title, link);
    router.push(route);
  };

  const getGridStyle = () => ({
    ...gridStyle,
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? 'clamp(1rem, 3vw, 1.5rem)' : 'clamp(1rem, 2vw, 1.5rem)',
  });

  const getCardStyle = (cardId: string) => ({
    ...cardStyle,
    ...(hoveredCard === cardId ? cardHoverStyle : {}),
  });

  const getOverlayStyle = (cardId: string) => ({
    ...cardOverlayStyle,
    opacity: hoveredCard === cardId ? 1 : 0,
  });

  const serviceIcons = ['🔧', '📈', '🎯', '📱']; // Fallback icons

  return (
    <div style={{
      width: '100%',
      background: 'linear-gradient(135deg, #1a355e 0%, #0f1e2e 100%)',
      padding: '0',
      margin: '0',
    }}>
      <section style={sectionStyle}>
        <div style={titleStyle}>Core Services Overview</div>
        <div style={getGridStyle()}>
        {cards.slice(0, 4).map((card: any, idx: number) => (
          <div
            key={card._id}
            style={getCardStyle(card._id)}
            onMouseEnter={() => setHoveredCard(card._id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(card.title, card.link)}
          >
            <div style={cardIconStyle}>
              {serviceIcons[idx] || '⚡'}
            </div>
            <div style={cardTitleStyle}>{card.title}</div>
            <div style={cardDescStyle}>
              {card.description}
            </div>
            <div style={cardLinkStyle}>
              Learn More →
            </div>
            
            <div style={getOverlayStyle(card._id)}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {serviceIcons[idx] || '⚡'}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                {card.overlayText}
              </div>
              
            </div>
          </div>
        ))}
        </div>
      </section>
    </div>
  );
} 