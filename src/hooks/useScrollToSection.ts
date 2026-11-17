import { useCallback } from 'react';
import { getLenis } from '@/lib/lenis';

const scrollToElement = (element: HTMLElement) => {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(element);
  else element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const projectsSection = document.getElementById('projects');
    const sectionsAfterProjects = ['featured', 'approach', 'tech-stack', 'testimonials'];
    const needsToPassProjects = sectionsAfterProjects.includes(sectionId);

    // Check if we're already past projects section
    const currentScrollY = window.scrollY;
    const projectsBottom = projectsSection ? projectsSection.getBoundingClientRect().bottom + currentScrollY : 0;
    const alreadyPastProjects = currentScrollY > projectsBottom;

    if (needsToPassProjects && !alreadyPastProjects && projectsSection) {
      // Set target on window for Projects component to detect
      window.__scrollTarget = sectionId;

      // Dispatch event to instantly expand projects
      window.dispatchEvent(new Event('beforeScroll'));

      // Wait a bit for cards to expand, then scroll
      setTimeout(() => {
        scrollToElement(element);
        window.__scrollTarget = null;
      }, 100);
    } else {
      // Direct scroll - either going to projects or already past it
      scrollToElement(element);
    }
  }, []);

  return scrollToSection;
};
