"use client";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // Check if reCAPTCHA is completed (only if configured)
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Please complete the reCAPTCHA verification.'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
        });
        // Reset form and reCAPTCHA
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setRecaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .contact-section {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    <section style={{
      padding: 'clamp(2rem, 4vw, 4rem) 0',
      position: 'relative',
      background: '#e6ebf2',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        backgroundImage: `radial-gradient(circle at 25% 25%, #2ec4f1 0%, transparent 50%), 
                         radial-gradient(circle at 75% 75%, #25D366 0%, transparent 50%)`,
        backgroundSize: '400px 400px',
        animation: 'float 20s ease-in-out infinite'
      }} />
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 4vw, 2rem)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 3vw, 3rem)'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            backgroundColor: 'rgba(46, 196, 241, 0.1)',
            borderRadius: '50px',
            border: '1px solid rgba(46, 196, 241, 0.2)',
            marginBottom: '-2rem'
          }}>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#2ec4f1',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Get In Touch
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            background: '#1a355e',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Let&apos;s Start a Conversation
          </h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
            color: '#64748b',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Ready to transform your business with AI? We&apos;re here to help you every step of the way.
          </p>
        </div>
        
        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          {/* Contact Form - Left Side */}
          <div style={{
            backgroundColor: '#ffffff',
            padding: 'clamp(2rem, 4vw, 2.5rem)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Subtle gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #2ec4f1 0%, #25D366 100%)'
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: 'rgba(46, 196, 241, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#2ec4f1" strokeWidth="2" fill="none"/>
                  <polyline points="22,6 12,13 2,6" stroke="#2ec4f1" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                fontWeight: '700',
                color: '#1a355e',
                margin: 0
              }}>
                Send us a Message
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{ position: 'relative' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  letterSpacing: '0.025em'
                }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline: 'none',
                      backgroundColor: '#fafafa',
                      fontWeight: '500',
                      color: '#1a202c'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2ec4f1';
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.boxShadow = '0 0 0 4px rgba(46, 196, 241, 0.1)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  letterSpacing: '0.025em'
                }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline: 'none',
                      backgroundColor: '#fafafa',
                      fontWeight: '500',
                      color: '#1a202c'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2ec4f1';
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.boxShadow = '0 0 0 4px rgba(46, 196, 241, 0.1)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  letterSpacing: '0.025em'
                }}>
                  Mobile Number
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline: 'none',
                      backgroundColor: '#fafafa',
                      fontWeight: '500',
                      color: '#1a202c'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2ec4f1';
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.boxShadow = '0 0 0 4px rgba(46, 196, 241, 0.1)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  letterSpacing: '0.025em'
                }}>
                  Your Message
                </label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project or inquiry..."
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '140px',
                      backgroundColor: '#fafafa',
                      fontWeight: '500',
                      fontFamily: 'inherit',
                      color: '#1a202c'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2ec4f1';
                      e.target.style.backgroundColor = '#ffffff';
                      e.target.style.boxShadow = '0 0 0 4px rgba(46, 196, 241, 0.1)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                </div>
              </div>

              {/* reCAPTCHA */}
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  marginBottom: '1.5rem',
                  marginTop: '1rem'
                }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaChange}
                    theme="light"
                  />
                </div>
              ) : (
                <div style={{
                  backgroundColor: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: '8px',
                  padding: '1rem',
                  margin: '1rem 0',
                  textAlign: 'center',
                  color: '#856404'
                }}>
                  ⚠️ reCAPTCHA is not configured. Please set up your reCAPTCHA keys.
                </div>
              )}

              {/* Status Message */}
              {submitStatus.type && (
                <div style={{
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  border: submitStatus.type === 'success' ? '2px solid #22c55e' : '2px solid #ef4444',
                  backgroundColor: submitStatus.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: submitStatus.type === 'success' ? '#16a34a' : '#dc2626'
                }}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting 
                    ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                    : 'linear-gradient(135deg, #25D366 0%, #20c55a 100%)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  alignSelf: 'stretch',
                  boxShadow: isSubmitting 
                    ? '0 10px 25px -5px rgba(148, 163, 184, 0.3)'
                    : '0 10px 25px -5px rgba(37, 211, 102, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  letterSpacing: '0.025em',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(37, 211, 102, 0.4)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #20c55a 0%, #16a34a 100%)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37, 211, 102, 0.3)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #25D366 0%, #20c55a 100%)';
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg style={{ marginRight: '0.5rem', display: 'inline', animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.127 6.873L16.061 7.939" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.25 12H17.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.127 17.127L16.061 16.061" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 19.25V17.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.873 17.127L7.939 16.061" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.75 12H6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.873 6.873L7.939 7.939" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg style={{ marginLeft: '0.5rem', display: 'inline' }} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information - Right Side */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 'clamp(2rem, 4vw, 2.5rem)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Subtle gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #2ec4f1 0%, #25D366 100%)'
            }} />
            
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(46, 196, 241, 0.1) 0%, rgba(37, 211, 102, 0.1) 100%)',
              borderRadius: '50%',
              filter: 'blur(20px)'
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: 'rgba(37, 211, 102, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#25D366" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="10" r="3" stroke="#25D366" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                fontWeight: '700',
                color: '#1a355e',
                margin: 0
              }}>
                Contact Information
              </h3>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Address */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '16px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.borderColor = 'rgba(46, 196, 241, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(239, 68, 68, 0.1)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#1a355e" strokeWidth="2" fill="none"/>
                      <circle cx="12" cy="10" r="3" stroke="#1a355e" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1a355e',
                      marginBottom: '0.75rem',
                      margin: '0 0 0.75rem 0'
                    }}>
                      Our Office
                    </h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#64748b',
                      lineHeight: '1.6',
                      margin: '0',
                      fontWeight: '500'
                    }}>
                      Holding No. 158/116/C, Ward No. 07<br />
                      Netaji Subhas Sarani, under Halisahar Municipality<br />
                      District North 24 Parganas, West bengal<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '16px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.borderColor = 'rgba(46, 196, 241, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(59, 130, 246, 0.1)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#1a355e" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1a355e',
                      marginBottom: '0.75rem',
                      margin: '0 0 0.75rem 0'
                    }}>
                      Call Us
                    </h4>
                    <a href="tel:+1234567890" style={{
                      fontSize: '1.1rem',
                      color: '#2ec4f1',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseOver={(e) => (e.target as HTMLElement).style.color = '#1a355e'}
                    onMouseOut={(e) => (e.target as HTMLElement).style.color = '#2ec4f1'}>
                      +1 (234) 567-890
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '16px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.borderColor = 'rgba(46, 196, 241, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(14, 165, 233, 0.1)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#2ec4f1" strokeWidth="2" fill="none"/>
                      <polyline points="22,6 12,13 2,6" stroke="#2ec4f1" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1a355e',
                      marginBottom: '0.75rem',
                      margin: '0 0 0.75rem 0'
                    }}>
                      Email Us
                    </h4>
                    <a href="mailto:hello@sahyogi.com" style={{
                      fontSize: '1.1rem',
                      color: '#2ec4f1',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseOver={(e) => (e.target as HTMLElement).style.color = '#1a355e'}
                    onMouseOut={(e) => (e.target as HTMLElement).style.color = '#2ec4f1'}>
                      debraj@sahyogi.io 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '16px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.borderColor = 'rgba(46, 196, 241, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#25D366" strokeWidth="2" fill="none"/>
                      <polyline points="12,6 12,12 16,14" stroke="#25D366" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1a355e',
                      marginBottom: '0.75rem',
                      margin: '0 0 0.75rem 0'
                    }}>
                      Business Hours
                    </h4>
                    <div style={{
                      fontSize: '1rem',
                      color: '#64748b',
                      lineHeight: '1.6',
                      fontWeight: '500'
                    }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: '#1a355e' }}>Monday - Friday:</span> 9:00 AM - 6:00 PM
                      </div>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: '#1a355e' }}>Saturday:</span> 10:00 AM - 4:00 PM
                      </div>
                      <div>
                        <span style={{ fontWeight: '600', color: '#1a355e' }}>Sunday:</span> 
                        <span style={{ color: '#ef4444', fontWeight: '600' }}> Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commented out TidyCal embed 
        <div style={{
          background: '#ffffff',
          overflow: 'hidden',
          position: 'relative',
          height: 'clamp(500px, 80vh, calc(100vh - 200px))',
          minHeight: 'clamp(400px, 60vh, 700px)'
        }}>
          <iframe
            src="https://tidycal.com/katikijenny09/15-minute-meeting?embed=true&theme_editor=false&branding=minimal"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title="Schedule Meeting"
            loading="lazy"
          />
        </div>
        */}
      </div>
    </section>
    </>
  );
};

export default ContactSection;