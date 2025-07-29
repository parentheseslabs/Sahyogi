'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { standardSectionTitleStyle } from '../../styles/standardStyles';

const ctaSection: React.CSSProperties = {
  width: '100vw',
  marginLeft: 'calc(50% - 50vw)', // full bleed
  background: '#1a365e', // Solid green
  padding: '4rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  marginTop: '4rem',
  position: 'relative',
  overflow: 'hidden',
};

const headingStyle: React.CSSProperties = {
  ...standardSectionTitleStyle,
  color: '#ffffff',
  marginBottom: '2rem',
};

const ctaBtn: React.CSSProperties = {
  background: 'linear-gradient(135deg, #25D366 0%, #20c55a 100%)',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '1.2rem',
  border: 'none',
  borderRadius: '12px',
  padding: '1.3rem 3rem',
  cursor: 'pointer',
  boxShadow: '0 8px 32px 0 rgba(37, 211, 102, 0.4)',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: '1.5rem',
};

const ctaSubtextStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  color: 'rgba(255, 255, 255, 0.85)',
  marginTop: '0',
  textAlign: 'center',
  lineHeight: 1.5,
  maxWidth: '550px',
  fontWeight: 400,
};

export default function CallToAction() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    // First navigate to home page, then scroll to contact
    if (window.location.pathname === '/') {
      // Already on home page, just scroll to contact
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to home page with contact hash
      window.location.href = '/#contact';
    }
  };

  return (
    <section style={ctaSection}>
      <div style={headingStyle}>Ready to Supercharge Your SME with AI?</div>
      <button 
        style={ctaBtn}
        className="btn-shimmer"
        onClick={handleGetStartedClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
          e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(37, 211, 102, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(37, 211, 102, 0.4)';
        }}
      >
        Get Started Today
      </button>
      <div style={ctaSubtextStyle}>
        Join thousands of businesses already transforming their customer experience with AI-powered automation
      </div>
    </section>
  );
} 