'use client';

import Link from 'next/link';

const SectionSeparator = () => (
  <div className="w-full border-t border-white/10 my-16"></div>
);

const MediaSection = ({ imageSrc, alt }: { imageSrc: string; alt: string }) => (
  <div className="w-full overflow-hidden">
    <img
      src={imageSrc}
      alt={alt}
      className="w-full h-full object-cover"
    />
  </div>
);

const TextSection = ({ paragraphs }: { paragraphs: string[] }) => (
  <div className="my-12">
    <div className="space-y-5">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-lg leading-relaxed text-white font-normal font-kh-teka">
          {paragraph}
        </p>
      ))}
    </div>
  </div>
);

const InformationSection = ({ title, paragraphs }: { title: string; paragraphs: string[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
    <div className="lg:col-span-2">
      <h2 className="text-lg font-normal text-white font-kh-teka">
        {title}
      </h2>
    </div>
    <div className="lg:col-span-10">
      <div className="space-y-5">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-white font-normal font-kh-teka">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default function About2() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest text-gray-500 mb-6 uppercase font-kh-teka">
            📖 ABOUT
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none font-kh-teka">
            Yashavanth R Siddesh
          </h1>
          <p className="text-xl text-gray-400 font-light font-kh-teka">
            Full Stack Developer · Bengaluru
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <MediaSection imageSrc="/image1pro.png" alt="Yashavanth R Siddesh" />
        </div>
      </div>

      {/* Introduction Text */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <TextSection 
            paragraphs={[
              "I'm Yashavanth R Siddesh, a Full Stack Developer from Bengaluru. I focus on clean engineering, strong product thinking, and purposeful interfaces that solve meaningful problems. My work lives at the intersection of design and code—where technical precision meets human experience.",
              "I started coding a year and a half ago, but my journey has been anything but conventional. I didn't take the traditional computer science path. Instead, I learned by building—real projects with real users, real deadlines, and real consequences. Every line of code I write is a reflection of my belief that technology should empower people, not complicate their lives."
            ]}
          />
        </div>
      </div>

      {/* Project Image 1 */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-1">
          <MediaSection imageSrc="/image1pro.png" alt="RoborosX Project" />
        </div>
      </div>

      {/* Experience Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <TextSection 
            paragraphs={[
              "At RoborosX, I built the Clinic Management module for SaveMe.life—a live health system serving over 500 doctors and processing more than 1,000 monthly transactions. I improved load times by 45%, redesigned critical UI components, and contributed to three major product upgrades that increased appointment completion rates by 25%.",
              "Working in healthcare taught me something crucial: performance isn't just a technical metric—it's a user experience variable that can determine whether a doctor can see one more patient, or whether a booking gets completed before someone gives up. I obsessed over every millisecond, every interaction pattern, every edge case. That mindset shaped how I approach every project today."
            ]}
          />
        </div>
      </div>

      {/* Project Image 2 */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <MediaSection imageSrc="/image1pro.png" alt="SDC Experience" />
            <MediaSection imageSrc="/image1pro.png" alt="Teaching Students" />
          </div>
        </div>
      </div>

      {/* SDC Experience */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <TextSection 
            paragraphs={[
              "At SDC (Student Developer Community), I worked with a six-member team and mentored over 300 students through the fundamentals of web development. We built internal tools that improved workflows by 40%, making operations smoother and more efficient.",
              "Teaching forced me to simplify complex concepts, and leading a team taught me how to balance technical excellence with empathy and clear communication. It's one thing to build something yourself—it's another to teach someone else how to build it."
            ]}
          />
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="Projects"
            paragraphs={[
              "The projects I've built reflect my hunger to tackle meaningful challenges. I designed and launched an Interactive Phone Case eCommerce Platform using Next.js, Stripe, Kinde Auth, and Cloudinary—a fully custom configurator that allowed users to submit over 50 unique designs. The platform maintains 99% uptime, with automated email workflows and seamless order processing.",
              "Then there's my Agentic AI for Career Guidance—a RAG-powered mentorship system featuring five AI-driven workflows and intelligent scheduling that boosted beta user engagement by 30%. This project pushed me into the world of machine learning, natural language processing, and conversational AI.",
              "With SaveMe.life, I didn't just contribute—I reshaped the product experience. Using Laravel and Blade, I built systems that now serve 500+ active doctors and handle thousands of appointments. I added modules that transformed how patients and doctors interact with the platform, improving appointment booking speed by 25%."
            ]}
          />
        </div>
      </div>

      {/* Project Grid */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-1 my-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <MediaSection imageSrc="/image1pro.png" alt="Case eCommerce" />
            <MediaSection imageSrc="/image1pro.png" alt="Agentic AI" />
            <MediaSection imageSrc="/image1pro.png" alt="SaveMe.life" />
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="Achievements"
            paragraphs={[
              "I've competed in some of the most intense coding arenas, solving over 400 problems (300+ on LeetCode) and taking home wins that pushed my limits. I secured 1st place in Web Development for delivering the deepest UI/UX and feature set. I won 1st place in ML NOVA by building an NLP-powered voice agent with memory.",
              "I earned 2nd place in two major DSA challenges and grabbed 3rd place in an 8-hour AI Hackathon focused on disaster management. These victories weren't just badges—they were proof that I could deliver under pressure, think strategically, and execute flawlessly when it mattered most.",
              "Problem-solving is where I thrive. Whether it's optimizing a database query, refactoring a messy codebase, or designing an entire system from scratch, I approach every challenge with curiosity and rigor."
            ]}
          />
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="Philosophy"
            paragraphs={[
              "Today, I'm not just building projects—I'm building systems that scale, experiences that resonate, and solutions that last. Whether it's optimizing backend performance with Laravel and Blade, crafting responsive interfaces with Next.js and TailwindCSS, or architecting AI-powered workflows with Python and RAG pipelines, I approach every challenge with the same relentless focus: make it work, make it better, make it matter.",
              "I'm driven by the moments where technical precision meets human experience. I believe the best products feel invisible—they just work. And I'm here to keep building them, one line of code, one pixel, one user interaction at a time.",
              "I believe the best solutions are often the simplest ones—the ones that feel obvious in hindsight but require deep thinking to discover. That's what drives me: clarity, craft, and intention."
            ]}
          />
        </div>
      </div>

      {/* Credits Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-normal text-white font-kh-teka">
                Technologies
              </h2>
            </div>
            <div className="lg:col-span-10">
              <div className="space-y-2">
                <p className="text-lg text-white font-normal font-kh-teka">Frontend → Next.js, React, TailwindCSS</p>
                <p className="text-lg text-white font-normal font-kh-teka">Backend → Laravel, Node.js, Python</p>
                <p className="text-lg text-white font-normal font-kh-teka">Database → MySQL, PostgreSQL, MongoDB</p>
                <p className="text-lg text-white font-normal font-kh-teka">AI/ML → RAG, NLP, OpenAI APIs</p>
                <p className="text-lg text-white font-normal font-kh-teka">Tools → Git, Docker, Stripe, Cloudinary</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide border-b border-white/30 pb-0.5 font-kh-teka"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="h-32"></div>
    </div>
  );
}
