import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import ProjectsGrid from "@/components/ProjectsGrid";
import Footer from "@/components/Footer";
import { allProjects } from "@/data/allProjects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      {/* useSearchParams (section/page filters) needs a Suspense boundary for static builds */}
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <ProjectsGrid projects={allProjects} />
      </Suspense>
      <Footer />
    </div>
  );
}
