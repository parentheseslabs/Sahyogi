'use client';

import React, { useEffect, useState } from 'react';

const dashboardContainer: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '4rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 800,
  color: '#1a355e',
  textAlign: 'center',
  marginBottom: '1rem',
  background: 'linear-gradient(135deg, #1a355e 0%, #2ec4f1 70%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  color: '#4a5568',
  textAlign: 'center',
  marginBottom: '2rem',
  fontWeight: 500,
};

const dashboardMockupStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '900px',
  background: '#ffffff',
  borderRadius: '24px',
  boxShadow: '0 24px 60px 0 rgba(26, 53, 94, 0.15)',
  padding: '2rem',
  border: '1px solid rgba(226, 232, 240, 0.6)',
};

const dashboardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #e2e8f0',
};

const dashboardTitleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#1a355e',
  margin: 0,
};

const statusIndicatorStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#25D366',
  fontSize: '0.9rem',
  fontWeight: 600,
};

const statusDotStyle: React.CSSProperties = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#25D366',
  animation: 'pulse 2s infinite',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1.5rem',
  marginBottom: '2rem',
};

const statCardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
  borderRadius: '16px',
  padding: '1.5rem',
  border: '1px solid rgba(226, 232, 240, 0.6)',
  textAlign: 'center',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 800,
  color: '#1a355e',
  marginBottom: '0.5rem',
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: '#4a5568',
  fontWeight: 500,
};

const automationListStyle: React.CSSProperties = {
  background: '#f7fafc',
  borderRadius: '16px',
  padding: '1.5rem',
  border: '1px solid rgba(226, 232, 240, 0.6)',
};

const automationItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 0',
  borderBottom: '1px solid #e2e8f0',
};

const automationNameStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
  color: '#1a355e',
};

const automationStatusStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 500,
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  background: '#25D366',
  color: 'white',
};

const metricsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2rem',
  marginTop: '1.5rem',
  justifyContent: 'center',
};

const metricItemStyle: React.CSSProperties = {
  textAlign: 'center',
};

const metricValueStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#2ec4f1',
  marginBottom: '0.25rem',
};

const metricLabelStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: '#4a5568',
  fontWeight: 500,
};

export default function Dashboard() {
  const activeChats = 2847;
  const revenue = 1200000;

  useEffect(() => {
    // Add pulse animation keyframes
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const formatRevenue = (value: number) => {
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <section style={dashboardContainer}>
      <div>
        <h2 style={titleStyle}>Turn Conversations into Conversions</h2>
        <p style={subtitleStyle}>
          Your Business. Entirely on WhatsApp. Build AI-powered chatbots, run campaigns, 
          book orders, generate quotes & invoices—all from a single dashboard.
        </p>
      </div>
      
      <div style={dashboardMockupStyle}>
        <div style={dashboardHeaderStyle}>
          <h3 style={dashboardTitleStyle}>Sahyogi Dashboard</h3>
          <div style={statusIndicatorStyle}>
            <div style={statusDotStyle}></div>
            Live
          </div>
        </div>
        
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{formatNumber(activeChats)}</div>
            <div style={statLabelStyle}>Active Chats</div>
          </div>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{formatRevenue(revenue)}</div>
            <div style={statLabelStyle}>Monthly Revenue</div>
          </div>
        </div>
        
        <div style={automationListStyle}>
          <div style={automationItemStyle}>
            <div style={automationNameStyle}>Welcome Message Flow</div>
            <div style={automationStatusStyle}>Active</div>
          </div>
          <div style={automationItemStyle}>
            <div style={automationNameStyle}>Order Status Updates</div>
            <div style={automationStatusStyle}>Running</div>
          </div>
          <div style={automationItemStyle}>
            <div style={automationNameStyle}>Lead Qualification</div>
            <div style={automationStatusStyle}>Optimizing</div>
          </div>
        </div>
        
        <div style={metricsRowStyle}>
          <div style={metricItemStyle}>
            <div style={metricValueStyle}>0.3s</div>
            <div style={metricLabelStyle}>Response Time</div>
          </div>
          <div style={metricItemStyle}>
            <div style={metricValueStyle}>23.4%</div>
            <div style={metricLabelStyle}>Conversion Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
