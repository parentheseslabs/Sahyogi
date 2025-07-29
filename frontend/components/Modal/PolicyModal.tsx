"use client";

import { useState, useEffect } from 'react';
import { client } from '../../lib/sanity';
import { PRIVACY_POLICY_QUERY, TERMS_OF_SERVICE_QUERY } from '../../lib/legalQueries';

interface PolicySection {
  title: string;
  content: any;
}

interface PolicyData {
  _id: string;
  title: string;
  lastUpdated: string;
  content: any;
  sections: PolicySection[];
}

interface PolicyModalProps {
  type: 'privacy' | 'terms';
  isOpen: boolean;
  onClose: () => void;
}

export default function PolicyModal({ type, isOpen, onClose }: PolicyModalProps) {
  const [policyData, setPolicyData] = useState<PolicyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchPolicy = async () => {
      try {
        const query = type === 'privacy' ? PRIVACY_POLICY_QUERY : TERMS_OF_SERVICE_QUERY;
        const data = await client.fetch(query);
        setPolicyData(data);
      } catch (error) {
        console.error(`Error fetching ${type} policy:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [type, isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        fontFamily: 'Inter, sans-serif'
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '20px',
          maxWidth: '95vw',
          maxHeight: '95vh',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(26, 53, 94, 0.3)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          scrollBehavior: 'smooth'
        }}
      >
        {/* Header with close button */}
        <div style={{
          padding: '30px 40px 20px',
          borderBottom: '2px solid #f0f2f8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(46, 196, 241, 0.05) 0%, rgba(26, 53, 94, 0.05) 100%)',
          flexShrink: 0
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #1a355e 0%, #2ec4f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            {loading ? (type === 'privacy' ? 'Privacy Policy' : 'Terms of Service') : policyData?.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
              padding: '8px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(26, 53, 94, 0.1)';
              e.currentTarget.style.color = '#1a355e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#666';
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: '0 40px 40px',
          overflowY: 'auto',
          flex: 1,
          minHeight: 0,
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}>
          {loading ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              color: '#666'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1a355e 0%, #2c5aa0 100%)',
                padding: '16px 32px',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '600'
              }}>
                Loading...
              </div>
            </div>
          ) : !policyData ? (
            <div style={{
              textAlign: 'center' as const,
              padding: '60px 20px',
              color: '#666'
            }}>
              <p>Content not available. Please try again later.</p>
            </div>
          ) : (
            <>
              {/* Last Updated */}
              {policyData.lastUpdated && (
                <div style={{
                  textAlign: 'center' as const,
                  padding: '20px 0',
                  color: '#666',
                  fontSize: '14px',
                  borderBottom: '1px solid #f0f2f8',
                  marginBottom: '30px'
                }}>
                  Last Updated: {new Date(policyData.lastUpdated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}

              {/* Main Content */}
              {policyData.content && (
                <div style={{
                  marginBottom: '30px',
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#000000'
                }}>
                  {renderPortableText(policyData.content)}
                </div>
              )}

              {/* Sections */}
              {policyData.sections && policyData.sections.length > 0 && (
                <div>
                  {policyData.sections.map((section, index) => (
                    <div key={index} style={{
                      marginBottom: '30px',
                      padding: '25px',
                      background: 'linear-gradient(135deg, rgba(46, 196, 241, 0.03) 0%, rgba(26, 53, 94, 0.03) 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(46, 196, 241, 0.1)'
                    }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#1a355e',
                        marginBottom: '15px',
                        paddingBottom: '8px',
                        borderBottom: '2px solid #2ec4f1'
                      }}>
                        {section.title}
                      </h3>
                      <div style={{
                        fontSize: '15px',
                        lineHeight: '1.7',
                        color: '#000000'
                      }}>
                        {renderPortableText(section.content)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
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
          <div key={index} style={{ marginBottom: '12px' }}>
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
        return <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1a355e', marginBottom: '14px' }}>{text}</h1>;
      case 'h2':
        return <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#1a355e', marginBottom: '12px' }}>{text}</h2>;
      case 'h3':
        return <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a355e', marginBottom: '10px' }}>{text}</h3>;
      default:
        return <p style={{ marginBottom: '10px', color: '#000000' }}>{text}</p>;
    }
  }
  
  if (typeof block === 'string') {
    return block;
  }
  
  return '';
}
