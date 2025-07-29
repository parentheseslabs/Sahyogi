'use client';

import React from 'react';
import Link from 'next/link';
import { client } from '../../lib/sanity';

const headerStyle: React.CSSProperties = {
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
  background: 'rgba(255, 254, 249, 0.95)',
  boxShadow: '0 4px 24px 0 rgba(26, 53, 94, 0.08)',
  backdropFilter: 'blur(12px)',
  borderRadius: '0 0 20px 20px',
  border: '1px solid rgba(226, 232, 240, 0.3)',
  minHeight: '70px',
};

const logoContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 'clamp(120px, 20vw, 160px)',
  minHeight: 'clamp(36px, 6vw, 48px)',
  padding: 'clamp(0.3rem, 1vw, 0.5rem) clamp(1rem, 2vw, 1.5rem)',
  borderRadius: '20px',
  background: '#fffef9',
  boxShadow: '0 2px 16px 0 rgba(26, 53, 94, 0.06)',
  marginRight: 'auto',
  border: '1px solid rgba(241, 245, 249, 0.8)',
};

const logoImgStyle: React.CSSProperties = {
  height: 'clamp(36px, 6vw, 48px)',
  width: 'auto',
  display: 'block',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'clamp(0.8rem, 2vw, 1.5rem)',
  justifyContent: 'center',
  alignItems: 'center',
};

const linkStyle: React.CSSProperties = {
  color: '#1a355e',
  fontWeight: 600,
  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
  textDecoration: 'none',
  padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.8rem, 2vw, 1.5rem)',
  borderRadius: '12px',
  transition: 'all 0.2s ease',
  background: 'none', // removed background
  border: 'none',     // removed border
  letterSpacing: '-0.025em',
  whiteSpace: 'nowrap',
};

const linkHoverStyle: React.CSSProperties = {
  color: '#2ec4f1', // light blue on hover
  background: 'none', // no background
  boxShadow: 'none',  // no box shadow
  transform: 'none',  // no transform
};

