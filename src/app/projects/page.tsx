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
      title: "AI EmpowerHub – Intelligent Student Platform",
      category: "Full Stack Web Application",
      year: "2024",
      image: "/portfolio-images-work/figma-working/empowerhome.png",
      description: "An all‑in‑one student empowerment platform combining AI‑driven career guidance, educational roadmaps, counseling resources, and mental health support.",
      fullDescription: [
        "Purpose → Address the fragmented landscape of student support by unifying career exploration, resource discovery, and mental wellness into a single, intuitive platform.",
        "Core modules → AI Career Suggester analyzes interests and knowledge to generate tailored career paths. Educational Roadmap Maker visualizes academic journeys with interactive tree diagrams. Career Guidance provides exam, scholarship, and program details. Resource Finder connects students with communities, study materials, and question banks. Mental Health Chatbot offers anonymous, confidential support conversations.",
        "Tech stack → React with Vite for fast dev cycles, TailwindCSS for responsive design, react‑spring for fluid animations, D3.js for data visualization, Headless UI for accessible components, and React Icons for consistent iconography.",
        "Experience → Every tool prioritizes immediacy: inputs trigger instant AI responses (simulated), forms are polished with smooth focus states, and navigation flows seamlessly between sections with scroll‑driven anchors."
      ],
      informationParagraphs: [
        "EmpowerHub exists because students face decision paralysis: too many paths, scattered resources, and no single place to plan, explore, and seek support. This platform reduces friction by presenting everything—career suggestions, educational planning, counseling info, mental health chat—in one cohesive interface.",
        "What makes it distinct is the balance between functionality and empathy. The AI Career Suggester doesn't just list jobs—it explains why each field matters. The Mental Health Chatbot ensures anonymity and safety, addressing real student concerns. The Resource Finder surfaces communities and materials that are often hidden across the web.",
        "Architecturally, the project favors component reusability and smooth interactions: gradient buttons, polished input boxes, and suggestion cards are modular and consistent. Mock data demonstrates scalability, while animations via react‑spring and D3 keep the experience engaging without sacrificing clarity."
      ],
      tech: ["React", "Vite", "TypeScript", "TailwindCSS", "react-spring", "D3.js", "Headless UI", "React Icons", "Framer Motion"],
      role: "Full Stack Developer",
      duration: "2 months",
      github: "https://github.com/Yashu9844/EmpowerHub",
      live: "https://empower-hub-deployed-version.vercel.app/",
      domains: ["Full Stack", "AI/ML", "Product"],
      link: "#",
      credits: [
        { role: "Product & Engineering", name: "Yashavanth R Siddesh" }
      ],
      mediaSections: [
        {
          items: [
            { type: "image" as const, url: "/portfolio-images-work/figma-working/empowerhome.png" }
          ],
          layout: "single" as const
        },

        {
          items: [
            { type: "image" as const, url: "/portfolio-images-work/figma-working/empowerhub2.png" },
            { type: "image" as const, url: "/portfolio-images-work/figma-working/empowerhub3.png" }
          ],
          layout: "grid-2" as const
        }
      ],
      relatedProjects: [1, 2]
    },
    {
      id: 4,
      title: "AI Image Editor – Smart Editing SaaS",
      category: "Full Stack SaaS Application",
      year: "2024",
      image: "/portfolio-images-work/figma-working/aiedithome1.png",
      description: "AI‑powered image editing platform with intelligent background removal, smart upscaling, and object‑focused cropping built on the T3 Stack.",
      fullDescription: [
        "Vision → Eliminate hours of manual editing with instant AI transformations. Designers, e‑commerce owners, and creators need fast, professional‑grade tools without the complexity.",
        "AI capabilities → One‑click background removal using advanced computer vision. Smart upscaling that enhances resolution without artifacts. Object‑focused cropping with automatic subject detection. All processing happens in seconds, not minutes.",
        "Architecture → Built on T3 Stack: Next.js 15 with App Router and React Server Components for optimal performance. Prisma ORM with PostgreSQL for transactional data integrity. tRPC for end‑to‑end type safety across API boundaries. Better Auth for secure OAuth flows. ImageKit for optimized delivery and transformations.",
        "User flow → Credit‑based system with free tier (10 credits). Drag‑and‑drop upload supporting JPG, PNG, WebP. Choose AI tool, process instantly, download high‑quality results. Dashboard tracks usage, history, and remaining credits."
      ],
      informationParagraphs: [
        "This SaaS exists to democratize professional image editing. What once required expensive software and expertise is now accessible through simple clicks. The AI handles complexity—users focus on results.",
        "Technical decisions prioritize reliability and speed: typed APIs prevent runtime errors, Prisma migrations ensure schema consistency, ImageKit CDN guarantees global availability, and Better Auth secures user sessions with industry standards.",
        "The credit system balances accessibility with sustainability: free users get meaningful trials, processing costs are transparent, and upgrades unlock unlimited creativity. Every interaction is measured, cached, and optimized for sub‑2s perceived latency."
      ],
      tech: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "Better Auth", "ImageKit", "TailwindCSS", "Zod", "Lucide Icons"],
      role: "Full Stack Developer",
      duration: "2 months",
      github: "https://github.com/Yashu9844/AI-IMAGE-EDITOR",
      live: "https://ai-image-editor-deployed.vercel.app/",
      domains: ["Full Stack", "AI/ML", "SaaS"],
      link: "#",
      credits: [
        { role: "Product & Engineering", name: "Yashavanth R Siddesh" }
      ],
      mediaSections: [
        {
          items: [
            { type: "image" as const, url: "/portfolio-images-work/figma-working/aiedithome1.png" },
            { type: "image" as const, url: "/portfolio-images-work/figma-working/aiedit1.png" },
            { type: "image" as const, url: "/portfolio-images-work/figma-working/aiedit2.png" }
          ],
          layout: "grid-3" as const
        },
        {
          items: [
            { type: "image" as const, url: "/portfolio-images-work/figma-working/aiedit3.png" }
          ],
          layout: "single" as const
        },

      ],
      relatedProjects: [1, 3]
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
