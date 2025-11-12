'use client';

import Link from 'next/link';
import TechStack from './TechStack';

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
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 md:h-56 lg:h-64 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-10 md:space-y-12">
              {/* Small Label */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-white/60"></div>
                <span className="text-xs sm:text-sm text-white/70 tracking-[0.25em] uppercase font-light">Creative Developer</span>
              </div>
              
              {/* Massive Name */}
              <div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-accent text-white font-black leading-[0.9] tracking-[-0.02em]">
                  YASHAVANTH
                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-accent text-white/40 font-black leading-[0.9] tracking-[-0.02em] mt-2">
                  R SIDDESH
                </h1>
              </div>
              
              {/* Tagline */}
              <div className="max-w-2xl">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed">
                  Transforming ideas into powerful digital solutions through
                  <span className="text-white font-normal"> innovative design</span> and
                  <span className="text-white font-normal"> clean code</span>
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="pt-4">
                <Link href="/projects">
                  <button className="group relative bg-transparent text-white px-8 sm:px-10 py-4 sm:py-5 border-2 border-white transition-all duration-500 hover:bg-white hover:text-black overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase">Explore Work</span>
                      <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right Column - Stats/Info */}
            <div className="lg:col-span-4 space-y-8 lg:space-y-10">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">50+</div>
                  <div className="text-xs sm:text-sm text-white/60 tracking-wider uppercase">Projects</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">3+</div>
                  <div className="text-xs sm:text-sm text-white/60 tracking-wider uppercase">Years Exp</div>
                </div>
              </div>
              
              {/* Specialization */}
              <div className="space-y-4">
                <div className="h-[1px] bg-white/20"></div>
                <div className="space-y-2">
                  <p className="text-xs text-white/50 tracking-widest uppercase">Specialization</p>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    Full Stack Development<br/>
                    UI/UX Design<br/>
                    Web Applications
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Tech Stack at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
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
