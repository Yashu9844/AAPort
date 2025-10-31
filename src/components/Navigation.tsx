'use client';

import { useState } from 'react';
import EyeFollower from './EyeFollower';

export default function Navigation() {
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  return (
    <>
      {/* Center Menu Strip */}
      <nav className="fixed top-6 sm:top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className="relative"
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          {/* Main Menu Strip */}
          <div className="bg-black/30 backdrop-blur-md rounded-full border border-white/10 px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 flex items-center justify-between w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-xl">
            <span className="text-white text-sm sm:text-base md:text-lg font-light tracking-wider">MENU</span>
            
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Eye Follower */}
              <EyeFollower />
              
              {/* Hamburger Icon */}
              <div className="flex flex-col space-y-1 sm:space-y-1.5 pointer-events-auto">
                <div className="w-5 sm:w-6 md:w-6 h-0.5 bg-white rounded-full"></div>
                <div className="w-5 sm:w-6 md:w-6 h-0.5 bg-white rounded-full"></div>
                <div className="w-5 sm:w-6 md:w-6 h-0.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Dropdown Menu - Extended hover area */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 pt-12 sm:pt-14 transition-all duration-500 ease-out origin-top z-40 ${
            isMenuHovered 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 -translate-y-6 pointer-events-none'
          }`}>
            <div className="bg-black/50 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-xl max-h-[60vh] overflow-y-auto scrollbar-hidden smooth-scroll">
              <div className="p-4 sm:p-6 md:p-8 lg:p-10">
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
                
                {/* Contact Button */}
                <button className={`group w-full bg-white/15 backdrop-blur-sm text-white py-2 sm:py-3 rounded-full border border-white/30 text-xs sm:text-sm md:text-base font-accent transition-all duration-200 ${
                  isMenuHovered 
                    ? 'opacity-100 translate-y-0 delay-[1050ms]' 
                    : 'opacity-0 translate-y-6'
                }`}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
                  e.target.style.transition = 'all 0.15s ease-out';
                  const span = e.target.querySelector('span');
                  if (span) {
                    span.style.letterSpacing = '0.2em';
                    span.style.transition = 'letter-spacing 0.15s ease-out';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transition = 'all 0.15s ease-out';
                  const span = e.target.querySelector('span');
                  if (span) {
                    span.style.letterSpacing = '0.1em';
                    span.style.transition = 'letter-spacing 0.15s ease-out';
                  }
                }}>
                  <span className="tracking-wider">CONTACT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Download Resume Button - Top Right */}
      <div className="fixed top-8 right-8 z-50">
        <button className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 transition-all duration-300 hover:bg-black/40">
          <span className="text-sm font-light tracking-wider">Download Resume</span>
        </button>
      </div>
    </>
  );
}
