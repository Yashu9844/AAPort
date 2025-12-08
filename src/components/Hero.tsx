'use client';

import Link from 'next/link';
import TechStack from './TechStack';
import { Github, Linkedin } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>

      {/* Bottom Gradient Fade to blend into next section */}
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-32 md:h-48 lg:h-64 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center md:items-center">
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-16 md:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-6 md:space-y-10">
              {/* Small Label */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 sm:w-12 h-[1px] bg-white/60"></div>
                <span className="text-[10px] sm:text-sm text-white/70 tracking-[0.25em] uppercase font-light">Creative Developer</span>
              </div>
              
              {/* Massive Name */}
              <div>
                <h1 className="text-[2.75rem] leading-[0.85] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-accent text-white font-black sm:leading-[0.9] tracking-[-0.02em]">
                  YASHAVANTH
                </h1>
                <h1 className="text-[2.75rem] leading-[0.85] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-accent text-white/40 font-black sm:leading-[0.9] tracking-[-0.02em] mt-1 sm:mt-2">
                  R SIDDESH
                </h1>
              </div>
              
              {/* Tagline */}
              <div className="max-w-2xl">
                <p className="text-sm leading-[1.4] sm:text-xl md:text-2xl lg:text-3xl text-white/80 font-light sm:leading-relaxed">
                  Transforming ideas into powerful digital solutions through
                  <span className="text-white font-normal"> innovative design</span> and
                  <span className="text-white font-normal"> clean code</span>
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="mt-1 sm:mt-3 md:mt-4">
                <Link href="/projects">
                  <button className="group relative bg-transparent text-white px-6 sm:px-10 py-3 sm:py-5 border-2 border-white transition-all duration-500 hover:bg-white hover:text-black hover:cursor-pointer overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <span className="text-[11px] sm:text-base font-medium tracking-[0.2em] uppercase">Explore Work</span>
                      <svg className="w-4 sm:w-5 h-4 sm:h-5 transform group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right Column - Stats/Info */}
            <div className="lg:col-span-4 space-y-5 sm:space-y-8 lg:space-y-10">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="space-y-1 sm:space-y-2">
                  <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">50+</div>
                  <div className="text-[10px] sm:text-sm text-white/60 tracking-wider uppercase">Projects</div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">3+</div>
                  <div className="text-[10px] sm:text-sm text-white/60 tracking-wider uppercase">Years Exp</div>
                </div>
              </div>
              
              {/* Specialization */}
              <div className="space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8">
                <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
                  <a
                    href="https://github.com/YashavanthR"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-black/60 text-white/80 hover:text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:ring-1 ring-white/20"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yashavanth-r-siddesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-black/60 text-white/80 hover:text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:ring-1 ring-white/20"
                  >
                    <Linkedin className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="https://leetcode.com/u/yashavanth_r_siddesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LeetCode"
                    className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-black/60 text-white/80 hover:text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:ring-1 ring-white/20"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 15l5-5" />
                      <path d="M12 10l5 5" />
                      <path d="M14 7h3v3" />
                      <circle cx="9" cy="12" r="5" strokeOpacity="0.6" />
                    </svg>
                  </a>
                  <div className="h-px flex-1 bg-white/20"></div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <p className="text-[10px] sm:text-xs text-white/50 tracking-widest uppercase">Specialization</p>
                  <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2">
                    <p className="text-xs sm:text-base text-white/90 leading-relaxed">Full Stack Development</p>
                    <p className="text-xs sm:text-base text-white/90 leading-relaxed">UI/UX Design</p>
                    <p className="text-xs sm:text-base text-white/90 leading-relaxed">AI/ML Engineering</p>
                    <p className="text-xs sm:text-base text-white/90 leading-relaxed">Mobile Development</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Tech Stack marquee at bottom of hero */}
      <div className="absolute left-0 right-0 z-20" style={{ bottom: '-20px' }}>
        <TechStack />
      </div>
      
      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-white/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div> */}
    </section>
  );
}
