'use client';

import { useState, useEffect } from 'react';

export interface ScreenSize {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isMobile: boolean;
}

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({ size: 'lg', isMobile: false });

  useEffect(() => {
    function getScreenSize(): ScreenSize {
      if (typeof window === 'undefined') return { size: 'lg', isMobile: false };
      const width = window.innerWidth;
      let size: ScreenSize['size'];
      if (width < 640) size = 'xs';
      else if (width < 768) size = 'sm';
      else if (width < 1024) size = 'md';
      else if (width < 1280) size = 'lg';
      else if (width < 1536) size = 'xl';
      else size = '2xl';

      return {
        size,
        isMobile: width < 1024 // Consider anything below lg as mobile
      };
    }

    function handleResize() {
      setScreenSize(getScreenSize());
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