const navLinks = [
  //{ name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/#about' },
  { name: 'Product', href: '/#product' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Resources', href: '/#resources' },
  { name: 'Contact', href: '/contact' },
];

const hamburgerStyle: React.CSSProperties = {
  display: 'none',
  flexDirection: 'column',
  gap: '4px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '12px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  marginRight: '1rem'
};

const hamburgerLineStyle: React.CSSProperties = {
  width: '26px',
  height: '3px',
  backgroundColor: '#1a355e',
  transition: 'all 0.3s ease',
  borderRadius: '3px',
  transformOrigin: '1px'
};

const mobileMenuStyle: React.CSSProperties = {
  position: 'fixed',
  top: '70px',
  left: 0,
  right: 0,
  background: 'rgba(255, 254, 249, 0.98)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.15)',
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 999,
  borderRadius: '0 0 20px 20px',
  border: '1px solid rgba(226, 232, 240, 0.3)',
  borderTop: 'none',
  maxHeight: '80vh',
  overflowY: 'auto',
};

const mobileLinkStyle: React.CSSProperties = {
  color: '#1a355e',
  fontWeight: 600,
  fontSize: '1.1rem',
  textDecoration: 'none',
  padding: '1.2rem 2rem',
  borderBottom: '1px solid rgba(226, 232, 240, 0.4)',
  transition: 'all 0.2s ease',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  width: '100%',
  display: 'block',
  cursor: 'pointer'
};

const mobileSubLinkStyle: React.CSSProperties = {
  color: '#4a5568',
  fontWeight: 500,
  fontSize: '1rem',
  textDecoration: 'none',
  padding: '0.8rem 3rem',
  borderBottom: '1px solid rgba(226, 232, 240, 0.2)',
  transition: 'all 0.2s ease',
  background: 'rgba(46, 196, 241, 0.05)',
  display: 'block',
  cursor: 'pointer'
};

export const Header: React.FC = () => {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [services, setServices] = React.useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Handle hash navigation on page load
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1); // Remove the # symbol
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Delay scrolling to ensure page is fully loaded
          setTimeout(() => {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }
    };
    
    checkMobile();
    handleHashNavigation();
    
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Dynamic header style based on scroll position
  const getDynamicHeaderStyle = (): React.CSSProperties => {
    const maxScroll = 300; // Maximum scroll distance for full effect
    const scrollRatio = Math.min(scrollY / maxScroll, 1);
    const baseBlur = 12;
    const maxBlur = 24;
    const blurAmount = baseBlur + (maxBlur - baseBlur) * scrollRatio;
    const baseOpacity = 0.95;
    const maxOpacity = 0.98;
    const opacity = baseOpacity + (maxOpacity - baseOpacity) * scrollRatio;
    
    return {
      ...headerStyle,
      backdropFilter: `blur(${blurAmount}px)`,
      background: `rgba(255, 254, 249, ${opacity})`,
      boxShadow: `0 4px 24px 0 rgba(26, 53, 94, ${0.08 + 0.12 * scrollRatio})`,
      transition: 'all 0.3s ease',
    };
  };

  // Dynamic mobile menu style based on scroll position
  const getDynamicMobileMenuStyle = (): React.CSSProperties => {
    const maxScroll = 300;
    const scrollRatio = Math.min(scrollY / maxScroll, 1);
    const baseBlur = 12;
    const maxBlur = 20;
    const blurAmount = baseBlur + (maxBlur - baseBlur) * scrollRatio;
    const baseOpacity = 0.98;
    const maxOpacity = 0.99;
    const opacity = baseOpacity + (maxOpacity - baseOpacity) * scrollRatio;
    
    return {
      ...mobileMenuStyle,
      backdropFilter: `blur(${blurAmount}px)`,
      background: `rgba(255, 254, 249, ${opacity})`,
      boxShadow: `0 8px 32px 0 rgba(26, 53, 94, ${0.15 + 0.1 * scrollRatio})`,
    };
  };

  const handleNavigationClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    console.log(`${sectionId} click - checking current location`);
    
    // Check if we're currently on the home page
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      // If on home page, scroll to section directly
      console.log(`On home page - looking for element with id: ${sectionId}`);
      const section = document.getElementById(sectionId);
      console.log(`Found ${sectionId} section:`, section);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If on different page, navigate to home page with hash
      console.log(`Not on home page - navigating to /#${sectionId}`);
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleProductClick = (e: React.MouseEvent) => {
    handleNavigationClick(e, 'product');
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    handleNavigationClick(e, 'about');
  };

  const handleResourcesClick = (e: React.MouseEvent) => {
    handleNavigationClick(e, 'resources');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    handleNavigationClick(e, 'contact');
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('Logo click - navigating to home');
    // Navigate to home page
    window.location.href = '/';
  };

  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      html {
        scroll-behavior: smooth;
      }
      @media (max-width: 768px) {
        .desktop-nav {
          display: none !important;
        }
        .mobile-hamburger {
          display: flex !important;
        }
      }
      @media (min-width: 769px) {
        .desktop-nav {
          display: flex !important;
        }
        .mobile-hamburger {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  React.useEffect(() => {
    // For now, use static services to ensure all services are available
    // This can be replaced with dynamic Sanity queries later
    setServices([
      { title: 'Customer Support Automation', slug: { current: 'customer-support-automation' } },
      { title: 'Business Process Automation', slug: { current: 'business-process-automation' } },
      { title: 'Lead Generation & Outreach', slug: { current: 'lead-generation-outreach' } },
      { title: 'Social Media Automation', slug: { current: 'social-media-automation' } }
    ]);
  }, []);

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-menu {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .hamburger-menu {
            display: none !important;
          }
        }
      `}</style>
      <header style={getDynamicHeaderStyle()}>
      <div style={logoContainerStyle}>
        <a href="/" onClick={handleLogoClick}>
          <img src="/Logo.png" alt="Sahyogi Logo" style={logoImgStyle} />
        </a>
      </div>
      <nav style={navStyle} className="desktop-nav">
        {navLinks.map((link, idx) => {
          if (link.name === 'Services') {
            return (
              <div
                key="Services"
                style={{ position: 'relative', display: 'inline-block' }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <span
                  style={{
                    ...(servicesOpen ? { ...linkStyle, ...linkHoverStyle, cursor: 'pointer' } : { ...linkStyle, cursor: 'pointer' }),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Services
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {servicesOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '110%',
                      left: 0,
                      background: '#fff',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px 0 rgba(26, 53, 94, 0.10)',
                      minWidth: '260px',
                      padding: '0.7rem 0',
                      zIndex: 2000,
                      animation: 'fadeIn 0.2s',
                    }}
                  >
                    {services.map((service) => (
                      <Link
                        key={service.slug?.current || service.title}
                        href={`/services/${service.slug?.current || service.title.toLowerCase().replace(/\s+/g, '-')}`}
                        style={{
                          display: 'block',
                          padding: '0.9rem 1.5rem',
                          color: '#1a355e',
                          fontWeight: 500,
                          fontSize: '0.98rem', // smaller font size
                          textDecoration: 'none',
                          border: 'none',
                          background: 'none',
                          borderRadius: 0,
                          transition: 'background 0.15s, color 0.15s',
                          whiteSpace: 'nowrap', // prevent wrapping
                          textOverflow: 'ellipsis', // show ellipsis if too long
                          overflow: 'hidden', // hide overflow
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#2ec4f1')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#1a355e')}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          
          // Function to get the appropriate click handler
          const getClickHandler = (linkName: string) => {
            switch (linkName) {
              case 'Product': return handleProductClick;
              case 'About Us': return handleAboutClick;
              case 'Resources': return handleResourcesClick;
              case 'Contact': return handleContactClick;
              default: return undefined;
            }
          };

          // Check if this is a scroll link or a navigation link
          const isScrollLink = ['Product', 'About Us', 'Resources', 'Contact'].includes(link.name);

          return isScrollLink ? (
            <button
              key={link.name}
              style={{
                ...linkStyle,
                ...(hovered === idx ? linkHoverStyle : {}),
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={getClickHandler(link.name)}
            >
              {link.name}
            </button>
          ) : (
            <a
              key={link.name}
              href={link.href}
              style={hovered === idx ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {link.name}
            </a>
          );
        })}
      </nav>

      {/* Mobile Hamburger Menu */}
      <button
        className="hamburger-menu"
        style={hamburgerStyle}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <div style={{
          ...hamburgerLineStyle,
          transform: isMobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
        }}></div>
        <div style={{
          ...hamburgerLineStyle,
          opacity: isMobileMenuOpen ? 0 : 1,
          transform: isMobileMenuOpen ? 'translateX(20px)' : 'none'
        }}></div>
        <div style={{
          ...hamburgerLineStyle,
          transform: isMobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
        }}></div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={getDynamicMobileMenuStyle()}>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {navLinks.map((link, idx) => {
              if (link.name === 'Services') {
                return (
                  <div key="Services">
                    <div
                      style={{
                        ...mobileLinkStyle,
                        backgroundColor: 'rgba(46, 196, 241, 0.08)',
                        fontWeight: 700
                      }}
                    >
                      Services
                    </div>
                    {services.map((service, i) => (
                      <Link
                        key={i}
                        href={`/services/${service.slug?.current || service.title.toLowerCase().replace(/\s+/g, '-')}`}
                        style={mobileSubLinkStyle}
                        onClick={() => setIsMobileMenuOpen(false)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(46, 196, 241, 0.15)';
                          e.currentTarget.style.color = '#2ec4f1';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(46, 196, 241, 0.05)';
                          e.currentTarget.style.color = '#4a5568';
                        }}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                );
              } else {
                // Function to get the appropriate click handler
                const getClickHandler = (linkName: string) => {
                  switch (linkName) {
                    case 'Product': return handleProductClick;
                    case 'About Us': return handleAboutClick;
                    case 'Resources': return handleResourcesClick;
                    case 'Contact': return handleContactClick;
                    default: return undefined;
                  }
                };

                // Check if this is a scroll link or a navigation link
                const isScrollLink = ['Product', 'About Us', 'Resources', 'Contact'].includes(link.name);

                return isScrollLink ? (
                  <button
                    key={link.name}
                    style={mobileLinkStyle}
                    onClick={(e) => {
                      const handler = getClickHandler(link.name);
                      if (handler) handler(e);
                      setIsMobileMenuOpen(false);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(46, 196, 241, 0.1)';
                      e.currentTarget.style.color = '#2ec4f1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#1a355e';
                    }}
                  >
                    {link.name}
                  </button>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    style={mobileLinkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(46, 196, 241, 0.1)';
                      e.currentTarget.style.color = '#2ec4f1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#1a355e';
                    }}
                  >
                    {link.name}
                  </a>
                );
              }
            })}
          </nav>
        </div>
      )}
    </header>
    </>
  );
};

export default Header; 