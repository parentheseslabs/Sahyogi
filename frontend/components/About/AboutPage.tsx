"use client"
import React, { useEffect, useState } from 'react';
import { client } from '../../lib/sanity';

const aboutPageQuery = `*[_type == "aboutPage"][0]{
  mission,
  vision,
  whoWeAre,
  whoWeAreBlock,
  ourGoal,
  stats,
  metaPartner{logo, title, description}
}`;

const sectionStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '4rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'none',
  borderRadius: '24px',
  marginBottom: '4rem',
};

const aboutHeadingStyle: React.CSSProperties = {
  fontSize: '3rem',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: '1rem',
  color: '#1a355e', // Solid blue
  letterSpacing: '-0.02em',
  background: 'none',
};

const aboutSubheadingStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  color: '#4a5568',
  textAlign: 'center',
  marginBottom: '4rem',
  opacity: 0.8,
  lineHeight: 1.6,
  maxWidth: '700px',
};

const cardsRowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '2.5rem',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'stretch',
  marginBottom: '4rem',
  flexWrap: 'wrap',
};

const cardStyle: React.CSSProperties = {
  background: '#fffef9', // Solid background
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.08)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(226, 232, 240, 0.6)',
  padding: '2.5rem 2rem',
  minWidth: '320px',
  maxWidth: '420px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'left',
  position: 'relative',
  overflow: 'hidden',
};

const cardIconStyle: React.CSSProperties = {
  fontSize: '2.2rem',
  marginBottom: '1rem',
  color: '#20c55a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cardTitleStyle: React.CSSProperties = {
  fontWeight: 800,
  fontSize: '1.5rem',
  color: '#1a355e',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const cardDescStyle: React.CSSProperties = {
  color: '#4a5568',
  fontSize: '1.08rem',
  lineHeight: 1.7,
  fontWeight: 500,
};

const whoWeAreHeading: React.CSSProperties = {
  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
  fontWeight: 900,
  color: '#ffffff',
  letterSpacing: '-0.02em',
  marginBottom: '2rem',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const whoWeAreIcon: React.CSSProperties = {
  fontSize: '3rem',
  color: '#6ee7f7',
  marginRight: '0.5rem',
};

const whoWeAreHighlight: React.CSSProperties = {
  color: '#6ee7f7',
  background: 'none',
  textShadow: '0 0 20px rgba(110, 231, 247, 0.3)',
};

const whoWeAreBlockStyle: React.CSSProperties = {
  color: '#e2e8f0',
  fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
  lineHeight: 1.8,
  fontWeight: 400,
  marginBottom: '0',
  textAlign: 'left',
  whiteSpace: 'pre-line',
};

const ourGoalHeading: React.CSSProperties = {
  fontSize: 'clamp(2.2rem, 4vw, 3rem)',
  fontWeight: 800,
  color: '#1a355e',
  letterSpacing: '-0.02em',
  marginBottom: '2rem',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const ourGoalIcon: React.CSSProperties = {
  fontSize: '2.5rem',
  color: '#6ee7f7',
  marginRight: '0.5rem',
};

const ourGoalBlockStyle: React.CSSProperties = {
  color: '#475569',
  fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
  lineHeight: 1.8,
  fontWeight: 400,
  marginBottom: '0',
  textAlign: 'left',
  whiteSpace: 'pre-line',
};

const whoWeAreCardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1a355e 0%, #0f1e2e 100%)',
  borderRadius: '24px',
  boxShadow: '0 20px 60px 0 rgba(26, 53, 94, 0.25)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '3rem 2.5rem',
  margin: '0 auto',
  maxWidth: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  position: 'relative',
  overflow: 'hidden',
};

const whoWeAreCardBefore: React.CSSProperties = {
  content: '""',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  height: '4px',
  background: 'linear-gradient(90deg, #6ee7f7 0%, #3B82F6 50%, #6ee7f7 100%)',
  borderTopLeftRadius: '24px',
  borderTopRightRadius: '24px',
};

const ourGoalCardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #f8fafc 0%, #fffef9 50%, #f1f5f9 100%)',
  borderRadius: '24px',
  boxShadow: '0 20px 60px 0 rgba(26, 53, 94, 0.15)',
  border: '2px solid #6ee7f7',
  padding: '3rem 2.5rem',
  margin: '2rem auto 0 auto',
  maxWidth: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  position: 'relative',
  overflow: 'hidden',
};

export default function AboutPage() {
  const [about, setAbout] = useState<any>(null);

  useEffect(() => {
    client.fetch(aboutPageQuery).then(setAbout);
  }, []);

  if (!about) return null;

  return (
    <section style={sectionStyle}>
      {/* About Sahyogi Heading and Subheading */}
      <div style={aboutHeadingStyle}>
        About <span style={{ color: '#6ee7f7', background: 'none' }}>Sahyogi</span>
      </div>
      <div style={aboutSubheadingStyle}>
        Empowering small and medium businesses with intelligent AI automation solutions that drive growth, efficiency, and success.
      </div>
      {/* Mission & Vision Cards */}
      <div style={cardsRowStyle}>
        <div style={cardStyle}>
          <div style={cardIconStyle}>🎯</div>
          <div style={cardTitleStyle}>Our Mission</div>
          <div style={cardDescStyle}>{about.mission}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardIconStyle}>👁️</div>
          <div style={cardTitleStyle}>Our Vision</div>
          <div style={cardDescStyle}>{about.vision}</div>
        </div>
      </div>
      {/* Who We Are Card - Enhanced */}
      <div style={whoWeAreCardStyle}>
        <div style={whoWeAreCardBefore}></div>
        <div style={whoWeAreHeading}>
          <span style={whoWeAreIcon}>👥</span>
          Who <span style={whoWeAreHighlight}>We Are</span>
        </div>
        <div style={whoWeAreBlockStyle}>{about.whoWeAreBlock}</div>
      </div>
      
      {/* Our Goal Card - Enhanced */}
      <div style={ourGoalCardStyle}>
        <div style={ourGoalHeading}>
          <span style={ourGoalIcon}>🚀</span>
          Our Goal
        </div>
        <div style={ourGoalBlockStyle}>{about.ourGoal}</div>
      </div>
    </section>
  );
}
