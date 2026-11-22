export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  fullDescription?: string[];
  informationParagraphs?: string[];
  tech: string[];
  domains?: string[];
  link: string;
  role?: string;
  duration?: string;
  github?: string;
  live?: string;
  credits?: Array<{ role: string; name: string }>;
  mediaSections?: Array<{
    items: Array<{ type: 'image' | 'video'; url: string }>;
    layout: 'grid-2' | 'grid-3' | 'single' | 'continuous';
  }>;
  relatedProjects?: number[];
}

export const allProjects: Project[] = [
  // ===== CURRENT WORK (from resume) =====
  {
    id: 51,
    image: '/projects/crewforge/chat-with-screen.webp',
    title: 'CrewForge – Multi‑Agent AI Workspace',
    category: 'Agentic AI Platform',
    year: '2026',
    description: 'A multi‑agent AI workspace where every bot gets its own always‑available cloud computer: a full Linux desktop it can browse, code and click around in, with memory that persists across chats.',
    fullDescription: [
      'Idea → Like having your own Grok or ChatGPT, except every bot also gets its own computer. You create bots with a persona, goals and instructions, then chat with them one‑on‑one or in group chats where they collaborate and hand work to each other.',
      'Its own computer → Every bot owns a dedicated Daytona cloud sandbox: a full Linux desktop with a browser, terminal and file system. The bot drives it with 11 tools (shell commands, file read/write/list, mouse click/move/scroll, keyboard typing and screenshots), and you can watch it work live in a noVNC panel next to the chat.',
      'Always available, never billed while idle → The sandbox belongs to the bot permanently, but it auto‑stops after 5 quiet minutes and archives after a day. The next message wakes it automatically with every file and memory intact, so bots feel always‑on while costing nothing when nobody is talking to them.',
      'Durable agent loop → Each reply runs as a Trigger.dev task with the Vercel AI SDK: token streaming, function calling, a 30‑step cap and a token‑budget stop condition. Runs survive restarts and retry on failure instead of dying with a web request.',
      'Business → Clerk‑gated Free and Pro plans ($20/month: 25 bots, 2M AI tokens, 20 sandbox hours). Every model call is written to a usage ledger, and a per‑minute cron meters each running sandbox from Daytona\'s own state, all in Neon Postgres via Drizzle ORM.'
    ],
    informationParagraphs: [
      'Memory → A bot remembers nothing between chats on its own, so it keeps notes in a MEMORY.md file on its computer. Because all of a bot\'s chats share one sandbox, what you tell it in a private chat it can recall later in a group chat.',
      'Handoffs → In a group only one bot works at a time. A bot can pass the latest message to a better‑suited peer with a short note explaining why. A message can\'t go back to a bot that already held it and the number of handoffs per message is capped, so bots can\'t bounce work around in a loop.',
      'Isolation → Bots can\'t see or touch each other\'s files, screens or programs. Collaboration happens only through the conversation and explicit handoffs.'
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Vercel AI SDK', 'Trigger.dev', 'Daytona', 'noVNC', 'DeepSeek', 'OpenRouter', 'Clerk', 'Neon Postgres', 'Drizzle ORM'],
    role: 'Solo Founder & Engineer',
    duration: 'Ongoing',
    github: 'https://github.com/Yashu9844/AI_bot_temmate',
    live: 'https://ai-bot-temmate.vercel.app',
    credits: [
      { role: 'Product & Engineering', name: 'Yashavanth R Siddesh' }
    ],
    domains: ["AI/ML", "Full Stack", "SaaS"],
    link: "#",
    mediaSections: [
      { items: [{ type: 'image' as const, url: '/projects/crewforge/chat-with-screen.webp' }], layout: 'single' as const },
      { items: [{ type: 'image' as const, url: '/projects/crewforge/bot-desktop-terminal.webp' }, { type: 'image' as const, url: '/projects/crewforge/bot-desktop-files.webp' }], layout: 'grid-2' as const },
      { items: [{ type: 'image' as const, url: '/projects/crewforge/chat-computer-use.webp' }, { type: 'image' as const, url: '/projects/crewforge/home.webp' }], layout: 'grid-2' as const },
      { items: [{ type: 'image' as const, url: '/projects/crewforge/usage.webp' }, { type: 'image' as const, url: '/projects/crewforge/pricing.webp' }], layout: 'grid-2' as const }
    ],
    relatedProjects: [52, 4]
  },
  {
    id: 52,
    image: '/projects/dats.svg',
    title: 'DATS – Digital Array Telemetry System',
    category: 'Distributed Systems · Ground Station',
    year: '2026',
    description: 'A ground‑station platform spanning RF reception to operator dashboards: CCSDS telemetry processing, native RF decoding, and GPU‑accelerated tracking of 70+ satellites.',
    fullDescription: [
      'Scope → Modular platform design covering the full ground‑station mission workflow, from RF reception through decoding and storage to real‑time operator dashboards.',
      'Telemetry pipeline → CCSDS‑compliant processing covering packet decoding, XTCE decoding, engineering‑unit conversion, alarm generation, and telemetry storage.',
      'RF processing → A native C++20 service implementing Reed–Solomon and Viterbi decoding, frame synchronization, packet reconstruction, and carrier recovery.',
      'Architecture → Event‑driven backend on RabbitMQ, Redis, gRPC, and WebSockets for real‑time ingestion and subsystem communication, designed for SDR integration, GPU‑accelerated processing, and tracking of 70+ satellites.'
    ],
    informationParagraphs: [
      'DATS is built around clear service boundaries: RF and decoding services do the heavy signal work in native code, while ingestion, alarms, and archival communicate over a message bus so each subsystem can scale and fail independently.',
      'Screenshots and source are not public for this professional work; the cover art is illustrative.'
    ],
    tech: ['Rust', 'C++20', 'CUDA', 'Next.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'gRPC', 'WebSockets'],
    role: 'Platform Design & Engineering Lead',
    duration: 'Ongoing',
    credits: [
      { role: 'Architecture & Engineering', name: 'Yashavanth R Siddesh' }
    ],
    domains: ["Distributed Systems", "Real-Time"],
    link: "#",
    mediaSections: [],
    relatedProjects: [53, 51]
  },
  {
    id: 53,
    image: '/projects/tracking.svg',
    title: 'Distributed Surveillance & Space Object Tracking',
    category: 'Distributed Systems · Real‑Time',
    year: '2025',
    description: 'A distributed tracking system designed for 30,000+ simultaneously tracked objects, with a drone mission‑planning and control backend for low‑latency operator workflows.',
    fullDescription: [
      'Scale → Architected to support 30,000+ simultaneously tracked moving objects through continuous real‑time data streams.',
      'Drone control → A distributed mission planning and control backend using MAVLink, Redis, Django Channels, and WebSockets for real‑time command execution and telemetry streaming.',
      'Operator experience → Interfaces for live drone monitoring, mission planning, and remote command execution, enabling low‑latency control workflows.',
      'Visualization → Interactive views for live trajectory tracking and telemetry insights.'
    ],
    informationParagraphs: [
      'Developed under NDA. Source code and screens cannot be shared; the cover art is illustrative.'
    ],
    tech: ['Django', 'Django Channels', 'React', 'Zustand', 'Redis', 'RabbitMQ', 'WebSockets', 'MAVLink', 'CUDA'],
    role: 'Software Engineer',
    duration: 'Under NDA',
    credits: [
      { role: 'Engineering', name: 'Yashavanth R Siddesh' }
    ],
    domains: ["Distributed Systems", "Real-Time"],
    link: "#",
    mediaSections: [],
    relatedProjects: [52, 51]
  
  },
  // ===== RECENT BUILDS =====
  {
    id: 54,
    title: "JAAS – Multi‑Tenant Company OS",
    category: "Full Stack SaaS Platform",
    year: "2026",
    image: "/projects/ajaas.svg",
    description: "A multi‑tenant SaaS operating system for companies: identity and access plus 12 product modules, with a Go backend and a Next.js frontend.",
    fullDescription: [
      "Scope → Identity & access core plus 12 modules: HR management, projects & tasks, meetings, assets & inventory, finance, reports & analytics, approvals, documents, AI assistant, notifications, a company knowledge base, and settings.",
      "Backend → Go with Gin, GORM/pgx on PostgreSQL, Redis, and RabbitMQ for asynchronous work across modules.",
      "Frontend → Next.js, React, and TypeScript, with a verification console for exercising every feature by hand.",
      "Engineering → Documentation‑driven: an architecture authority, per‑module status, security rules, a generated system reference, and an autonomous agent workflow for development."
    ],
    tech: ["Go", "Gin", "PostgreSQL", "Redis", "RabbitMQ", "Next.js", "React", "TypeScript", "Docker"],
    role: "Full Stack Developer",
    github: "https://github.com/Yashu9844/AJAAS",
    domains: ["Full Stack", "SaaS"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [{ items: [{ type: "image" as const, url: "/projects/ajaas.svg" }], layout: "single" as const }],
    relatedProjects: [51, 52]
  },
  {
    id: 55,
    title: "AI Instagram Marketing Automation",
    category: "AI Automation",
    year: "2026",
    image: "/projects/autoinsta.svg",
    description: "An n8n + AI pipeline that turns multi‑day content plans into brand‑consistent, quality‑checked Instagram posts every morning for an education institute.",
    fullDescription: [
      "Problem → Posting consistent, on‑brand content every day takes a marketing team hours of writing, design, and review.",
      "Pipeline → At 09:00 IST n8n resolves the day's plan, an LLM writes the content, a creative‑director prompt shapes the visual, an image model generates it, and a deterministic overlay adds the logo.",
      "Quality → A vision model checks every image against brand rules; failures are regenerated automatically before an approval or auto‑publish step.",
      "Infrastructure → Plans and brand rules live in Git (plan, brand, courses, rules), assets are stored in MinIO, and the whole system ships with Docker."
    ],
    tech: ["n8n", "Python", "TypeScript", "LLMs", "Image Generation", "Vision Models", "Instagram Graph API", "MinIO", "Docker"],
    role: "AI Engineer",
    github: "https://github.com/Yashu9844/Auto_insta",
    domains: ["AI/ML", "Automation"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [{ items: [{ type: "image" as const, url: "/projects/autoinsta.svg" }], layout: "single" as const }],
    relatedProjects: [51, 54]
  },
  {
    id: 56,
    title: "SYSTEM – Evidence‑Based Leveling App",
    category: "Product · Frontend",
    year: "2026",
    image: "/projects/system.svg",
    description: "A game‑style personal growth app where level measures effort but rank measures real‑world evidence, so the numbers can't flatter you.",
    fullDescription: [
      "Idea → Most habit trackers let you level up while nothing in your life changes. SYSTEM separates the two: XP and level reward effort, while rank can only rise with external evidence.",
      "Product → Built from a written product‑discovery pass: strategy, behavioral evidence, game systems and XP formulas, data model, risks, and a 120‑day experiment protocol.",
      "Engineering → React + Vite with Zustand state and Dexie (IndexedDB) for an offline‑first PWA, Framer Motion for the interface, and Vitest + Playwright tests."
    ],
    tech: ["React", "TypeScript", "Vite", "Zustand", "Dexie", "PWA", "Framer Motion", "Vitest", "Playwright"],
    role: "Product & Engineering",
    github: "https://github.com/Yashu9844/Solo_Leveling_Ev",
    live: "https://solo-leveling-ev.vercel.app",
    domains: ["Frontend", "Product"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [{ items: [{ type: "image" as const, url: "/projects/system.svg" }], layout: "single" as const }],
    relatedProjects: [51, 55]
  },
  {
    id: 57,
    title: "Sri Sai Baba Tool Rental – Shop Operations App",
    category: "Full Stack · Mobile",
    year: "2026",
    image: "/projects/toolrental.jpg",
    description: "A mobile‑first operations and point‑of‑sale app for a real tool‑rental shop: inventory, rentals, returns, and payments from a phone, shipped to Android with Capacitor.",
    fullDescription: [
      "Client → Built for Sri Sai Baba Tool Rentals so staff can run the shop counter from a phone or tablet without losing track of tools or money.",
      "Workflow → Inventory of tool models and individual units, customers, rentals with deposits and payment methods, returns, overdue flags, and an activity log of every change.",
      "Engineering → Next.js with Prisma, Cloudinary for tool photos, and Zustand; packaged as an Android app via Capacitor with on‑device SQLite."
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "Cloudinary", "Zustand", "Capacitor", "SQLite", "Android"],
    role: "Freelance Full Stack Developer",
    github: "https://github.com/Yashu9844/Adesai",
    live: "https://srisaibabastore.vercel.app",
    domains: ["Full Stack", "Mobile"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [{ items: [{ type: "image" as const, url: "/projects/toolrental.jpg" }], layout: "single" as const }],
    relatedProjects: [54, 58]
  },
  {
    id: 58,
    title: "Agency Website – Design‑Led Web Experiences",
    category: "Frontend Web Development",
    year: "2026",
    image: "/projects/adesign.svg",
    description: "A design‑led website for a web studio serving founders and modern brands, built around motion, smooth scrolling, and performance.",
    fullDescription: [
      "Goal → Present a studio that designs and builds premium web experiences, with clarity, performance, and long‑term value as the message.",
      "Execution → Next.js with GSAP and Lenis for scroll‑driven motion, Framer Motion for interactions, and Tailwind CSS, with documented wireframes and light‑mode strategy."
    ],
    tech: ["Next.js", "TypeScript", "GSAP", "Lenis", "Framer Motion", "TailwindCSS"],
    role: "Design & Frontend",
    github: "https://github.com/Yashu9844/Adesign",
    live: "https://adesign-beta.vercel.app",
    domains: ["Frontend"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [{ items: [{ type: "image" as const, url: "/projects/adesign.svg" }], layout: "single" as const }],
    relatedProjects: [57, 56]
  },
  // ===== FEATURED PROJECTS (already on home page, also shown here) =====
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
      "This product exists to make personalization effortless. Instead of forcing users through rigid configurators, the editor responds immediately—drag, resize, and preview within the exact device frame.",
      "Engineering decisions favored maintainability and scale: typed schemas from database to UI, transactional checkout with Stripe webhooks, and cache-aware reads for catalog views."
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "UploadThing", "TailwindCSS", "Zod"],
    role: "Full Stack Developer",
    duration: "3 months",
    github: "https://github.com/Yashu9844/NEXT_CASE",
    live: "https://next-case-seven.vercel.app/",
    domains: ["Full Stack", "E-Commerce"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [
      { items: [{ type: "image" as const, url: "/portfolio-images-work/figma-working/phonecasehome.png" }], layout: "single" as const },
      { items: [{ type: "image" as const, url: "/portfolio-images-work/figma-working/phonecase1.png" }, { type: "image" as const, url: "/portfolio-images-work/figma-working/phonecase2.png" }], layout: "grid-2" as const }
    ],
    relatedProjects: [2, 4]
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
      "Maps & search → Country + map selection with Leaflet, URL‑driven filters, and sharable deep links."
    ],
    informationParagraphs: [
      "This platform is a focused take on short‑stay bookings: remove friction for guests while giving hosts a reliable way to publish high‑quality listings.",
      "The stack is intentionally boring and scalable: Next.js 14, Prisma + MongoDB, NextAuth, and Tailwind."
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "MongoDB", "NextAuth", "Cloudinary", "TailwindCSS", "Leaflet", "Zustand"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/AIRBNB_NEXT",
    // live: "https://next-pro-3.vercel.app/", // returned HTTP 500 on 2026-10-24; restore once fixed
    domains: ["Full Stack", "Product"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [
      { items: [{ type: "image" as const, url: "/portfolio-images-work/figma-working/airbnbgifhome.gif" }], layout: "single" as const },
      { items: [{ type: "image" as const, url: "/portfolio-images-work/figma-working/airbnb1.png" }, { type: "image" as const, url: "/portfolio-images-work/figma-working/airbnb2.png" }, { type: "image" as const, url: "/portfolio-images-work/figma-working/airnbnb3.png" }], layout: "grid-3" as const }
    ],
    relatedProjects: [1, 3]
  },
  {
    id: 3,
    title: "AI EmpowerHub – Intelligent Student Platform",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/portfolio-images-work/figma-working/empowerhome.png",
    description: "An all‑in‑one student empowerment platform combining AI‑driven career guidance, educational roadmaps, counseling resources, and mental health support.",
    fullDescription: [
      "Purpose → Address the fragmented landscape of student support by unifying career exploration, resource discovery, and mental wellness.",
      "Core modules → AI Career Suggester, Educational Roadmap Maker with interactive tree diagrams, Career Guidance, Resource Finder, and Mental Health Chatbot.",
      "Tech stack → React with Vite, TailwindCSS, react‑spring, D3.js, Headless UI."
    ],
    tech: ["React", "Vite", "TypeScript", "TailwindCSS", "react-spring", "D3.js", "Headless UI", "Framer Motion"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/EmpowerHub",
    live: "https://empower-hub-deployed-version.vercel.app/",
    domains: ["Full Stack", "AI/ML", "Product"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [
      { items: [{ type: "image" as const, url: "/portfolio-images-work/figma-working/empowerhome.png" }], layout: "single" as const },
      { items: [{ type: "image" as const, url: "/portfolio-images-work/figma-working/empowerhub2.png" }, { type: "image" as const, url: "/portfolio-images-work/figma-working/empowerhub3.png" }], layout: "grid-2" as const }
    ],
    relatedProjects: [1, 4]
  },
  {
    id: 4,
    title: "AI Image Editor – Smart Editing SaaS",
    category: "Full Stack SaaS Application",
    year: "2024",
    image: "/portfolio-images-work/figma-working/aiedithome1.png",
    description: "AI‑powered image editing platform with intelligent background removal, smart upscaling, and object‑focused cropping built on the T3 Stack.",
    fullDescription: [
      "Vision → Eliminate hours of manual editing with instant AI transformations for designers and creators.",
      "Architecture → Next.js 15 with App Router, Prisma ORM + PostgreSQL, tRPC for type safety, Better Auth for OAuth, ImageKit for optimized delivery.",
      "User flow → Credit‑based system with free tier, drag‑and‑drop upload, instant AI processing, and download."
    ],
    tech: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "Better Auth", "ImageKit", "TailwindCSS", "Zod"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/AI-IMAGE-EDITOR",
    live: "https://ai-image-editor-rosy.vercel.app/",
    domains: ["Full Stack", "AI/ML", "SaaS"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [
      { items: [{ type: "image" as const, url: "/portfolio-images-work/figma-working/aiedithome1.png" }, { type: "image" as const, url: "/portfolio-images-work/figma-working/aiedit1.png" }, { type: "image" as const, url: "/portfolio-images-work/figma-working/aiedit2.png" }], layout: "grid-3" as const }
    ],
    relatedProjects: [1, 3]
  },
  {
    id: 5,
    title: "Rejouice – Venture Agency Experience",
    category: "Frontend Web Development",
    year: "2024",
    image: "/portfolio-images-work/figma-working/rejouicehome.jpg",
    description: "Premium creative agency landing page featuring sophisticated animations, smooth scrolling, and immersive visual storytelling built with GSAP and Locomotive Scroll.",
    fullDescription: [
      "Animation architecture → Locomotive Scroll for buttery‑smooth parallax. GSAP for staggered text reveals, cursor effects, and timeline‑based sequences.",
      "Visual system → Full‑screen hero video, staggered heading animations, hover‑triggered video reveals, Swiper carousel."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "ScrollTrigger", "Locomotive Scroll", "Swiper.js"],
    role: "Frontend Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/Project_07",
    live: "https://yashu9844.github.io/Project_07/",
    domains: ["Frontend", "Web Design"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    mediaSections: [
      { items: [{ type: "video" as const, url: "/portfolio-images-work/figma-working/reel-short.mp4" }], layout: "single" as const }
    ],
    relatedProjects: [1, 6]
  },
  {
    id: 6,
    title: "ApniSec – Cybersecurity Issue Platform",
    category: "Full Stack Web Application",
    year: "2025",
    image: "/portfolio-images-work/figma-working/re22.png",
    description: "Enterprise‑grade security issue management platform with JWT authentication, rate limiting, email workflows, and a cybersecurity‑themed dashboard.",
    fullDescription: [
      "Solution → A purpose‑built platform where teams create, filter, search, and resolve security issues through a polished dashboard with real‑time stats and role‑based access.",
      "Execution → Next.js 15 with React 19 and Server Actions. Prisma ORM on PostgreSQL. Custom JWT auth with bcrypt, email verification. Rate limiting at 100 req/15 min. Resend API for templated emails."
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma", "JWT", "Resend", "TailwindCSS", "Zod", "bcrypt"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/ApniSec",
    live: "https://apni-sec-azure.vercel.app",
    domains: ["Full Stack", "Security"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    mediaSections: [
      { items: [{ type: "image" as const, url: "/portfolio-images-work/figma-working/re22.png" }], layout: "single" as const }
    ],
    relatedProjects: [1, 4]
  },
  {
    id: 7,
    title: "BeyondChats – AI Article Enhancement",
    category: "Full Stack Web Application",
    year: "2025",
    image: "/images/pimg7.jpg",
    description: "Full‑stack article enhancement platform that scrapes, stores, and AI‑enriches blog content with curated references, powered by Laravel, Node.js worker, and React 19.",
    fullDescription: [
      "Solution → A three‑tier system: Laravel API for article CRUD, Node.js worker for scraping queues, and a React 19 SPA with AI‑enhanced content and inline references.",
      "AI enhancement via Groq and Google Gemini LLMs with structured output parsing. Glass‑morphism dark‑theme UI with Framer Motion."
    ],
    tech: ["Laravel 12", "PHP 8.3", "React 19", "Vite", "Node.js", "TailwindCSS v4", "Framer Motion", "Groq AI", "Gemini"],
    role: "Full Stack Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/BeyondChats-assignment",
    live: "https://beyond-chats-assignment-4v4q.vercel.app",
    domains: ["Full Stack", "AI/ML", "Backend"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    relatedProjects: [4, 6]
  },
  {
    id: 8,
    title: "TechyBlog – MERN Blogging Platform",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/images/pimg8.jpg",
    description: "Full‑stack blogging platform with role‑based admin panel, JWT authentication, rich‑text editing, commenting, and search — built on the MERN stack.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Redux Toolkit", "JWT", "TailwindCSS"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/MERN-BLOG",
    live: "https://techy-blog.onrender.com/",
    domains: ["Full Stack", "Backend"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    relatedProjects: [7, 6]
  },

  // ===== FULL STACK PROJECTS =====
  {
    id: 9,
    title: "NextYouTube – Video Streaming Platform",
    category: "Full Stack Web Application",
    year: "2025",
    image: "/images/pimg1.jpg",
    description: "YouTube clone with video upload, processing via Mux, tRPC APIs, Drizzle ORM on NeonDB, Clerk auth, and Upstash rate limiting. Most complex project in portfolio.",
    fullDescription: [
      "Architecture → Next.js 15 with tRPC for end-to-end type-safe APIs. Drizzle ORM on NeonDB (serverless PostgreSQL) for scalable data. Mux for video processing, transcoding, and adaptive streaming.",
      "Auth & Security → Clerk for user management, Upstash for Redis-backed rate limiting. Background jobs for video processing pipelines.",
      "Features → Video upload with progress tracking, channel management, subscriptions, likes, comments, search with filters, and responsive video player."
    ],
    tech: ["Next.js 15", "TypeScript", "tRPC", "Drizzle ORM", "NeonDB", "Mux", "Clerk", "Upstash", "Redis", "TailwindCSS"],
    role: "Full Stack Developer",
    duration: "3 months",
    github: "https://github.com/Yashu9844/nextyoutube",
    domains: ["Full Stack", "SaaS", "Product"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    relatedProjects: [10, 4]
  },
  {
    id: 10,
    title: "NextTwitch – Live Streaming Platform",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/images/pimg2.jpg",
    description: "Twitch clone with real-time live streaming via LiveKit WebRTC, Clerk authentication, Prisma ORM, UploadThing file uploads, and community features.",
    fullDescription: [
      "Streaming → LiveKit for WebRTC-based real-time video streaming with low latency. Support for multiple stream qualities and chat integration.",
      "Architecture → Next.js 14, Prisma ORM, Clerk auth, Zustand state management. UploadThing for profile and thumbnail uploads."
    ],
    tech: ["Next.js 14", "TypeScript", "LiveKit", "Prisma", "Clerk", "UploadThing", "Zustand", "TailwindCSS"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/next_twitch",
    domains: ["Full Stack", "Real-Time", "Product"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    relatedProjects: [9, 1]
  },
  {
    id: 11,
    title: "CodeScanAPI – Security Analysis Platform",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/images/pimg3.jpg",
    description: "Full-stack code security scanning platform with 86+ dependencies. Express backend, React frontend, Drizzle ORM on NeonDB, WebSocket real-time updates, and Clerk auth.",
    fullDescription: [
      "Architecture → Express.js API with React SPA. Drizzle ORM on NeonDB for serverless PostgreSQL. WebSocket for real-time scan progress. Clerk for authentication.",
      "Features → Code vulnerability scanning, security reports with Recharts visualizations, scan history, and team collaboration with role-based access."
    ],
    tech: ["Express.js", "React", "Drizzle ORM", "NeonDB", "WebSocket", "Clerk", "Recharts", "ShadCN UI", "TailwindCSS"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/CodeScanAPI",
    domains: ["Full Stack", "Security", "Backend"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    relatedProjects: [6, 9]
  },
  {
    id: 12,
    title: "Disaster – AI Disaster Management",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/images/pimg4.jpg",
    description: "AI-enhanced disaster management platform using Google Gemini for intelligence, Clerk auth, Leaflet maps for geo-visualization, and real-time incident reporting.",
    fullDescription: [
      "Backend → Express.js with Clerk authentication, Google Generative AI (Gemini) for disaster analysis, Cloudinary media uploads, MongoDB data store.",
      "Frontend → React with Vite, ShadCN/Radix UI, Leaflet maps for geographic disaster visualization, UploadThing for file uploads."
    ],
    tech: ["Express.js", "React", "Google Gemini AI", "Clerk", "MongoDB", "Leaflet", "Cloudinary", "ShadCN UI", "TailwindCSS"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/Disaster",
    domains: ["Full Stack", "AI/ML", "Product"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    relatedProjects: [4, 3]
  },
  {
    id: 13,
    title: "HOPESO – Interactive Data Visualization",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/images/pimg5.jpg",
    description: "Data-rich platform with Three.js 3D graphics, Chart.js analytics, Leaflet maps, Locomotive Scroll animations, and an Express + MongoDB backend.",
    tech: ["React", "Three.js", "Chart.js", "Leaflet", "Locomotive Scroll", "Express.js", "MongoDB", "styled-components"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/HOPESO",
    domains: ["Full Stack", "Frontend", "3D/Graphics"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    relatedProjects: [5, 12]
  },
  {
    id: 14,
    title: "MERN Chat – Real-Time Messaging App",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/images/pimg6.jpg",
    description: "Real-time chat application with Socket.IO messaging, Redux state management, Material UI components, Chart.js analytics dashboard, and group chat support.",
    tech: ["React", "Redux Toolkit", "Material UI", "Socket.IO", "Chart.js", "Express.js", "MongoDB", "Node.js"],
    role: "Full Stack Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/MERN_CHAT",
    domains: ["Full Stack", "Real-Time", "Backend"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    relatedProjects: [10, 8]
  },
  {
    id: 15,
    title: "NEXT X – Twitter/X Social Platform",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/images/pimg9.jpg",
    description: "Twitter/X clone built with Next.js 14, Firebase backend, NextAuth for authentication, and Recoil for atomic state management.",
    tech: ["Next.js 14", "TypeScript", "Firebase", "NextAuth", "Recoil", "TailwindCSS"],
    role: "Full Stack Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/NEXT_X",
    domains: ["Full Stack", "Product"],
    link: "#",
    credits: [{ role: "Product & Engineering", name: "Yashavanth R Siddesh" }],
    relatedProjects: [2, 8]
  },

  // ===== FRONTEND PROJECTS =====
  {
    id: 16,
    title: "BRAINWAVE – Premium Landing Page",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg10.jpg",
    description: "Stunning parallax landing page with scroll-lock effects, advanced animations, and premium visual design built with React and Vite.",
    tech: ["React 18", "Vite", "TailwindCSS", "Parallax Scrolling", "React Router"],
    role: "Frontend Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/BRAINWAVE",
    domains: ["Frontend", "Web Design"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [5, 17]
  },
  {
    id: 17,
    title: "IPD Spark – Enterprise Dashboard",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg12.jpg",
    description: "Massive component-rich dashboard with 20+ Radix UI components, Recharts data visualizations, TanStack Query, and comprehensive form handling.",
    tech: ["React", "TypeScript", "ShadCN/Radix UI", "Recharts", "TanStack Query", "React Hook Form", "Zod", "TailwindCSS"],
    role: "Frontend Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/ipd-spark-project",
    domains: ["Frontend", "Dashboard"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [18, 19]
  },
  {
    id: 18,
    title: "College Smart Check – Data Platform",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg13.jpg",
    description: "Feature-rich data visualization app with comprehensive ShadCN/Radix component library, Recharts analytics, and responsive design system.",
    tech: ["React", "TypeScript", "ShadCN/Radix UI", "Recharts", "TailwindCSS", "Vite"],
    role: "Frontend Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/college-smart-check",
    domains: ["Frontend", "Dashboard"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [17, 19]
  },
  {
    id: 19,
    title: "GIS – Geographic Information System",
    category: "Frontend Web Development",
    year: "2025",
    image: "/images/pimg14.jpg",
    description: "Cutting-edge GIS platform on Next.js 16 + React 19 with ShadCN/Radix UI, Recharts for analytics, and Vercel Analytics integration.",
    tech: ["Next.js 16", "React 19", "ShadCN/Radix UI", "Recharts", "Vercel Analytics", "TailwindCSS"],
    role: "Frontend Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/gis",
    domains: ["Frontend", "Dashboard", "Product"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [17, 18]
  },
  {
    id: 20,
    title: "NEXT IMDb – Movie Database Clone",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg15.jpg",
    description: "IMDb clone with dark/light mode theming via Next Themes, server-side rendering, and a clean movie browsing experience.",
    tech: ["Next.js 14", "Next Themes", "React Icons", "TailwindCSS"],
    role: "Frontend Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/NEXT_IMDb",
    domains: ["Frontend", "Product"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [16, 22]
  },
  {
    id: 21,
    title: "Netflix Clone – Streaming UI",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg16.jpg",
    description: "Pixel-perfect Netflix UI clone with carousel navigation, responsive grid layouts, and streaming-style interface design.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    role: "Frontend Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/Netflix-Clone",
    domains: ["Frontend", "Web Design"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [16, 5]
  },
  {
    id: 22,
    title: "GeminiAPI – AI Chat Interface",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg1.jpg",
    description: "Modern AI chat frontend integrating with Google Gemini API. React + Vite with Axios for API communication and responsive chat UI.",
    tech: ["React", "Vite", "Axios", "Google Gemini API", "CSS3"],
    role: "Frontend Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/GeminiAPI",
    domains: ["Frontend", "AI/ML"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [4, 12]
  },
  {
    id: 23,
    title: "MegaBlog – CMS with Rich Editor",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg2.jpg",
    description: "Full CMS frontend with TinyMCE rich text editor, Redux Toolkit state management, Appwrite BaaS, and React Hook Form validation.",
    tech: ["React", "Redux Toolkit", "Appwrite", "TinyMCE", "React Hook Form", "TailwindCSS"],
    role: "Frontend Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/MegaBlog",
    domains: ["Frontend", "Product"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [8, 7]
  },
  {
    id: 24,
    title: "GSAP Practise – Animation Showcase",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg3.jpg",
    description: "Advanced GSAP animation showcase demonstrating ScrollTrigger, timeline sequences, stagger effects, and premium motion design techniques.",
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "ScrollTrigger"],
    role: "Frontend Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/Gsap_Practise",
    domains: ["Frontend", "Web Design"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [5, 16]
  },
  {
    id: 25,
    title: "DOM Projects – Vanilla JS Collection",
    category: "Frontend Web Development",
    year: "2023",
    image: "/images/pimg4.jpg",
    description: "Collection of 10+ interactive DOM manipulation projects showcasing vanilla JavaScript skills — calculators, games, form validators, and UI components.",
    tech: ["HTML5", "CSS3", "JavaScript", "DOM API"],
    role: "Frontend Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/DOM_PROJECTS",
    domains: ["Frontend"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [24, 21]
  },

  // ===== BACKEND PROJECTS =====
  {
    id: 26,
    title: "SaveMe.Life – Healthcare SaaS (Internship)",
    category: "Backend Web Application",
    year: "2024",
    image: "/images/pimg5.jpg",
    description: "Production healthcare platform — contributed to WhatsApp API integration, PhonePe payments, Redis caching, PDF report generation, and audit trail modules during internship.",
    fullDescription: [
      "Role → Contributed as a backend developer during internship to a production-grade healthcare SaaS platform serving real users.",
      "Modules contributed → WhatsApp Business API integration for patient notifications, PhonePe payment gateway for subscription billing, Redis-based caching layer for API performance, DomPDF report generation for medical documents, and comprehensive audit trail logging.",
      "Note → This is a production application. Source code cannot be shared due to confidentiality. The live platform is accessible at saveme.life."
    ],
    tech: ["Laravel 11", "PHP", "Redis", "WhatsApp API", "PhonePe", "DomPDF", "Sanctum", "Socialite", "MySQL"],
    role: "Backend Developer (Intern)",
    duration: "3 months",
    // live: "https://saveme.life", // SSL certificate expired on 2026-10-24; restore once renewed
    domains: ["Backend", "SaaS", "Product"],
    link: "#",
    credits: [{ role: "Backend Development (Intern)", name: "Yashavanth R Siddesh" }],
    relatedProjects: [7, 27]
  },
  {
    id: 27,
    title: "BackendBlog – Laravel API with Firebase JWT",
    category: "Backend Web Application",
    year: "2025",
    image: "/images/pimg6.jpg",
    description: "Laravel 12 blog API with Sanctum authentication, Firebase JWT integration, queue workers for background jobs, and RESTful endpoints.",
    tech: ["Laravel 12", "PHP 8.3", "Sanctum", "Firebase JWT", "Queue Workers", "MySQL"],
    role: "Backend Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/backendblog",
    domains: ["Backend"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [28, 26]
  },
  {
    id: 28,
    title: "BlogLaravel – Laravel Blog API",
    category: "Backend Web Application",
    year: "2025",
    image: "/images/pimg9.jpg",
    description: "RESTful Laravel 12 blog API with Sanctum token authentication, queue workers, and structured API responses.",
    tech: ["Laravel 12", "PHP 8.3", "Sanctum", "Queue Workers", "MySQL"],
    role: "Backend Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/bloglaravel",
    domains: ["Backend"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [27, 29]
  },
  {
    id: 29,
    title: "Backend – Laravel 12 API Starter",
    category: "Backend Web Application",
    year: "2025",
    image: "/images/pimg10.jpg",
    description: "Clean Laravel 12 API starter with Sanctum authentication, Docker Sail support, and production-ready project structure.",
    tech: ["Laravel 12", "PHP 8.3", "Sanctum", "Docker Sail", "MySQL"],
    role: "Backend Developer",
    duration: "1 week",
    github: "https://github.com/Yashu9844/backend",
    domains: ["Backend", "DevOps"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [27, 28]
  },
  {
    id: 30,
    title: "Virus Scanner – Security File Analyzer",
    category: "Backend Web Application",
    year: "2024",
    image: "/images/pimg12.jpg",
    description: "TypeScript backend service integrating with VirusTotal API for file scanning. Multer file uploads, Express.js, and structured security reporting.",
    fullDescription: [
      "Architecture → Express.js with TypeScript for type-safe backend. Multer middleware for secure file uploads with size and type validation.",
      "Security → VirusTotal API integration for comprehensive malware scanning. Structured JSON responses with threat analysis and detection rates."
    ],
    tech: ["TypeScript", "Express.js", "Multer", "VirusTotal API", "Node.js"],
    role: "Backend Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/virus_scanner",
    domains: ["Backend", "Security"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [6, 11]
  },
  {
    id: 31,
    title: "MERN Auth – Authentication Service",
    category: "Backend Web Application",
    year: "2024",
    image: "/images/pimg13.jpg",
    description: "JWT authentication microservice with bcrypt password hashing, Express.js middleware chains, and MongoDB user storage.",
    tech: ["Express.js", "MongoDB", "JWT", "bcrypt", "Node.js"],
    role: "Backend Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/MERNAUTH",
    domains: ["Backend", "Security"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [32, 8]
  },
  {
    id: 32,
    title: "MERN State – Real Estate API",
    category: "Backend Web Application",
    year: "2024",
    image: "/images/pimg14.jpg",
    description: "RESTful real estate API with property CRUD operations, JWT authentication, image uploads, and search filtering — built on Express + MongoDB.",
    tech: ["Express.js", "MongoDB", "JWT", "Mongoose", "Node.js"],
    role: "Backend Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/MERNSTATE",
    domains: ["Backend", "Full Stack"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [31, 8]
  },
  {
    id: 33,
    title: "MERN Blog API – Blog Backend",
    category: "Backend Web Application",
    year: "2024",
    image: "/images/pimg15.jpg",
    description: "Express.js blog API with JWT auth, bcrypt hashing, MongoDB storage, and structured CRUD endpoints for posts and comments.",
    tech: ["Express.js", "MongoDB", "JWT", "bcrypt", "Mongoose", "Node.js"],
    role: "Backend Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/MERNBLOG",
    domains: ["Backend"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [27, 28]
  },
  {
    id: 34,
    title: "InstaClone – Instagram Backend",
    category: "Backend Web Application",
    year: "2024",
    image: "/images/pimg16.jpg",
    description: "Instagram-style backend with Passport.js authentication, Multer image uploads, EJS templating, and social features like follow/unfollow and feed.",
    tech: ["Express.js", "MongoDB", "Passport.js", "Multer", "EJS", "Node.js"],
    role: "Backend Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/instaclone",
    domains: ["Backend", "Product"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [15, 14]
  },
  {
    id: 35,
    title: "WebSocket Chat – Real-Time Server",
    category: "Backend Web Application",
    year: "2024",
    image: "/images/pimg1.jpg",
    description: "WebSocket server implementation using Socket.IO with Express.js. Real-time bidirectional communication, room-based chat, and connection management.",
    tech: ["Express.js", "Socket.IO", "Node.js", "WebSocket"],
    role: "Backend Developer",
    duration: "1 week",
    github: "https://github.com/Yashu9844/websocketPyush",
    domains: ["Backend", "Real-Time"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [14, 10]
  },

  // ===== AI/ML PROJECTS =====
  {
    id: 36,
    title: "LangChain Blog Generator",
    category: "AI/ML Application",
    year: "2024",
    image: "/images/pimg2.jpg",
    description: "AI-powered blog content generator using LangChain framework with customizable prompts, tone selection, and structured content output.",
    tech: ["Python", "LangChain", "Streamlit", "OpenAI API"],
    role: "AI/ML Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/Complete-Langchain-Tutorials",
    domains: ["AI/ML"],
    link: "#",
    credits: [{ role: "AI Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [37, 38]
  },
  {
    id: 37,
    title: "LangChain Q&A Chatbot",
    category: "AI/ML Application",
    year: "2024",
    image: "/images/pimg3.jpg",
    description: "Conversational Q&A chatbot built with LangChain, featuring context-aware responses, conversation memory, and multiple LLM provider support.",
    tech: ["Python", "LangChain", "Streamlit", "OpenAI API", "FAISS"],
    role: "AI/ML Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/Complete-Langchain-Tutorials",
    domains: ["AI/ML"],
    link: "#",
    credits: [{ role: "AI Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [36, 39]
  },
  {
    id: 38,
    title: "LangChain Text Summarizer",
    category: "AI/ML Application",
    year: "2024",
    image: "/images/pimg4.jpg",
    description: "Intelligent text summarization tool using LangChain with support for long documents, extractive and abstractive summarization modes.",
    tech: ["Python", "LangChain", "Streamlit", "OpenAI API"],
    role: "AI/ML Developer",
    duration: "1 week",
    github: "https://github.com/Yashu9844/Complete-Langchain-Tutorials",
    domains: ["AI/ML"],
    link: "#",
    credits: [{ role: "AI Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [36, 37]
  },
  {
    id: 39,
    title: "LangChain Chat Multiple Docs",
    category: "AI/ML Application",
    year: "2024",
    image: "/images/pimg5.jpg",
    description: "Multi-document RAG (Retrieval-Augmented Generation) system. Upload multiple PDFs and chat with their content using vector embeddings and semantic search.",
    tech: ["Python", "LangChain", "Streamlit", "FAISS", "OpenAI Embeddings", "PyPDF"],
    role: "AI/ML Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/Complete-Langchain-Tutorials",
    domains: ["AI/ML"],
    link: "#",
    credits: [{ role: "AI Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [37, 40]
  },
  {
    id: 40,
    title: "LangChain Calories Health App",
    category: "AI/ML Application",
    year: "2024",
    image: "/images/pimg6.jpg",
    description: "AI health assistant that analyzes food images and descriptions to estimate calorie counts, nutritional information, and dietary recommendations.",
    tech: ["Python", "LangChain", "Streamlit", "Google Gemini Vision", "PIL"],
    role: "AI/ML Developer",
    duration: "1 week",
    github: "https://github.com/Yashu9844/Complete-Langchain-Tutorials",
    domains: ["AI/ML"],
    link: "#",
    credits: [{ role: "AI Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [36, 39]
  },
  {
    id: 41,
    title: "LangChain Invoice Extractor",
    category: "AI/ML Application",
    year: "2024",
    image: "/images/pimg9.jpg",
    description: "Automated invoice data extraction using LangChain with OCR capabilities, structured data output, and support for multiple invoice formats.",
    tech: ["Python", "LangChain", "Streamlit", "OpenAI API", "Pillow"],
    role: "AI/ML Developer",
    duration: "1 week",
    github: "https://github.com/Yashu9844/Complete-Langchain-Tutorials",
    domains: ["AI/ML"],
    link: "#",
    credits: [{ role: "AI Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [36, 40]
  },
  {
    id: 42,
    title: "LangChain YouTube Transcriber",
    category: "AI/ML Application",
    year: "2024",
    image: "/images/pimg10.jpg",
    description: "AI tool that transcribes YouTube videos and generates summaries, key takeaways, and structured notes using LangChain processing pipelines.",
    tech: ["Python", "LangChain", "Streamlit", "YouTube Transcript API", "OpenAI API"],
    role: "AI/ML Developer",
    duration: "1 week",
    github: "https://github.com/Yashu9844/Complete-Langchain-Tutorials",
    domains: ["AI/ML"],
    link: "#",
    credits: [{ role: "AI Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [37, 38]
  },

  // ===== OTHER / SPECIALIZED PROJECTS =====
  {
    id: 43,
    title: "MCP Client & Server – Nx Monorepo",
    category: "Monorepo Architecture",
    year: "2024",
    image: "/images/pimg11.jpg",
    description: "Nx monorepo with microservices architecture — admin panel, products API, frontend, and fulfillment API. Managed with pnpm workspace.",
    tech: ["Nx", "TypeScript", "pnpm", "Microservices", "Node.js"],
    role: "Full Stack Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/mcp-client-and-server",
    domains: ["DevOps", "Backend", "Full Stack"],
    link: "#",
    credits: [{ role: "Architecture & Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [44, 9]
  },
  {
    id: 44,
    title: "Web3 – Turborepo Monorepo",
    category: "Web3 Development",
    year: "2024",
    image: "/images/pimg12.jpg",
    description: "Web3 project using Turborepo monorepo with Bun runtime. Modern development practices for blockchain-related applications.",
    tech: ["Turborepo", "Bun", "TypeScript", "Web3", "Monorepo"],
    role: "Full Stack Developer",
    duration: "1 month",
    github: "https://github.com/Yashu9844/web3",
    domains: ["Web3", "DevOps"],
    link: "#",
    credits: [{ role: "Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [43, 9]
  },
  {
    id: 45,
    title: "CN – Three-Tier Architecture",
    category: "Full Stack Web Application",
    year: "2024",
    image: "/images/pimg13.jpg",
    description: "Clean three-tier architecture demonstration with separated presentation, business logic, and data access layers.",
    tech: ["Node.js", "Express.js", "MongoDB", "React", "TailwindCSS"],
    role: "Full Stack Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/CN",
    domains: ["Full Stack", "Backend"],
    link: "#",
    credits: [{ role: "Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [43, 8]
  },
  {
    id: 46,
    title: "Event Management – UI Platform",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg14.jpg",
    description: "Event management frontend with responsive design, Tailwind CSS styling, and modern UI patterns for event discovery and booking.",
    tech: ["TailwindCSS", "PostCSS", "Autoprefixer", "HTML5", "JavaScript"],
    role: "Frontend Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/EventManagement",
    domains: ["Frontend"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [16, 21]
  },
  {
    id: 47,
    title: "Twitch Clone – Starter Template",
    category: "Frontend Web Development",
    year: "2024",
    image: "/images/pimg15.jpg",
    description: "Next.js starter template for a Twitch-style streaming platform with basic routing and component structure.",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    role: "Frontend Developer",
    duration: "1 week",
    github: "https://github.com/Yashu9844/twitch-clone",
    domains: ["Frontend"],
    link: "#",
    credits: [{ role: "Frontend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [10, 20]
  },
  {
    id: 48,
    title: "BeyondChat Frontend – Laravel + Vite",
    category: "Backend Web Application",
    year: "2025",
    image: "/images/pimg16.jpg",
    description: "Laravel backend with Vite asset bundling and Tailwind CSS. Modern PHP backend setup for the BeyondChats platform.",
    tech: ["Laravel", "PHP", "Vite", "TailwindCSS", "MySQL"],
    role: "Backend Developer",
    duration: "2 weeks",
    github: "https://github.com/Yashu9844/BeyondChat",
    domains: ["Backend"],
    link: "#",
    credits: [{ role: "Backend Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [7, 27]
  },
  {
    id: 49,
    title: "Smart India Hackathon – EmpowerHub",
    category: "Hackathon Project",
    year: "2024",
    image: "/images/pimg1.jpg",
    description: "Smart India Hackathon submission — AI-driven student empowerment platform. Team project showcasing full-stack development under competitive constraints.",
    tech: ["React", "Vite", "TailwindCSS", "D3.js", "Node.js", "Express.js"],
    role: "Full Stack Developer",
    duration: "48 hours",
    github: "https://github.com/Yashu9844/SmartIndia-EmpowerHub",
    domains: ["Full Stack", "AI/ML", "Hackathon"],
    link: "#",
    credits: [{ role: "Team Lead & Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [3, 12]
  },
  {
    id: 50,
    title: "Complete LangChain Tutorials",
    category: "AI/ML Learning Repository",
    year: "2024",
    image: "/images/pimg2.jpg",
    description: "Comprehensive LangChain tutorial collection with 7+ complete projects covering RAG, chatbots, summarization, vision AI, and multi-document processing.",
    tech: ["Python", "LangChain", "Streamlit", "OpenAI", "FAISS", "Google Gemini"],
    role: "AI/ML Developer",
    duration: "2 months",
    github: "https://github.com/Yashu9844/Complete-Langchain-Tutorials",
    domains: ["AI/ML"],
    link: "#",
    credits: [{ role: "AI Development", name: "Yashavanth R Siddesh" }],
    relatedProjects: [36, 37]
  },
];

// ===== PROJECT SECTIONS (tabs on /projects) =====
// A project can belong to several sections; it matches a section when one of its
// `domains` is listed or its `category` matches the pattern.
export const PROJECT_SECTIONS = [
  { id: 'agentic-ai', label: 'Agentic AI', domains: ['AI/ML'], category: /\bAI\b|AI\/ML|Agentic/i },
  { id: 'full-stack', label: 'Full Stack', domains: ['Full Stack'], category: /^Full Stack/i },
  { id: 'backend', label: 'Backend', domains: ['Backend', 'DevOps', 'Web3'], category: /^Backend/i },
  { id: 'frontend', label: 'Frontend', domains: ['Frontend'], category: /Frontend/i },
  { id: 'distributed-systems', label: 'Distributed Systems', domains: ['Distributed Systems'], category: /Distributed Systems/i },
  { id: 'mobile', label: 'Mobile', domains: ['Mobile'], category: /Mobile/i },
] as const;

export type ProjectSectionId = (typeof PROJECT_SECTIONS)[number]['id'];

export function getProjectSections(project: Pick<Project, 'category' | 'domains'>): ProjectSectionId[] {
  return PROJECT_SECTIONS.filter(
    (s) =>
      (project.domains ?? []).some((d) => (s.domains as readonly string[]).includes(d)) ||
      s.category.test(project.category),
  ).map((s) => s.id);
}
