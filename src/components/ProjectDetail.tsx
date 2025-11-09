'use client';

interface ProjectDetailProps {
  title: string;
  category: string;
  year: string;
  description: string[];
  images: string[];
  tech: string[];
  role: string;
  duration: string;
  link?: string;
}

export default function ProjectDetail({
  title,
  category,
  year,
  description,
  images,
  tech,
  role,
  duration,
  link,
}: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-32 pb-16 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-[1920px] mx-auto">
          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - Images */}
            <div className="lg:sticky lg:top-32 h-fit space-y-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-[4/5] overflow-hidden rounded-lg"
                >
                  <img
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Right Side - Content */}
            <div className="space-y-12">
              {/* Header */}
              <div>
                <p className="text-xs tracking-widest text-gray-500 mb-4 uppercase">
                  {category}
                </p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  {title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{year}</span>
                  <span>•</span>
                  <span>{role}</span>
                  <span>•</span>
                  <span>{duration}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                {description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg leading-relaxed text-gray-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Technologies */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tech.map((technology, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              {link && (
                <div className="border-t border-white/10 pt-8">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                  >
                    View Live Project
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
