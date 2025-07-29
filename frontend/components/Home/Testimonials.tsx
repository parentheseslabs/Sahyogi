'use client';

import React, { useEffect, useState } from 'react';
import { TESTIMONIALS_QUERY, PARTNERS_QUERY } from '../../lib/queries';
import { client } from '../../lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { standardSectionTitleStyle, standardBodyTextStyle } from '../../styles/standardStyles';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).width(80).height(80).fit('max').url();
}

const sectionStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'clamp(2rem, 5vw, 5rem) clamp(1rem, 2vw, 2rem)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#fffef9',
  borderRadius: '32px',
  marginBottom: 'clamp(2rem, 5vw, 5rem)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(226, 232, 240, 0.4)',
  position: 'relative',
  overflow: 'hidden',
};

const titleStyle: React.CSSProperties = {
  ...standardSectionTitleStyle,
};

const subtitleStyle: React.CSSProperties = {
  ...standardBodyTextStyle,
  textAlign: 'center',
  marginBottom: 'clamp(2rem, 4vw, 4rem)',
  opacity: 0.8,
  maxWidth: '600px',
};

const quoteBox: React.CSSProperties = {
  background: '#fffef9',
  borderRadius: '24px',
  boxShadow: '0 15px 50px 0 rgba(26, 53, 94, 0.1)',
  padding: 'clamp(1.5rem, 3vw, 3rem)',
  minHeight: 'clamp(180px, 30vw, 220px)',
  maxWidth: 'clamp(320px, 85vw, 450px)',
  minWidth: 'clamp(300px, 80vw, 400px)',
  width: 'clamp(300px, 80vw, 450px)',
  textAlign: 'left',
  marginBottom: 'clamp(1rem, 2vw, 2rem)',
  position: 'relative',
  color: '#1a355e',
  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
  fontWeight: 500,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 'clamp(1rem, 2vw, 1.5rem)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(226, 232, 240, 0.4)',
  lineHeight: 1.7,
  cursor: 'pointer',
  flexShrink: 0,
};

const quoteBoxHover: React.CSSProperties = {
  transform: 'translateY(-5px)',
  boxShadow: '0 25px 60px 0 rgba(26, 53, 94, 0.15)',
  borderColor: 'rgba(46, 196, 241, 0.3)',
  borderWidth: '1px',
  borderStyle: 'solid',
};

const quoteText: React.CSSProperties = {
  fontSize: '1.1rem',
  lineHeight: 1.7,
  color: '#2d3748',
  fontStyle: 'italic',
  position: 'relative',
  paddingLeft: '2rem',
};

const quoteIcon: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: '-10px',
  fontSize: '2rem',
  color: '#2ec4f1',
  opacity: 0.7,
};

const authorSection: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '1.5rem',
};

const authorImage: React.CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  objectFit: 'cover',
  borderWidth: '3px',
  borderStyle: 'solid',
  borderColor: 'rgba(46, 196, 241, 0.2)',
  transition: 'all 0.3s ease',
};

const authorInfo: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
};

const quoteAuthor: React.CSSProperties = {
  fontWeight: 800,
  color: '#1a355e',
  fontSize: '1.1rem',
  letterSpacing: '-0.01em',
};

const quoteRole: React.CSSProperties = {
  fontWeight: 500,
  color: '#4a5568',
  fontSize: '0.95rem',
  opacity: 0.8,
};

const partnersRow: React.CSSProperties = {
  display: 'flex',
  gap: '1.2rem', // Reduced gap
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '4rem',
  padding: '2rem 0',
};

const partnerLogo: React.CSSProperties = {
  width: '180px', // Increased from 120px
  height: '90px', // Increased from 60px
  objectFit: 'contain',
  filter: 'none', // Remove grayscale
  opacity: 1, // Always fully visible
  transition: 'none', // Remove transition
  cursor: 'pointer',
  padding: '0.5rem',
};

const placeholderImg = 'https://via.placeholder.com/80x80?text=No+Image';

