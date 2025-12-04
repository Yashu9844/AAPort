import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Page2 from "@/components/Page2";
import Projects from "@/components/Projects";
import CircleCarousel from "@/components/CircleCarousel";
import FeaturedPage from "@/components/Features";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Feature2 from "@/components/Feature-2";
import Contact from "@/components/Contact";
import SmoothScroll from "@/components/SmoothScroll";
import PremiumTechStack from "@/components/PremiumTechStack";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <SmoothScroll />
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      {/* Intro Section */}
      <div className="py-12 sm:py-20 md:py-28 lg:py-32">
        <Page2 />
      </div>
      
      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      {/* Projects Section */}
      <div id="projects" className="py-12 sm:py-20 md:py-28 lg:py-32">
        <Projects />
      </div>
      
      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      {/* Carousel Section */}
      <div id="testimonials" className="py-12 sm:py-20 md:py-28 lg:py-32">
        <CircleCarousel />
      </div>
      
      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      {/* Featured Section */}
      <div id="featured" className="py-12 sm:py-20 md:py-28 lg:py-32">
        <FeaturedPage />
      </div>
      
      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      {/* About Section */}
      <div className="py-12 sm:py-20 md:py-28 lg:py-32">
        <About />
      </div>
      
      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      {/* Feature 2 Section */}
      <div id="approach" className="py-12 sm:py-20 md:py-28 lg:py-32">
        <Feature2 />
      </div>
      
      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      {/* Premium Tech Stack Section */}
      <PremiumTechStack />
      
      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
