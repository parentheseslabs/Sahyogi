"use client";

import { useState, useEffect } from 'react';
import { client } from '../../lib/sanity';
import { TERMS_OF_SERVICE_QUERY } from '../../lib/legalQueries';

interface TermsOfServiceSection {
  title: string;
  content: any;
}

interface TermsOfServiceData {
  _id: string;
  title: string;
  lastUpdated: string;
  content: any;
  sections: TermsOfServiceSection[];
}

export default function TermsOfServicePage() {
  const [termsData, setTermsData] = useState<TermsOfServiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const data = await client.fetch(TERMS_OF_SERVICE_QUERY);
        setTermsData(data);
      } catch (error) {
        console.error('Error fetching terms of service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#fffef9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a355e 0%, #2c5aa0 100%)',
          padding: '20px 40px',
          borderRadius: '12px',
          color: 'white',
          fontWeight: '600',
          boxShadow: '0 10px 30px rgba(26, 53, 94, 0.3)'
        }}>
          Loading Terms of Service...
        </div>
      </div>
    );
  }

  if (!termsData) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#fffef9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          textAlign: 'center' as const,
          maxWidth: '500px'
        }}>
          <h2 style={{
            color: '#1a355e',
            fontSize: '24px',
            marginBottom: '16px',
            fontWeight: '700'
          }}>
            Terms of Service Not Available
          </h2>
          <p style={{
            color: '#666',
            fontSize: '16px'
          }}>
            We apologize, but the terms of service are currently not available. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fffef9 0%, #f8f9ff 100%)',
      fontFamily: 'Inter, sans-serif',
      padding: '40px 20px',
      scrollBehavior: 'smooth'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '60px',
        boxShadow: '0 30px 80px rgba(26, 53, 94, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        scrollBehavior: 'smooth'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center' as const,
          marginBottom: '50px',
          paddingBottom: '30px',
          borderBottom: '2px solid #f0f2f8'
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #1a355e 0%, #2ec4f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            {termsData.title}
          </h1>
          {termsData.lastUpdated && (
            <p style={{
              color: '#666',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Last Updated: {new Date(termsData.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>

        {/* Main Content */}
        {termsData.content && (
          <div style={{
            marginBottom: '40px',
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#000000'
          }}>
            {renderPortableText(termsData.content)}
          </div>
        )}

        {/* Sections */}
        {termsData.sections && termsData.sections.length > 0 && (
          <div>
            {termsData.sections.map((section, index) => (
              <div key={index} style={{
                marginBottom: '40px',
                padding: '30px',
                background: 'linear-gradient(135deg, rgba(46, 196, 241, 0.05) 0%, rgba(26, 53, 94, 0.05) 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(46, 196, 241, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1a355e',
                  marginBottom: '20px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #2ec4f1'
                }}>
                  {section.title}
                </h2>
                <div style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#000000'
                }}>
                  {renderPortableText(section.content)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home Button */}
        <div style={{
          textAlign: 'center' as const,
          marginTop: '50px',
          paddingTop: '30px',
          borderTop: '2px solid #f0f2f8'
        }}>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #1a355e 0%, #2c5aa0 100%)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 10px 30px rgba(26, 53, 94, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(26, 53, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 53, 94, 0.3)';
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

// Helper function to render portable text
function renderPortableText(content: any): React.ReactElement | string {
  if (!content) return '';
  
  if (typeof content === 'string') {
    return content;
  }
  
  if (Array.isArray(content)) {
    return (
      <>
        {content.map((block, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            {renderPortableTextBlock(block)}
          </div>
        ))}
      </>
    );
  }
  
  return renderPortableTextBlock(content);
}

function renderPortableTextBlock(block: any): React.ReactElement | string {
  if (!block) return '';
  
  if (block._type === 'block') {
    const text = block.children?.map((child: any) => child.text).join('') || '';
    
    switch (block.style) {
      case 'h1':
        return <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a355e', marginBottom: '16px' }}>{text}</h1>;
      case 'h2':
        return <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#1a355e', marginBottom: '14px' }}>{text}</h2>;
      case 'h3':
        return <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a355e', marginBottom: '12px' }}>{text}</h3>;
      default:
        return <p style={{ marginBottom: '12px', color: '#000000' }}>{text}</p>;
    }
  }
  
  if (typeof block === 'string') {
    return block;
  }
  
  return '';
}
