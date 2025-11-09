import Navigation from "@/components/Navigation";
import ProjectDetail from "@/components/ProjectDetail";

export default function Project1() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ProjectDetail
        title="E-commerce Platform"
        category="WEB DEVELOPMENT"
        year="2024"
        role="Full Stack Developer"
        duration="3 Months"
        description={[
          "Built a modern e-commerce platform from scratch using Next.js 14 and integrated Stripe for seamless payment processing. The platform features real-time inventory management, advanced search functionality, and a responsive design that works flawlessly across all devices.",
          "Implemented server-side rendering for optimal SEO performance and utilized Next.js App Router for efficient routing and data fetching. The platform handles thousands of daily transactions with sub-second response times.",
          "Designed and developed a custom admin dashboard for managing products, orders, and customer data. Integrated analytics to track user behavior and sales metrics in real-time."
        ]}
        images={[
          "/images/pimg1.jpg",
          "/images/pimg2.jpg"
        ]}
        tech={[
          "Next.js 14",
          "TypeScript",
          "Stripe API",
          "TailwindCSS",
          "PostgreSQL",
          "Prisma",
          "Redis"
        ]}
        link="https://example.com"
      />
    </div>
  );
}
