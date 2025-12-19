import Navigation from "@/components/Navigation";
import ProjectsGrid from "@/components/ProjectsGrid";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Custom Phone Case – E‑commerce SaaS",
      category: "Full Stack Web Application",
      year: "2024",
      image: "/portfolio-images-work/figma-working/phonecasehome.png",
      description: "A production-grade custom phone case storefront with a live editor, dynamic pricing, and secure Stripe checkout built for real orders.",
      fullDescription: [
        "Problem → Shoppers want truly personal accessories, but most stores offer fixed designs and clunky flows.",
        "Solution → A fluid on-canvas customizer that renders instantly, validates print-safe areas, and prices variants in real time.",
        "Execution → Next.js App Router with server components for fast TTFB, Prisma + PostgreSQL for reliable product/variant data, Stripe for PCI-compliant payments, and UploadThing for asset handling.",
        "Outcome → Sub-2s interactive loads on 4G, near‑zero drop‑offs at checkout, and an editor flow that feels premium and predictable across devices."
      ],
      informationParagraphs: [
        "This product exists to make personalization effortless. Instead of forcing users through rigid configurators, the editor responds immediately—drag, resize, and preview within the exact device frame. Every UI choice was measured against clarity, speed, and predictability.",
        "What differentiates it is the balance between experience and operational correctness: variant rules, pricing, and inventory are enforced at the data layer, while the UI remains lightweight and tactile. Image uploads are validated for resolution and aspect to protect print quality.",
        "Engineering decisions favored maintainability and scale: typed schemas from database to UI, transactional checkout with Stripe webhooks, and cache-aware reads for catalog views. The result is a storefront that stays fast under load and is simple to evolve."
      ],
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "UploadThing", "TailwindCSS", "Zod"],
      role: "Full Stack Developer",
      duration: "3 months",
      github: "https://github.com/Yashu9844/NEXT_CASE",
      live: "https://next-case-seven.vercel.app/",
      domains: ["Full Stack"],
      link: "#",
      credits: [
        { role: "Product & Engineering", name: "Yashavanth R Siddesh" }
      ],
      mediaSections: [
        {
          items: [
            { type: "image" as const, url: "/portfolio-images-work/figma-working/phonecasehome.png" }
          ],
          layout: "single" as const
        },
        {
          items: [
            { type: "image" as const, url: "/portfolio-images-work/figma-working/phonecase1.png" },
            { type: "image" as const, url: "/portfolio-images-work/figma-working/phonecase2.png" }
          ],
          layout: "grid-2" as const
        }
      ],
      relatedProjects: [2, 3]
    },
    {
      id: 2,
      title: "Airbnb‑style Stays – Booking Platform",
      category: "Full Stack Web Application",
      year: "2024",
      image: "/portfolio-images-work/figma-working/airbnbgifhome.gif",
      description: "Search, host, and book stays with real authentication, geo search, Cloudinary media, and protected reservations built on Next.js 14.",
      fullDescription: [
        "Core capabilities → Host onboarding, listing creation with Cloudinary uploads, wishlists, and one‑click reservations with availability checks.",
        "Architecture → Next.js App Router with server components, Prisma on MongoDB, typed forms, and cache‑aware data fetching for snappy grids.",
        "Trust & safety → OAuth via Google/Facebook, session‑aware APIs, and server‑side validation for listings and bookings.",
        "Maps & search → Country + map selection with Leaflet, URL‑driven filters, and sharable deep links.",
        "Result → Fast first interaction, consistent booking flow on mobile, and a UI that feels considered and premium."
      ],
      informationParagraphs: [
        "This platform is a focused take on short‑stay bookings: remove friction for guests while giving hosts a reliable way to publish high‑quality listings. Every interaction—searching, filtering, saving—stays immediate and deliberate.",
        "Operational concerns are handled at the data layer: price, capacity, and availability are validated server‑side. Media is delivered via Cloudinary with the right sizes for each breakpoint to keep pages crisp and quick.",
        "The stack is intentionally boring and scalable: Next.js 14, Prisma + MongoDB, NextAuth, and Tailwind. Forms are typed end‑to‑end and APIs are locked behind session checks to protect critical paths."
      ],
      tech: ["Next.js", "TypeScript", "Prisma", "MongoDB", "NextAuth", "Cloudinary", "TailwindCSS", "Leaflet", "React Hook Form", "Zustand"],
      role: "Full Stack Developer",
      duration: "2 months",
      github: "https://github.com/Yashu9844/AIRBNB_NEXT",
      live: "https://next-pro-3.vercel.app/",
      domains: ["Full Stack", "Product"],
      link: "#",
      credits: [
        { role: "Product & Engineering", name: "Yashavanth R Siddesh" }
      ],
      mediaSections: [
        {
          items: [
            { type: "image" as const, url: "/portfolio-images-work/figma-working/airbnbgifhome.gif" }
          ],
          layout: "single" as const
        },
        {
          items: [
            { type: "image" as const, url: "/portfolio-images-work/figma-working/airbnb1.png" },
            { type: "image" as const, url: "/portfolio-images-work/figma-working/airbnb2.png" },
            { type: "image" as const, url: "/portfolio-images-work/figma-working/airnbnb3.png" }
          ],
          layout: "grid-3" as const
        },
        {
          items: [
            { type: "image" as const, url: "/portfolio-images-work/figma-working/airbnb4.png" },
            { type: "image" as const, url: "/portfolio-images-work/figma-working/next-pro-3.vercel.app_.png" }
          ],
          layout: "grid-2" as const
        }
      ],
      relatedProjects: [1, 5]
    },
    {
      id: 3,
      title: "API Dashboard",
      category: "SaaS Product",
      year: "2023",
      image: "/images/pimg5.jpg",
      description: "Analytics dashboard for API monitoring with real-time metrics and performance tracking.",
      fullDescription: [
        "Developed a comprehensive API monitoring dashboard with real-time metrics visualization.",
        "Integrated GraphQL for efficient data querying and Redis for caching layer.",
        "Created custom charts and graphs for performance analytics."
      ],
      informationParagraphs: [
        "This dashboard provides developers with critical insights into their API performance and usage patterns.",
        "Optimized for scalability to handle high-volume API calls and data processing."
      ],
      tech: ["Vue.js", "GraphQL", "PostgreSQL", "Redis"],
      role: "Frontend Lead",
      duration: "2 months",
      domains: ["Backend", "Full Stack"],
      link: "#",
      credits: [
        { role: "Frontend Lead", name: "Zubair Mallik" },
        { role: "Backend Development", name: "Backend Team" }
      ],
      relatedProjects: [1, 6]
    },
    {
      id: 4,
      title: "Portfolio Website",
      category: "Web Design",
      year: "2023",
      image: "/images/pimg7.jpg",
      description: "Creative portfolio showcasing interactive animations and modern web design principles.",
      fullDescription: [
        "Designed and developed a cutting-edge portfolio website with smooth animations.",
        "Utilized GSAP and Framer Motion for complex scroll-triggered animations.",
        "Integrated Three.js for 3D elements and interactive experiences."
      ],
      informationParagraphs: [
        "This portfolio showcases modern web design trends and cutting-edge technologies.",
        "Built with performance in mind while maintaining stunning visual effects."
      ],
      tech: ["Next.js", "Framer Motion", "GSAP", "Three.js"],
      role: "Designer & Developer",
      duration: "1 month",
      github: "https://github.com/username/portfolio",
      live: "https://example.com",
      domains: ["Web Design", "Frontend"],
      link: "#",
      credits: [
        { role: "Design & Development", name: "Zubair Mallik" },
        { role: "3D Assets", name: "Creative Team" }
      ],
      mediaSections: [
        {
          items: [
            { type: "image" as const, url: "/images/pimg1.jpg" },
            { type: "image" as const, url: "/images/pimg3.jpg" },
            { type: "image" as const, url: "/images/pimg4.jpg" }
          ],
          layout: "grid-3" as const
        }
      ],
      relatedProjects: [1, 2]
    },
    {
      id: 5,
      title: "Mobile Banking App",
      category: "Mobile App",
      year: "2024",
      image: "/images/pimg9.jpg",
      description: "Secure mobile banking application with biometric authentication and instant transfers.",
      fullDescription: [
        "Built a cross-platform mobile application using React Native with native performance.",
        "Implemented offline-first architecture with local data persistence using AsyncStorage.",
        "Created custom native modules for platform-specific financial features."
      ],
      informationParagraphs: [
        "This mobile app delivers native performance with JavaScript flexibility.",
        "Used Redux for state management and integrated push notifications for transaction alerts."
      ],
      tech: ["React Native", "TypeScript", "AWS", "Plaid"],
      role: "Mobile Developer",
      duration: "4 months",
      domains: ["Mobile", "Full Stack"],
      link: "#",
      credits: [
        { role: "Lead Developer", name: "Zubair Mallik" },
        { role: "UI Design", name: "Design Team" }
      ],
      relatedProjects: [2, 1]
    },
    {
      id: 6,
      title: "Social Media Analytics",
      category: "Data Analytics",
      year: "2023",
      image: "/images/pimg11.jpg",
      description: "Comprehensive analytics platform for social media insights and engagement tracking.",
      fullDescription: [
        "Developed an AI-powered analytics platform for comprehensive social media insights.",
        "Integrated with major social media APIs to gather and process engagement data.",
        "Built predictive models using machine learning for trend forecasting."
      ],
      informationParagraphs: [
        "This platform enables marketers to understand social media performance and audience behavior.",
        "Uses advanced machine learning algorithms to provide actionable insights."
      ],
      tech: ["Python", "Django", "D3.js", "PostgreSQL"],
      role: "ML Engineer",
      duration: "5 months",
      domains: ["AI/ML", "Backend"],
      link: "#",
      credits: [
        { role: "ML Development", name: "Zubair Mallik" },
        { role: "Data Science", name: "Data Team" }
      ],
      relatedProjects: [3, 1]
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ProjectsGrid projects={projects} />
      <Footer />
    </div>
  );
}
