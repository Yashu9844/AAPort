import { useCallback } from 'react';

export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    
    if (!element) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }

    const projectsSection = document.getElementById('projects');
    const sectionsAfterProjects = ['testimonials', 'featured', 'approach', 'tech-stack'];
    const needsToPassProjects = sectionsAfterProjects.includes(sectionId);
    
    // Check if we're already past projects section
    const currentScrollY = window.scrollY;
    const projectsBottom = projectsSection ? projectsSection.getBoundingClientRect().bottom + currentScrollY : 0;
    const alreadyPastProjects = currentScrollY > projectsBottom;

    if (needsToPassProjects && !alreadyPastProjects && projectsSection) {
      // Set target on window for Projects component to detect
      (window as any).__scrollTarget = sectionId;
      
      // Dispatch event to instantly expand projects
      window.dispatchEvent(new Event('beforeScroll'));
      
      // Wait a bit for cards to expand, then scroll
      setTimeout(() => {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
        
        // Clean up
        (window as any).__scrollTarget = null;
      }, 100);
    } else {
      // Direct scroll - either going to projects or already past it
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, []);

  return scrollToSection;
};
