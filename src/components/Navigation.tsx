'use client';

import { useState } from 'react';
import EyeFollower from './EyeFollower';

export default function Navigation() {
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  return (
    <>
      {/* Center Menu Strip */}
      <nav className="fixed top-4 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className="relative"
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          {/* Main Menu Strip */}
          <div className="bg-black/30 backdrop-blur-md rounded-lg sm:rounded-[0.5vw] border border-white/10 px-3 sm:px-6 md:px-8  py-2 sm:py-2.5 flex items-center justify-between w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-xl">
            <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-wider">MENU</span>
            
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              {/* Eye Follower - Hidden on mobile */}
              <div className="hidden sm:block">
                <EyeFollower />
              </div>
              
              {/* Hamburger Icon */}
              <div className={`relative h-3.5 sm:h-4 w-5 sm:w-6 pointer-events-auto flex flex-col justify-center gap-1.5 transition-all duration-300 ${isMenuHovered ? 'rotate-90' : 'rotate-0'}`}>
                <span className={`w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-out absolute top-0 left-0 ${
                  isMenuHovered ? 'translate-y-[6px] sm:translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'
                }`}></span>
                <span className={`w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-out ${
                  isMenuHovered ? 'opacity-0 scale-x-50' : 'opacity-100 scale-x-100'
                }`}></span>
                <span className={`w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-out absolute bottom-0 left-0 ${
                  isMenuHovered ? '-translate-y-[6px] sm:-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0'
                }`}></span>
              </div>
            </div>
          </div>
          
          {/* Dropdown Menu - Extended hover area */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 pt-10 sm:pt-12 md:pt-14 transition-all duration-500 ease-out origin-top z-40 ${
            isMenuHovered 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 -translate-y-6 pointer-events-none'
          }`}>
            <div className="nav-menu-scroll bg-black/50 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-[0.5vw] border border-white/20 shadow-2xl w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-xl max-h-[70vh] sm:max-h-[60vh] overflow-y-scroll" style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain' }} onWheel={(e) => e.stopPropagation()} onScroll={(e) => e.stopPropagation()}>
              <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                {/* Download Resume Button - Mobile Only */}
                <button className={`sm:hidden w-full bg-white/15 backdrop-blur-sm text-white py-2 rounded-full border border-white/30 text-xs font-accent transition-all duration-200 mb-6 flex items-center justify-center gap-1.5 ${
                  isMenuHovered 
                    ? 'opacity-100 translate-y-0 delay-[100ms]' 
                    : 'opacity-0 translate-y-6'
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transition = 'all 0.15s ease-out';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transition = 'all 0.15s ease-out';
                }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="tracking-wider text-[10px]">DOWNLOAD</span>
                </button>
                
                {/* Projects Section */}
                <div className="mb-10">
                  <h3 className={`text-white/70 text-sm font-secondary tracking-wider mb-6 transition-all duration-400 ${
                    isMenuHovered ? 'opacity-100 translate-y-0 delay-[100ms]' : 'opacity-0 translate-y-4'
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
                        className={`block text-white text-base sm:text-lg font-primary py-1.5 transition-colors duration-100 hover:text-white/80 ${
                          isMenuHovered 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-6'
                        }`}
                        style={{ 
                          transitionDelay: isMenuHovered ? `${150 + (index * 50)}ms` : '0ms',
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
                <div className={`border-t border-white/20 mb-6 transition-all duration-400 ${
                  isMenuHovered ? 'opacity-100 delay-[650ms]' : 'opacity-0'
                }`}></div>
                
                {/* More Section */}
                <div className="mb-10">
                  <h3 className={`text-white/70 text-sm font-secondary tracking-wider mb-6 transition-all duration-400 ${
                    isMenuHovered ? 'opacity-100 translate-y-0 delay-[700ms]' : 'opacity-0 translate-y-4'
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
                        className={`block text-white text-base sm:text-lg font-primary py-1.5 transition-colors duration-100 hover:text-white/80 ${
                          isMenuHovered 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-6'
                        }`}
                        style={{ 
                          transitionDelay: isMenuHovered ? `${750 + (index * 50)}ms` : '0ms',
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
      <div className="hidden sm:block fixed top-6 md:top-8 right-6 md:right-8 z-50">
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
