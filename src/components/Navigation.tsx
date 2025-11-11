'use client';

import { useState, useRef, useEffect } from 'react';
import EyeFollower from './EyeFollower';

export default function Navigation() {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  // Minimal fix: allow click on X to close while hovered until mouse leaves
  const [forceClosed, setForceClosed] = useState(false);
  // Fast reopen when user has scrolled inside menu
  const [fastOpen, setFastOpen] = useState(false);
  // Track if we're on mobile/touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isOpen = isMenuHovered && !forceClosed;

  // Detect touch device
  useEffect(() => {
    // Only consider it a touch device if it ONLY supports touch (not hybrid like laptops with touchscreens)
    const hasTouchOnly = 'ontouchstart' in window && window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(hasTouchOnly);
  }, []);

  // Close menu when clicking outside on touch devices
  useEffect(() => {
    if (!isTouchDevice || !isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuHovered(false);
        setForceClosed(false);
        setFastOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isTouchDevice, isOpen]);

  return (
    <>
      {/* Center Menu Strip */}
      <nav className="fixed top-4 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div
          ref={menuRef}
          className="relative pb-2 sm:pb-3"
        >
          {/* Main Menu Strip */}
          <div
            className="bg-black/30 backdrop-blur-md rounded-lg sm:rounded-[0.5vw] border border-white/10 px-3 sm:px-6 md:px-8  py-2 sm:py-2.5 flex items-center justify-between w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-xl"
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
              if (!forceClosed) {
                setIsMenuHovered(true);
                // if user previously scrolled, open almost instantly
                if (listRef.current && listRef.current.scrollTop > 0) setFastOpen(true);
              }
            }}
            onMouseLeave={() => {
              // Delay close slightly to allow moving to dropdown
              closeTimeoutRef.current = setTimeout(() => {
                setIsMenuHovered(false);
                setForceClosed(false);
                setFastOpen(false);
              }, 150);
            }}
          >
            <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-wider">MENU</span>
            
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              {/* Eye Follower - Hidden on mobile */}
              <div className="hidden sm:block">
                <EyeFollower />
              </div>
              
              {/* Hamburger Icon */}
              <div className={`relative h-3.5 sm:h-4 w-5 sm:w-6 pointer-events-auto flex flex-col justify-center gap-1.5 transition-all duration-300 z-50 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                <span className={`pointer-events-none w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-out absolute top-0 left-0 ${
                  isOpen ? 'translate-y-[6px] sm:translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'
                }`}></span>
                <span className={`pointer-events-none w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-0 scale-x-50' : 'opacity-100 scale-x-100'
                }`}></span>
                <span className={`pointer-events-none w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-out absolute bottom-0 left-0 ${
                  isOpen ? '-translate-y-[6px] sm:-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0'
                }`}></span>
                {/* Invisible hit area to capture clicks on hamburger/X */}
<button
                  aria-label="toggle menu"
                  className="absolute -inset-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isOpen) {
                      // Close menu
                      setForceClosed(true);
                      setIsMenuHovered(false);
                      setFastOpen(false);
                    } else {
                      // Open menu
                      setForceClosed(false);
                      setIsMenuHovered(true);
                      if (listRef.current && listRef.current.scrollTop > 0) setFastOpen(true);
                    }
                  }}
                  style={{ background: 'transparent' }}
                />
              </div>
            </div>
          </div>
          
          {/* Invisible bridge to prevent hover gap - Desktop only */}
          {!isTouchDevice && (
            <div 
              className="absolute left-0 right-0 h-3"
              style={{ top: '100%' }}
              onMouseEnter={() => {
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
                setIsMenuHovered(true);
              }}
            />
          )}
          
          {/* Dropdown Menu - Extended hover area */}
<div className={`absolute left-1/2 transform -translate-x-1/2 ${fastOpen ? 'transition-none' : 'transition-transform duration-500 ease-out'} origin-top z-40 ${
            isOpen 
              ? 'visible scale-100 translate-y-0 pointer-events-auto' 
              : 'invisible scale-95 -translate-y-6 pointer-events-none'
          }`}
          style={{ top: 'calc(100% + 8px)' }}
          >
<div
              ref={listRef}
              className={`nav-menu-scroll rounded-xl sm:rounded-2xl md:rounded-[0.5vw] border border-white/20 shadow-2xl w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-xl max-h-[70vh] sm:max-h-[60vh] overflow-y-scroll bg-black/50 backdrop-blur-2xl`}
              style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain', willChange: 'transform, backdrop-filter' }}
              onMouseEnter={() => {
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
                setIsMenuHovered(true);
              }}
              onMouseLeave={() => {
                setIsMenuHovered(false);
                setForceClosed(false);
                setFastOpen(false);
              }}
              onWheel={(e) => e.stopPropagation()}
              onScroll={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                {/* Download Resume Button - Mobile Only */}
                <button className={`lg:hidden w-full bg-white/15 backdrop-blur-sm text-white py-2 rounded-full border border-white/30 text-xs font-accent transition-all duration-200 mb-6 flex items-center justify-center gap-1.5 ${
                  isMenuHovered 
                    ? 'opacity-100 translate-y-0 delay-[100ms]' 
                    : 'opacity-0 translate-y-6'
                }`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="tracking-wider text-[10px]">DOWNLOAD</span>
                </button>
                
                {/* Projects Section */}
                <div className="mb-10">
                  <h3 className={`text-white/70 text-sm font-secondary tracking-wider mb-6 ${fastOpen ? 'transition-none' : 'transition-all duration-400'} ${
                    isMenuHovered ? (fastOpen ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0 delay-[100ms]') : 'opacity-0 translate-y-4'
                  }`}>PROJECTS</h3>
                  <div className="space-y-3">
                    {[
                      'Portfolio Website',
                      'E-commerce Platform', 
                      'Task Management App',
                      'API Dashboard',
                      'Mobile App',
                      'Web Analytics',
                      'React Native App',
                      'Node.js Backend',
                      'Python Data Analysis',
                      'Vue.js Dashboard'
                    ].map((project, index) => (
                      <a 
                        key={project}
                        href="#" 
                        className={`block text-white text-base sm:text-lg font-primary py-1.5 ${fastOpen ? 'transition-none' : 'transition-colors duration-100'} hover:text-white/80 ${
                          isMenuHovered 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-6'
                        }`}
                        style={{ 
                          transitionDelay: fastOpen ? '0ms' : (isMenuHovered ? `${150 + (index * 50)}ms` : '0ms'),
                          transitionProperty: isMenuHovered ? 'opacity, transform' : 'opacity, transform, color'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateX(8px)';
                          e.target.style.transition = 'transform 0.1s ease-out, color 0.1s ease-out';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateX(0px)';
                          e.target.style.transition = 'transform 0.1s ease-out, color 0.1s ease-out';
                        }}
                      >
                        {project}
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Divider */}
                <div className={`border-t border-white/20 mb-6 ${fastOpen ? 'transition-none' : 'transition-all duration-400'} ${
                  isMenuHovered ? (fastOpen ? 'opacity-100' : 'opacity-100 delay-[650ms]') : 'opacity-0'
                }`}></div>
                
                {/* More Section */}
                <div className="mb-10">
                  <h3 className={`text-white/70 text-sm font-secondary tracking-wider mb-6 ${fastOpen ? 'transition-none' : 'transition-all duration-400'} ${
                    isMenuHovered ? (fastOpen ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0 delay-[700ms]') : 'opacity-0 translate-y-4'
                  }`}>MORE</h3>
                  <div className="space-y-3">
                    {[
                      'About',
                      'Experience',
                      'Skills',
                      'Blog',
                      'Testimonials',
                      'Awards'
                    ].map((item, index) => (
                      <a 
                        key={item}
                        href="#" 
                        className={`block text-white text-base sm:text-lg font-primary py-1.5 ${fastOpen ? 'transition-none' : 'transition-colors duration-100'} hover:text-white/80 ${
                          isMenuHovered 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-6'
                        }`}
                        style={{ 
                          transitionDelay: fastOpen ? '0ms' : (isMenuHovered ? `${750 + (index * 50)}ms` : '0ms'),
                          transitionProperty: isMenuHovered ? 'opacity, transform' : 'opacity, transform, color'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateX(8px)';
                          e.target.style.transition = 'transform 0.1s ease-out, color 0.1s ease-out';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateX(0px)';
                          e.target.style.transition = 'transform 0.1s ease-out, color 0.1s ease-out';
                        }}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Download Resume Button - Desktop Only */}
      <div className="hidden lg:block fixed top-6 md:top-8 right-6 md:right-8 z-50">
        <button className="bg-black/30 backdrop-blur-md text-white px-4 py-3 rounded-lg md:rounded-[0.5vw] border border-white/10 transition-all duration-300 hover:bg-black/40 flex items-center gap-2">
          {/* Download Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs sm:text-sm font-light tracking-wider whitespace-nowrap">Download Resume</span>
        </button>
      </div>
    </>
  );
}
