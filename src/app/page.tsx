import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Page2 from "@/components/Page2";
import Projects from "@/components/Projects";
import FeaturedPage from "@/components/Features";
export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Page2 />
       <div className="w-full h-[1px] bg-gray-800 mb-4"></div>
      <Projects />
      <FeaturedPage />
    </div>
  );
}