import Navigation from "@/components/Navigation";
import ProjectsGrid from "@/components/ProjectsGrid";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web Development",
      year: "2024",
      image: "/images/pimg1.jpg",
      description: "A modern e-commerce platform built with Next.js and Stripe integration for seamless checkout experiences.",
      tech: ["Next.js", "TypeScript", "Stripe", "TailwindCSS"],
      link: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      category: "Mobile & Web",
      year: "2024",
      image: "/images/pimg3.jpg",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      tech: ["React", "Firebase", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      id: 3,
      title: "API Dashboard",
      category: "SaaS Product",
      year: "2023",
      image: "/images/pimg5.jpg",
      description: "Analytics dashboard for API monitoring with real-time metrics and performance tracking.",
      tech: ["Vue.js", "GraphQL", "PostgreSQL", "Redis"],
      link: "#"
    },
    {
      id: 4,
      title: "Portfolio Website",
      category: "Web Design",
      year: "2023",
      image: "/images/pimg7.jpg",
      description: "Creative portfolio showcasing interactive animations and modern web design principles.",
      tech: ["Next.js", "Framer Motion", "GSAP", "Three.js"],
      link: "#"
    },
    {
      id: 5,
      title: "Mobile Banking App",
      category: "Mobile App",
      year: "2024",
      image: "/images/pimg9.jpg",
      description: "Secure mobile banking application with biometric authentication and instant transfers.",
      tech: ["React Native", "TypeScript", "AWS", "Plaid"],
      link: "#"
    },
    {
      id: 6,
      title: "Social Media Analytics",
      category: "Data Analytics",
      year: "2023",
      image: "/images/pimg11.jpg",
      description: "Comprehensive analytics platform for social media insights and engagement tracking.",
      tech: ["Python", "Django", "D3.js", "PostgreSQL"],
      link: "#"
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ProjectsGrid projects={projects} />
    </div>
  );
}
