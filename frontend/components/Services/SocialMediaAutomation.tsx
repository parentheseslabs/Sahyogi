"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "../../lib/sanity";
import { SOCIAL_MEDIA_AUTOMATION_QUERY } from "../../lib/queries";

const sectionStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '5rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #fffef9 0%, #f8f6f0 50%, #fffef9 100%)',
  borderRadius: '32px',
  marginBottom: '5rem',
  border: '1px solid rgba(226, 232, 240, 0.4)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '3rem',
  fontWeight: 900,
  marginBottom: '3rem',
  color: '#1a355e',
  letterSpacing: '-0.02em',
  textAlign: 'center',
  background: '#1a365e',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  lineHeight: 1.2,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#1a355e',
  textAlign: 'center',
  marginBottom: '4rem',
  lineHeight: 1.4,
  maxWidth: '800px',
};

const featuresGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(260px, 85vw, 280px), 1fr))',
  gap: 'clamp(1rem, 3vw, 1.5rem)',
  width: '100%',
  maxWidth: '1000px',
  marginBottom: '3rem',
};

const featureCardStyle: React.CSSProperties = {
  background: '#fffef9',
  borderRadius: '20px',
  padding: '2rem',
  border: '1px solid rgba(226, 232, 240, 0.4)',
  boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  transition: 'all 0.3s ease',
};

const featureIconStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  color: '#6b46c1',
};

const featureTextStyle: React.CSSProperties = {
  color: '#4a5568',
  fontSize: '1rem',
  fontWeight: 500,
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '2rem',
  width: '100%',
  maxWidth: '800px',
  marginBottom: '4rem',
};

const statCardStyle: React.CSSProperties = {
  background: '#fffef9',
  borderRadius: '20px',
  padding: '2rem',
  textAlign: 'center',
  border: '1px solid rgba(226, 232, 240, 0.4)',
  boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.08)',
};

const statIconStyle: React.CSSProperties = {
  fontSize: '2rem',
  marginBottom: '1rem',
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#4a5568',
  fontWeight: 600,
  marginBottom: '0.5rem',
};

const statValueStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 800,
  color: '#2ec4f1',
};

const improvementCardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)',
  borderRadius: '20px',
  padding: '2rem',
  marginBottom: '3rem',
  border: '1px solid rgba(46, 196, 241, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  maxWidth: '600px',
};

const improvementIconStyle: React.CSSProperties = {
  fontSize: '1.5rem',
};

const improvementTextStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#1a355e',
};

const ctaButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '3rem',
};

const primaryButtonStyle: React.CSSProperties = {
  background: '#1a365e',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  padding: '1rem 2rem',
  fontSize: '1.1rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 24px 0 rgba(46, 196, 241, 0.3)',
};

const secondaryButtonStyle: React.CSSProperties = {
  background: 'transparent',
  color: '#2ec4f1',
  border: '2px solid #2ec4f1',
  borderRadius: '12px',
  padding: '1rem 2rem',
  fontSize: '1.1rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};
const challengeSectionStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
  borderRadius: '20px',
  padding: '2.5rem',
  marginBottom: '2rem',
  border: '1px solid rgba(239, 68, 68, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(239, 68, 68, 0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  maxWidth: '800px',
  width: '100%',
};

const solutionSectionStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
  borderRadius: '20px',
  padding: '2.5rem',
  marginBottom: '3rem',
  border: '1px solid rgba(34, 197, 94, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(34, 197, 94, 0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  maxWidth: '800px',
  width: '100%',
};

const challengeIconStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#ef4444',
};

const solutionIconStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#22c55e',
};

const challengeTextStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#7f1d1d',
  lineHeight: 1.4,
};

const solutionTextStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#14532d',
  lineHeight: 1.4,
};
const SocialMediaAutomation: React.FC = () => {
  const [serviceData, setServiceData] = useState<any>(null);
  const router = useRouter();

  const handleContactClick = () => {
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

  const handlePricingClick = () => {
    router.push('/pricing');
  };

  useEffect(() => {
    // Fetch from Sanity if available, otherwise use default data
    const fetchData = async () => {
      try {
        const data = await client.fetch(SOCIAL_MEDIA_AUTOMATION_QUERY);
        setServiceData(data || getDefaultData());
      } catch (error) {
        console.log('Using default data');
        setServiceData(getDefaultData());
      }
    };
    fetchData();
  }, []);

  const getDefaultData = () => ({
    title: "Social Media Automation",
    subtitle: "Streamline your social media interactions effortlessly.",
    features: [
      { icon: "✅", text: "Smart auto-replies trained on your FAQs" },
      { icon: "✅", text: "Escalation to human agents with context" },
      { icon: "✅", text: "Real-time dashboard insights" },
      { icon: "✅", text: "Customizable workflows" }
    ],
    stats: [
      { icon: "⚡", label: "Response Time", value: "↓ 65%", color: "#22c55e" },
      { icon: "📞", label: "Agent Load", value: "↓ 50%", color: "#3b82f6" },
      { icon: "💬", label: "CSAT", value: "↑ 2.2x", color: "#8b5cf6" }
    ],
    improvement: {
      icon: "💡",
      text: "Response Time ↓ 65%"
    }
  });

  if (!serviceData) return <div>Loading...</div>;

  return (
    <section style={sectionStyle}>
      <div style={titleStyle}>{serviceData.title}</div>
      <div style={subtitleStyle}>{serviceData.subtitle}</div>
      {/* Challenge Section */}
      {serviceData.challenge && (
        <div style={challengeSectionStyle}>
          <span style={challengeIconStyle}>{serviceData.challenge.icon}</span>
          <div>
            <strong style={{ color: '#7f1d1d', fontSize: '1.1rem' }}>Challenge: </strong>
            <span style={challengeTextStyle}>{serviceData.challenge.text}</span>
          </div>
        </div>
      )}

      {/* Solution Section */}
      {serviceData.solution && (
        <div style={solutionSectionStyle}>
          <span style={solutionIconStyle}>{serviceData.solution.icon}</span>
          <div>
            <strong style={{ color: '#14532d', fontSize: '1.1rem' }}>Solution: </strong>
            <span style={solutionTextStyle}>{serviceData.solution.text}</span>
          </div>
        </div>
      )}
      {/* Key Features */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a355e', marginBottom: '2rem' }}>
          Key Features:
        </h3>
        <div style={featuresGridStyle}>
          {serviceData.features?.map((feature: any, idx: number) => (
            <div key={idx} style={featureCardStyle}>
              <span style={featureIconStyle}>{feature.icon}</span>
              <span style={featureTextStyle}>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={statsGridStyle}>
        {serviceData.stats?.map((stat: any, idx: number) => (
          <div key={idx} style={statCardStyle}>
            <div style={statIconStyle}>{stat.icon}</div>
            <div style={statLabelStyle}>{stat.label}</div>
            <div style={{ ...statValueStyle, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Improvement Highlight */}
      {serviceData.improvement && (
        <div style={improvementCardStyle}>
          <span style={improvementIconStyle}>{serviceData.improvement.icon}</span>
          <span style={improvementTextStyle}>{serviceData.improvement.text}</span>
        </div>
      )}

      {/* CTA Buttons */}
      <div style={ctaButtonsStyle}>
        <a 
          href="/#contact"
          style={{
            ...primaryButtonStyle,
            textDecoration: 'none',
            display: 'inline-block'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px 0 rgba(46, 196, 241, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(46, 196, 241, 0.3)';
          }}
        >
          Talk to an Expert
        </a>
        <button 
          style={secondaryButtonStyle}
          onClick={handlePricingClick}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#2ec4f1';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#2ec4f1';
          }}
        >
          View Pricing
        </button>
      </div>
    </section>
  );
};

export default SocialMediaAutomation; 