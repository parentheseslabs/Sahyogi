'use client';

import Link from 'next/link';

const servicesData = [
  {
    title: 'Customer Support Automation',
    description: 'Resolve queries faster, without burning out your team. Smart auto-replies, escalation workflows, and real-time insights.',
    slug: 'customer-support-automation',
    icon: '🤖'
  },
  {
    title: 'Business Process Automation',
    description: 'Streamline your workflows and increase efficiency with intelligent automation solutions.',
    slug: 'business-process-automation',
    icon: '⚙️'
  },
  {
    title: 'Lead Generation & Outreach',
    description: 'Generate qualified leads and automate your outreach campaigns for better conversion rates.',
    slug: 'lead-generation-outreach',
    icon: '🎯'
  },
  {
    title: 'Social Media Automation',
    description: 'Automate your social media presence with intelligent scheduling, content creation, and engagement tools.',
    slug: 'social-media-automation',
    icon: '📱'
  }
];

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: '120px', padding: '120px 2rem 4rem 2rem', background: '#fffef9' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            color: '#1a355e', 
            letterSpacing: '-0.025em', 
            marginBottom: '1rem' 
          }}>
            Our Services
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#64748b', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Transform your business with our comprehensive automation solutions designed to boost efficiency and drive growth.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 24px 0 rgba(26, 53, 94, 0.08)',
                border: '1px solid rgba(226, 232, 240, 0.5)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 48px 0 rgba(26, 53, 94, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px 0 rgba(26, 53, 94, 0.08)';
              }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {service.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  color: '#1a355e', 
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  color: '#64748b', 
                  lineHeight: '1.6',
                  flex: '1'
                }}>
                  {service.description}
                </p>
                <div style={{
                  marginTop: '1.5rem',
                  color: '#2ec4f1',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}>
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '3rem 2rem',
          boxShadow: '0 4px 24px 0 rgba(26, 53, 94, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.5)'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: '#1a355e', 
            marginBottom: '1rem' 
          }}>
            Ready to Get Started?
          </h2>
          <p style={{ 
            color: '#64748b', 
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Let&apos;s discuss how our automation solutions can transform your business.
          </p>
          <Link
            href="/#contact"
            style={{
              display: 'inline-block',
              background: '#2ec4f1',
              color: '#ffffff',
              padding: '1rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0ea5e9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2ec4f1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </main>
  );
}
