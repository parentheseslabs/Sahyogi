"use client"
import React, { useEffect, useState, useRef } from 'react';
import { client } from '../../lib/sanity';

const servicePageQuery = `*[_type == "servicePage" && title == $title][0]{
  title,
  hero,
  description,
  challenge,
  solution,
  outcomes,
  features,
  ctaButtons,
  status,
  stats
}`;

const sectionStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto',
  padding: '4rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const heroStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 900,
  color: '#1a355e',
  textAlign: 'center',
  marginBottom: '1.5rem',
};
const descStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  color: '#4a5568',
  textAlign: 'center',
  marginBottom: '2.5rem',
  fontWeight: 500,
};
const blockStyle: React.CSSProperties = {
  background: '#fffef9',
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.08)',
  border: '1px solid rgba(226, 232, 240, 0.6)',
  padding: '2rem',
  marginBottom: '2rem',
  width: '100%',
  maxWidth: '700px',
  textAlign: 'left',
};
const blockHeading: React.CSSProperties = {
  fontWeight: 800,
  fontSize: '1.3rem',
  color: '#1a355e',
  marginBottom: '0.7rem',
};
const outcomesRow: React.CSSProperties = {
  display: 'flex',
  gap: '2rem',
  margin: '1.5rem 0',
  flexWrap: 'wrap',
  justifyContent: 'center',
};
const outcomesGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
};
const outcomeCard: React.CSSProperties = {
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.10)',
  padding: '2rem 1.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '140px',
  minHeight: '120px',
};
const outcomeIcon: React.CSSProperties = {
  fontSize: '2.2rem',
  marginBottom: '0.7rem',
  color: '#2ec4f1',
};
const outcomeLabel: React.CSSProperties = {
  color: '#1a355e',
  fontWeight: 700,
  fontSize: '1.1rem',
  marginBottom: '0.2rem',
  textAlign: 'center',
};
const outcomeValue: React.CSSProperties = {
  color: '#20c55a',
  fontWeight: 900,
  fontSize: '1.5rem',
  textAlign: 'center',
};
const featuresList: React.CSSProperties = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
  color: '#1a355e',
  fontWeight: 500,
  fontSize: '1.08rem',
};
const ctaRow: React.CSSProperties = {
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'center',
  marginTop: '2.5rem',
};
const ctaBtn: React.CSSProperties = {
  background: '#2ec4f1',
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.1rem',
  border: 'none',
  borderRadius: '8px',
  padding: '0.9rem 2.2rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
  textDecoration: 'none',
};
const twoColSection: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '3rem',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  flexWrap: 'wrap',
};
const leftCol: React.CSSProperties = {
  flex: 2,
  minWidth: '340px',
};
const rightCol: React.CSSProperties = {
  flex: 1.2,
  minWidth: '340px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between', // ensure space between grid and buttons
  height: '100%', // fill available height
};
const statsCard: React.CSSProperties = {
  background: '#fff',
  borderRadius: '32px',
  boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.10)',
  padding: '2.5rem 2rem',
  minWidth: '320px',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
};
const statusBadge: React.CSSProperties = {
  position: 'absolute',
  top: '1.2rem',
  right: '1.2rem',
  background: '#e0f7fa',
  color: '#20c55a',
  fontWeight: 700,
  fontSize: '1rem',
  borderRadius: '16px',
  padding: '0.2rem 1.1rem',
};
const statValueBig: React.CSSProperties = {
  fontSize: '2.2rem',
  color: '#2ec4f1',
  fontWeight: 900,
  textAlign: 'center',
};
const statLabel: React.CSSProperties = {
  color: '#1a355e',
  fontWeight: 700,
  fontSize: '1.1rem',
  textAlign: 'center',
};
const progressBarBg: React.CSSProperties = {
  width: '100%',
  height: '10px',
  background: '#e6f7fa',
  borderRadius: '8px',
  margin: '0.7rem 0',
  boxShadow: '0 2px 8px 0 rgba(46, 196, 241, 0.08)',
  overflow: 'hidden',
};
const progressBar: React.CSSProperties = {
  height: '100%',
  borderRadius: '8px',
  background: '#2ec4f1', // Solid blue/cyan
  boxShadow: '0 1px 4px 0 rgba(46, 196, 241, 0.12)',
  transition: 'width 1s cubic-bezier(0.4, 0.2, 0.2, 1)',
};

export default function ServicePage({ title }: { title: string }) {
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    client.fetch(servicePageQuery, { title }).then(setService);
  }, [title]);

  // For animated progress bars
  const [barWidths, setBarWidths] = useState<number[]>([]);
  useEffect(() => {
    if (service?.stats) {
      setTimeout(() => {
        setBarWidths(service.stats.map((stat: any) => stat.progress || 0));
      }, 200); // slight delay for animation
    }
  }, [service]);

  if (!service) return null;

  return (
    <section style={{ width: '100%', background: '#fffef9', padding: '4rem 0' }}>
      <div style={twoColSection}>
        {/* Left Column */}
        <div style={leftCol}>
          <div style={heroStyle}>{service.hero}</div>
          <div style={descStyle}>{service.description}</div>
          <div style={blockStyle}>
            <div style={blockHeading}>Key Features:</div>
            <ul style={featuresList}>
              {service.features?.map((f: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <span style={{ color: '#2ec4f1', fontSize: '1.3rem' }}>✔️</span> {f}
                </li>
              ))}
            </ul>
          </div>
          {/* Highlighted Outcome/Benefit */}
          {service.outcomes && service.outcomes[0] && (
            <div style={{ ...blockStyle, background: '#f8fdff', border: '1px solid #b2ebf2', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, fontSize: '1.1rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '1.3rem' }}>💡</span> {service.outcomes[0].label} {service.outcomes[0].value}
            </div>
          )}
        </div>
        {/* Right Column: Outcomes Visualization */}
        <div style={rightCol}>
          <div style={{ width: '100%' }}>
            <div style={outcomesGrid}>
              {service.outcomes?.map((o: any, idx: number) => (
                <div key={idx} style={outcomeCard}>
                  <span style={outcomeIcon}>{o.icon}</span>
                  <span style={outcomeLabel}>{o.label}</span>
                  <span style={outcomeValue}>{o.value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* CTA buttons at the bottom of the right column */}
          {service.ctaButtons && service.ctaButtons.length > 0 && (
            <div style={{ ...ctaRow, width: '100%', marginTop: '5rem', marginBottom: 0, justifyContent: 'center' }}>
              {service.ctaButtons.map((btn: any, idx: number) => (
                <a key={idx} href={btn.link} style={ctaBtn}>{btn.label}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