const testimonialsRow: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: 'clamp(1rem, 3vw, 2.5rem)',
  width: '100%',
  maxWidth: '1100px',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  alignItems: 'stretch',
  padding: 'clamp(0.5rem, 1vw, 1rem) clamp(0.5rem, 2vw, 1rem)',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  WebkitOverflowScrolling: 'touch',
};

const scrollBtnStyle: React.CSSProperties = {
  background: '#1a365e',
  borderWidth: '0px',
  borderStyle: 'none',
  borderColor: 'transparent',
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  fontSize: '1.5rem',
  color: '#fefcfcff',
  cursor: 'pointer',
  margin: '0 1rem',
  boxShadow: '#1a365e',
  transition: 'all 0.3s ease',
  alignSelf: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
};

const scrollBtnHover: React.CSSProperties = {
  transform: 'scale(1.1)',
  boxShadow: '#1a365e',
  color: 'white',
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    client.fetch(TESTIMONIALS_QUERY).then(setTestimonials);
    client.fetch(PARTNERS_QUERY).then(setPartners);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length < 2) return;
    const timeout = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
        setFade(true);
      }, 400);
    }, 6000); // Increased to 6 seconds for better readability
    return () => clearTimeout(timeout);
  }, [testimonials, current]);

  const t = testimonials[current];
  
  const testimonialsRowRef = React.useRef<HTMLDivElement>(null);
  // Custom smooth scroll function
  function smoothScroll(element: HTMLElement, to: number, duration: number) {
    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    function animateScroll(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollLeft = start + change * easeInOutQuad(progress);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }
    function easeInOutQuad(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    requestAnimationFrame(animateScroll);
  }

  const scroll = (dir: 'left' | 'right') => {
    if (!testimonialsRowRef.current) return;
    const scrollAmount = 450; // Increased scroll amount
    const element = testimonialsRowRef.current;
    const to = dir === 'left'
      ? element.scrollLeft - scrollAmount
      : element.scrollLeft + scrollAmount;
    smoothScroll(element, to, 500); // 500ms duration
  };

  const getQuoteBoxStyle = (cardId: string) => ({
    ...quoteBox,
    ...(hoveredCard === cardId ? quoteBoxHover : {}),
  });

  const getScrollBtnStyle = (btnId: string) => ({
    ...scrollBtnStyle,
    ...(hoveredButton === btnId ? scrollBtnHover : {}),
  });

  return (
    <section style={sectionStyle}>
      <div style={titleStyle}>Testimonials & Social Proof</div>
      <div style={subtitleStyle}>
        Hear from our satisfied clients who have transformed their businesses with our solutions
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
        <button 
          style={getScrollBtnStyle('left')} 
          onClick={() => scroll('left')} 
          onMouseEnter={() => setHoveredButton('left')}
          onMouseLeave={() => setHoveredButton(null)}
          aria-label="Scroll left"
        >
          ←
        </button>
        <div style={testimonialsRow} ref={testimonialsRowRef}>
          {testimonials.map((t, idx) => (
            <div 
              key={t._id} 
              style={getQuoteBoxStyle(t._id)}
              onMouseEnter={() => setHoveredCard(t._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={quoteText}>
                <div style={quoteIcon}>"</div>
                {t.quote}
              </div>
              <div style={authorSection}>
                <img
                  src={t.photo?.asset?.url || placeholderImg}
                  alt={t.name}
                  style={authorImage}
                />
                <div style={authorInfo}>
                  <div style={quoteAuthor}>{t.name}</div>
                  {t.role && <div style={quoteRole}>{t.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          style={getScrollBtnStyle('right')} 
          onClick={() => scroll('right')} 
          onMouseEnter={() => setHoveredButton('right')}
          onMouseLeave={() => setHoveredButton(null)}
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
      <div style={partnersRow}>
        {partners.map((p, idx) => (
          <img
            key={p._id}
            src={p.logo?.asset?.url || placeholderImg}
            alt={p.name}
            style={partnerLogo}
          />
        ))}
      </div>
    </section>
  );
}
