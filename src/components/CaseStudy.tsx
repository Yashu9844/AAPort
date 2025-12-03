'use client';

import { useRef } from 'react';
import Link from 'next/link';

interface MediaItem {
  type: 'video' | 'image';
  url: string;
}

interface MediaSection {
  items: MediaItem[];
  layout?: 'single' | 'grid-2' | 'grid-3' | 'continuous';
}

interface TextSection {
  paragraphs: string[];
}

interface RelatedProject {
  title: string;
  image: string;
  link: string;
}

interface CaseStudyProps {
  type: string;
  title: string;
  subtitle: string;
  sections: (MediaSection | TextSection)[];
  informationParagraphs: string[];
  credits: { role: string; name: string }[];
  relatedProjects?: RelatedProject[];
}

// Separator Line Component
const SectionSeparator = () => (
  <div className="w-full border-t border-white/10 my-16"></div>
);

// Media Component
const MediaSectionComponent = ({ items, layout = 'single' }: { items: MediaItem[], layout?: 'single' | 'grid-2' | 'grid-3' | 'continuous' }) => {
  const getGridClass = () => {
    switch (layout) {
      case 'grid-2':
        return 'grid grid-cols-1 md:grid-cols-2 gap-1';
      case 'grid-3':
        return 'grid grid-cols-1 md:grid-cols-3 gap-1';
      case 'continuous':
        return 'space-y-1';
      default:
        return 'space-y-1';
    }
  };

  return (
    <div className={getGridClass()}>
      {items.map((item, index) => (
        <div key={index} className="w-full overflow-hidden">
          {item.type === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={item.url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={item.url}
              alt="Project media"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Text Section Component
const TextSectionComponent = ({ paragraphs }: { paragraphs: string[] }) => (
  <div className="my-12">
    <div className="space-y-5">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-lg leading-relaxed text-white font-normal">
          {paragraph}
        </p>
      ))}
    </div>
  </div>
);

// Information Section Component
const InformationSection = ({ paragraphs }: { paragraphs: string[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
    <div className="lg:col-span-2">
      <h2 className="text-lg font-normal text-white">
        Information
      </h2>
    </div>
    <div className="lg:col-span-10">
      <div className="space-y-5">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-white font-normal">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  </div>
);

// Credits Section Component
const CreditsSection = ({ credits }: { credits: { role: string; name: string }[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
    <div className="lg:col-span-2">
      <h2 className="text-lg font-normal text-white">
        Credits
      </h2>
    </div>
    <div className="lg:col-span-10">
      <div className="space-y-2">
        {credits.map((credit, index) => (
          <p key={index} className="text-lg text-white font-normal">
            {credit.role} → {credit.name}
          </p>
        ))}
      </div>
    </div>
  </div>
);

// Additional Projects Section Component
const AdditionalProjectsSection = ({ projects }: { projects: RelatedProject[] }) => (
  <div>
    <h2 className="text-lg font-normal text-white mb-10">
      Additional Projects
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <Link key={index} href={project.link} className="group">
          <div className="mb-3">
            <p className="text-xs tracking-widest text-gray-500 mb-1.5 uppercase">
              📄 CASE STUDY
            </p>
            <h3 className="text-xl font-normal text-white group-hover:text-gray-400 transition-colors">
              {project.title} <span className="inline-block group-hover:translate-x-1 transition-transform">↗</span>
            </h3>
          </div>
          <div className="overflow-hidden aspect-video">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default function CaseStudy({
  type,
  title,
  subtitle,
  sections,
  informationParagraphs,
  credits,
  relatedProjects,
}: CaseStudyProps) {
  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
            📸 {type}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none">
            {title}
          </h1>
          <p className="text-xl text-gray-400 font-light">{subtitle}</p>
        </div>
      </div>

      {/* Dynamic Sections */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto space-y-1">
          {sections.map((section, index) => {
            if ('items' in section) {
              return <MediaSectionComponent key={index} items={section.items} layout={section.layout} />;
            } else {
              return <TextSectionComponent key={index} paragraphs={section.paragraphs} />;
            }
          })}
        </div>
      </div>

      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />

          {/* Information Section */}
          <InformationSection paragraphs={informationParagraphs} />

          <SectionSeparator />

          {/* Credits Section */}
          <CreditsSection credits={credits} />

          {relatedProjects && relatedProjects.length > 0 && (
            <>
              <SectionSeparator />
              {/* Additional Projects Section */}
              <AdditionalProjectsSection projects={relatedProjects} />
            </>
          )}
        </div>
      </div>

      {/* Back to Home */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide border-b border-white/30 pb-0.5"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
