'use client';

import { useEffect } from 'react';

export default function SheryScripts() {
  useEffect(() => {
    const loadScript = (src: string, id: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load: ${src}`));
        document.head.appendChild(script);
      });
    };

    const loadCSS = (href: string, id: string) => {
      if (document.getElementById(id)) return;

      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };

    const init = async () => {
      try {
        loadCSS('https://unpkg.com/sheryjs/dist/Shery.css', 'shery-css');

        await loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
          'gsap-script'
        );
        
        await loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
          'scrolltrigger-script'
        );
        
        await loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.155.0/three.min.js',
          'threejs-script'
        );

        await loadScript(
          'https://unpkg.com/sheryjs/dist/Shery.js',
          'shery-script'
        );
        
        console.log('Shery.js loaded successfully');
      } catch (error) {
        console.error('Error loading Shery.js:', error);
      }
    };

    init();
  }, []);

  return null;
}
