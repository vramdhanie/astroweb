'use client';

import { useEffect } from 'react';

export default function ThemeScript() {
  useEffect(() => {
    // This script runs on the client side to prevent hydration mismatch
    const theme = localStorage.getItem('theme') || 'system';
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      // System theme
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }
  }, []);

  return null;
}
