import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Page2 from "@/components/Page2";
import Projects from "@/components/Projects";
import CircleCarousel from "@/components/CircleCarousel";
import FeaturedPage from "@/components/Features";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Feature2 from "@/components/Feature-2";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Page2 />
      <div className="w-full h-[1px] bg-white/20"></div>
      <Projects />
      <div className="w-full h-[1px] bg-white/20"></div>
      <CircleCarousel />
      <div className="w-full h-[1px] bg-white/20 my-16 sm:my-20 md:my-24"></div>
      <FeaturedPage />
      <div className="w-full h-[1px] bg-white/20 my-16 sm:my-20 md:my-24"></div>
      <About />
      <div className="w-full h-[1px] bg-white/20"></div>
      <Feature2/>
      <div className="w-full h-[1px] bg-white/20"></div>
      <Footer />
    </div>
  );
}
