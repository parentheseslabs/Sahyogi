'use client';

import React, { useEffect } from 'react';
import { injectGlobalAnimations, initScrollAnimations } from '../../lib/animations';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  useEffect(() => {
    // Inject global animations
    const cleanupAnimations = injectGlobalAnimations();
    
    // Initialize scroll animations
    const cleanupScrollAnimations = initScrollAnimations();
    
    return () => {
      cleanupAnimations?.();
      cleanupScrollAnimations?.();
    };
  }, []);

  return <>{children}</>;
}
