'use client';

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
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Bottom Gradient Fade to blend into next section */}
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 md:h-56 lg:h-64 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6">
          <div className="max-w-none">
            {/* Main Content */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-accent text-white font-bold leading-none">
                Zubair Mallik
              </h1>
              
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 font-light font-normal tracking-wide">
                  Full Stack Developer
                </p>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 font-light tracking-wide max-w-2xl">
                  Create solutions and code that work in real world
                </p>
              </div>
              
              <div className="pt-3 sm:pt-4 md:pt-6">
                <button className="group bg-black/20 backdrop-blur-md text-white font-light px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full border border-white/10 transition-all duration-300 hover:bg-black/30 shadow-xl">
                  <span className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-xs sm:text-sm md:text-base font-medium">View My Work</span>
                    <svg 
                      className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
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
