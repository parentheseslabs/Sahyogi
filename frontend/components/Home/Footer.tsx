'use client';

import React from 'react';

const footerOuter: React.CSSProperties = {
  width: '100%',
  background: '#fffef9',
  color: '#1a355e',
  padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(1rem, 2vw, 1.5rem) 0',
  marginTop: 'clamp(2rem, 4vw, 4rem)',
  borderTop: '1px solid rgba(226, 232, 240, 0.6)',
};

const footerInner: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 'clamp(1.5rem, 3vw, 2rem)',
  padding: '0 clamp(1rem, 3vw, 2rem)',
  flexWrap: 'wrap',
  textAlign: 'center',
};

const leftCol: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const logoStyle: React.CSSProperties = {
  height: 'clamp(32px, 5vw, 40px)',
  width: 'auto',
  objectFit: 'contain',
};

const descStyle: React.CSSProperties = {
  color: '#4a5568',
  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
  fontWeight: 400,
  maxWidth: '400px',
  lineHeight: 1.5,
  textAlign: 'center',
};

const centerCol: React.CSSProperties = {
  display: 'flex',
  gap: 'clamp(1rem, 3vw, 2rem)',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const linkStyle: React.CSSProperties = {
  color: '#4a5568',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  transition: 'color 0.2s ease',
  padding: '0.5rem 0',
};

const rightCol: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'clamp(1rem, 2vw, 1.5rem)',
};

const socialCircle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #2ec4f1 0%, #6ee7f7 100%)',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 8px 0 rgba(46, 196, 241, 0.2)',
};

const socialIcon: React.CSSProperties = {
  width: '18px',
  height: '18px',
  fill: '#ffffff',
};

const bottomBar: React.CSSProperties = {
  borderTop: '1px solid rgba(226, 232, 240, 0.6)',
  marginTop: 'clamp(1rem, 2vw, 2rem)',
  padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem) 0 clamp(1rem, 3vw, 2rem)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
  color: '#718096',
  gap: '1rem',
  textAlign: 'center',
};

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/#contact' },
];

const socials = [
  { name: 'Facebook', href: '#', icon: (
    <svg style={socialIcon} viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.733-.592-1.325-1.325-1.325z"/></svg>
  ) },
  { name: 'LinkedIn', href: '#', icon: (
    <svg style={socialIcon} viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
  ) },
  { name: 'Instagram', href: '#', icon: (
    <svg style={socialIcon} viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
  ) },
];

export default function Footer() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [socialHovered, setSocialHovered] = React.useState<number | null>(null);
  
  return (
    <footer style={footerOuter}>
      <div style={footerInner}>
        {/* Left: Logo and description */}
        <div style={leftCol}>
          <img src="/Logo.png" alt="Sahyogi Logo" style={logoStyle} />
          <div style={descStyle}>
            Empowering SMEs with AI-driven WhatsApp automation
          </div>
        </div>
        
        {/* Center: Quick Links */}
        <div style={centerCol}>
          {quickLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                ...linkStyle,
                color: hovered === idx ? '#1a355e' : '#4a5568',
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {link.name}
            </a>
          ))}
        </div>
        
        {/* Right: Social Icons */}
        <div style={rightCol}>
          {socials.map((social, idx) => (
            <a
              key={social.name}
              href={social.href}
              style={{
                ...socialCircle,
                transform: socialHovered === idx ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: socialHovered === idx 
                  ? '0 4px 12px 0 rgba(46, 196, 241, 0.3)' 
                  : '0 2px 8px 0 rgba(46, 196, 241, 0.2)',
              }}
              onMouseEnter={() => setSocialHovered(idx)}
              onMouseLeave={() => setSocialHovered(null)}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      
      <div style={bottomBar}>
        <span>© 2025 Sahyogi.io. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 1.5rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#" style={{ color: '#718096', textDecoration: 'none', transition: 'color 0.2s ease', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#718096', textDecoration: 'none', transition: 'color 0.2s ease', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
} 