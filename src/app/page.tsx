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
      <div className="w-full h-[4px] bg-gray-400"></div>
      <Page2 />
       <div className="w-full h-[1px] bg-gray-800 mb-4"></div>
      <Projects />
      <CircleCarousel />
      <div className="w-full h-[1px] bg-gray-800 mb-4"></div>
      <FeaturedPage />
      <div className="w-full h-[1px] bg-gray-800 my-8"></div>
      <About />
      <div className="w-full h-[1px] bg-gray-800 mt-8"></div>
      <Feature2/>
      <div className="w-full h-[1px] bg-gray-800 mt-8"></div>
      <Footer />
    </div>
  );
}
