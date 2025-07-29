"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "../../lib/sanity";
import { PRICING_PAGE_QUERY } from "../../lib/pricingQuery";

const PricingPage: React.FC = () => {
  const [pricingData, setPricingData] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  const handleButtonClick = (link: string) => {
    if (link.startsWith('/#')) {
      // Navigate to home page with hash
      window.location.href = link;
    } else {
      // Use router for other navigation
      router.push(link);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(PRICING_PAGE_QUERY);
        setPricingData(data || getDefaultData());
      } catch (error) {
        console.log('Using default data');
        setPricingData(getDefaultData());
      }
    };
    fetchData();
  }, []);

  const getDefaultData = () => ({
    pageTitle: "Simple, Transparent Pricing",
    pageSubtitle: "Choose the perfect plan for your business needs. Start free and scale as you grow.",
    pricingPlans: [
      {
        planName: "Starter",
        planType: "basic",
        isPopular: false,
        price: "Free",
        billingPeriod: "forever",
        description: "Perfect for small businesses getting started with WhatsApp automation",
        features: [
          { featureText: "Up to 100 contacts", included: true },
          { featureText: "Basic chatbot flows", included: true },
          { featureText: "24/7 support", included: false },
          { featureText: "Advanced analytics", included: false }
        ],
        ctaButton: {
          text: "Get Started Free",
          link: "/signup",
          isPrimary: false
        }
      },
      {
        planName: "Professional",
        planType: "popular",
        isPopular: true,
        price: "₹7,500",
        billingPeriod: "per month",
        description: "Everything you need to scale your WhatsApp business automation",
        features: [
          { featureText: "Up to 5,000 contacts", included: true },
          { featureText: "Advanced chatbot flows", included: true },
          { featureText: "24/7 priority support", included: true },
          { featureText: "Advanced analytics", included: true }
        ],
        ctaButton: {
          text: "Start Professional",
          link: "/#contact",
          isPrimary: true
        }
      },
      {
        planName: "Enterprise",
        planType: "enterprise",
        isPopular: false,
        price: "Custom",
        billingPeriod: "contact us",
        description: "Custom solutions for large-scale operations and enterprise needs",
        features: [
          { featureText: "Unlimited contacts", included: true },
          { featureText: "Custom integrations", included: true },
          { featureText: "Dedicated account manager", included: true },
          { featureText: "Custom features", included: true }
        ],
        ctaButton: {
          text: "Contact Sales",
          link: "/#contact",
          isPrimary: false
        }
      }
    ],
    faq: {
      sectionTitle: "Frequently Asked Questions",
      sectionSubtitle: "Everything you need to know about AIChat Support.",
      questions: [
        {
          question: "How accurate is the AI agent?",
          answer: "Our AI agent achieves over 95% accuracy in understanding and responding to customer inquiries. The system continuously learns from interactions and can be trained on your specific products, services, and brand voice."
        },
        {
          question: "Can the AI agent handle complex inquiries?",
          answer: "Yes, our AI can handle a wide range of complex inquiries. For extremely complex or sensitive issues, the system is designed to smoothly hand off to human agents with full context preservation."
        },
        {
          question: "How long does it take to set up?",
          answer: "Basic setup can be completed in as little as 30 minutes. For more comprehensive implementations with custom integrations and training, our team provides dedicated onboarding support to ensure a smooth transition."
        },
        {
          question: "Is my customer data secure?",
          answer: "Absolutely. We use enterprise-grade encryption and comply with GDPR, CCPA, and other relevant data protection regulations. Your data is never used to train models for other companies, and we offer data residency options for businesses with specific compliance requirements."
        },
        {
          question: "Can I customize the AI's responses?",
          answer: "Yes, you have full control over the AI's tone, language, and response patterns. Our platform includes a simple interface for training the AI on your brand voice and specific product information."
        },
        {
          question: "What if I need to cancel my subscription?",
          answer: "You can cancel your subscription at any time. We don't lock you into long-term contracts. If you cancel, you'll have access until the end of your billing period, and we provide tools to export your data."
        }
      ]
    },
    bottomCta: {
      headline: "Ready to get started?",
      description: "Join thousands of businesses already automating their WhatsApp with Sahyogi",
      secondaryButton: {
        text: "Schedule Demo",
        link: "/#contact"
      }
    }
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!pricingData) return <div>Loading...</div>;

  return (
    <div style={{ background: '#ffffffff', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ 
        padding: '8rem 2rem 4rem 2rem', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1a355e 0%, #2c5aa0 100%)',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: 900, 
            marginBottom: '2rem',
            letterSpacing: '-0.025em',
            lineHeight: '1.1'
          }}>
            {pricingData.pageTitle}
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            opacity: 0.9,
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {pricingData.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section style={{ padding: '6rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '3rem',
            alignItems: 'stretch'
          }}>
            {pricingData.pricingPlans?.map((plan: any, index: number) => (
              <div key={index} style={{
                position: 'relative',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '3rem',
                boxShadow: plan.isPopular 
                  ? '0 16px 48px 0 rgba(46, 196, 241, 0.15)' 
                  : '0 8px 32px 0 rgba(26, 53, 94, 0.08)',
                border: plan.isPopular 
                  ? '#1a365e 3px solid' 
                  : '1px solid rgba(226, 232, 240, 0.5)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                transform: plan.isPopular ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (!plan.isPopular) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px 0 rgba(26, 53, 94, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.isPopular) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(26, 53, 94, 0.08)';
                }
              }}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#1a365e',
                    color: '#ffffff',
                    padding: '0.5rem 2rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 16px 0 rgba(46, 196, 241, 0.3)'
                  }}>
                    Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 700, 
                    color: '#1a355e',
                    marginBottom: '0.5rem'
                  }}>
                    {plan.planName}
                  </h3>
                  <div style={{ marginBottom: '1rem' }}>
                    {plan.originalPrice && (
                      <span style={{
                        fontSize: '1.2rem',
                        color: '#64748b',
                        textDecoration: 'line-through',
                        marginRight: '0.5rem'
                      }}>
                        {plan.originalPrice}
                      </span>
                    )}
                    <span style={{ 
                      fontSize: '3rem', 
                      fontWeight: 900, 
                      color: plan.isPopular ? '#1a355e' : '#1a355e'
                    }}>
                      {plan.price}
                    </span>
                    {plan.billingPeriod && (
                      <span style={{ 
                        fontSize: '1rem', 
                        color: '#64748b',
                        display: 'block',
                        marginTop: '0.5rem'
                      }}>
                        {plan.billingPeriod}
                      </span>
                    )}
                  </div>
                  <p style={{ 
                    color: '#64748b', 
                    lineHeight: '1.6',
                    fontSize: '1.1rem'
                  }}>
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <div style={{ marginBottom: '2.5rem' }}>
                  {plan.features?.map((feature: any, featureIndex: number) => (
                    <div key={featureIndex} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      marginBottom: '0.8rem'
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: feature.included ? '#22c55e' : '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <span style={{
                          color: feature.included ? '#ffffff' : '#9ca3af',
                          fontSize: '0.7rem',
                          fontWeight: 'bold'
                        }}>
                          {feature.included ? '✓' : '✕'}
                        </span>
                      </div>
                      <span style={{ 
                        color: feature.included ? '#1a355e' : '#9ca3af',
                        fontWeight: feature.highlight ? 700 : 500,
                        textDecoration: feature.included ? 'none' : 'line-through'
                      }}>
                        {feature.featureText}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button style={{
                  width: '100%',
                  background: plan.ctaButton?.isPrimary || plan.isPopular
                    ? '#1a365e'
                    : 'transparent',
                  color: plan.ctaButton?.isPrimary || plan.isPopular ? '#ffffff' : '#1a355e',
                  border: plan.ctaButton?.isPrimary || plan.isPopular 
                    ? 'none' 
                    : '2px solid #1a355e',
                  borderRadius: '12px',
                  padding: '1.2rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: plan.ctaButton?.isPrimary || plan.isPopular
                    ? '0 8px 24px 0 rgba(46, 196, 241, 0.3)'
                    : 'none'
                }}
                onClick={() => handleButtonClick(plan.ctaButton?.link || '/#contact')}
                onMouseEnter={(e) => {
                  if (plan.ctaButton?.isPrimary || plan.isPopular) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px 0 rgba(46, 196, 241, 0.4)';
                  } else {
                    e.currentTarget.style.background = '#1a355e';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (plan.ctaButton?.isPrimary || plan.isPopular) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(46, 196, 241, 0.3)';
                  } else {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#1a355e';
                  }
                }}
                >
                  {plan.ctaButton?.text}
                </button>

                {/* Additional Info */}
                {plan.additionalInfo && (
                  <p style={{
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: '#64748b',
                    marginTop: '1rem'
                  }}>
                    {plan.additionalInfo}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {pricingData.faq && pricingData.faq.questions && pricingData.faq.questions.length > 0 && (
        <section style={{ 
          padding: '6rem 2rem', 
          background: '#f8fafc'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ 
              textAlign: 'center',
              fontSize: '3rem', 
              fontWeight: 800, 
              color: '#1a355e',
              marginBottom: '1rem'
            }}>
              {pricingData.faq?.sectionTitle || 'Frequently Asked Questions'}
            </h2>
            <p style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              color: '#64748b',
              marginBottom: '4rem',
              maxWidth: '600px',
              margin: '0 auto 4rem auto'
            }}>
              {pricingData.faq?.sectionSubtitle || 'Everything you need to know about AIChat Support.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pricingData.faq.questions.map((item: any, index: number) => (
                <div key={index} style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '1.5rem 2rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#1a355e'
                    }}
                  >
                    {item.question}
                    <span style={{
                      fontSize: '1.5rem',
                      transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}>
                      +
                    </span>
                  </button>
                  {openFaq === index && (
                    <div style={{
                      padding: '0 2rem 1.5rem 2rem',
                      color: '#64748b',
                      lineHeight: '1.6'
                    }}>
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Section */}
      {pricingData.bottomCta && (
        <section style={{ 
          padding: '6rem 2rem', 
          background: 'linear-gradient(135deg, #1a355e 0%, #2c5aa0 100%)',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 800, 
              marginBottom: '1.5rem'
            }}>
              {pricingData.bottomCta.headline}
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              marginBottom: '3rem',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              {pricingData.bottomCta.description}
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {pricingData.bottomCta.primaryButton && (
                <button style={{
                  background: '#ffffff',
                  color: '#1a355e',
                  border: 'none',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  {pricingData.bottomCta.primaryButton.text}
                </button>
              )}
              {pricingData.bottomCta.secondaryButton && (
                <button style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#1a355e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                }}
                >
                  {pricingData.bottomCta.secondaryButton.text}
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PricingPage;
