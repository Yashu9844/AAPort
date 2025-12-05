'use client';

import { useEffect } from 'react';

/**
 * Lazy loads GSAP and ScrollTrigger (required for About section animations)
 * Three.js and SheryJS removed - were unused and added 720KB+ of bloat
 */
export default function SheryScripts() {
  useEffect(() => {
    // Delay loading until page is idle to improve initial load performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadGSAP(), { timeout: 2000 });
    } else {
      setTimeout(() => loadGSAP(), 1000);
    }
    
    function loadGSAP() {
      const scripts = [
        { 
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
          id: 'gsap-script'
        },
        { 
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
          id: 'scrolltrigger-script'
        }
      ];
      
      scripts.forEach(({ src, id }) => {
        if (!document.getElementById(id)) {
          const script = document.createElement('script');
          script.id = id;
          script.src = src;
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
        }
      });
    }
  }, []);

  return null;
}
