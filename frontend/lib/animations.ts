// Animation utilities for the website
export const injectGlobalAnimations = () => {
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(46, 196, 241, 0.3); }
        50% { box-shadow: 0 0 30px rgba(46, 196, 241, 0.5); }
      }

      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }

      .animate-on-scroll.in-view {
        opacity: 1;
        transform: translateY(0);
      }

      .hover-lift {
        transition: all 0.3s ease;
      }

      .hover-lift:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(26, 53, 94, 0.15);
      }

      .gradient-text {
        background: linear-gradient(135deg, #1a355e 0%, #2ec4f1 70%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .btn-shimmer {
        position: relative;
        overflow: hidden;
      }

      .btn-shimmer::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        animation: shimmer 2s infinite;
      }

      .floating-element {
        animation: float 3s ease-in-out infinite;
      }

      @media (max-width: 768px) {
        .floating-element {
          animation: none;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }
};

// Scroll animation observer
export const initScrollAnimations = () => {
  if (typeof window !== 'undefined') {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }
};

// Utility function to add staggered animation delays
export const addStaggeredDelay = (elements: NodeListOf<Element>, baseDelay = 0.1) => {
  elements.forEach((element, index) => {
    (element as HTMLElement).style.animationDelay = `${baseDelay * index}s`;
  });
};
