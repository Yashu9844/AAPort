'use client';

const ArrowUpRight = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Page2 = () => {
  const projects = [
    {
      type: 'SNAPSHOT',
      title: 'Robinhood Onboarding',
      subtitle: 'Brand Experience Design',
      image: '/images/pimg1.jpg',
      link: '/case-study-1',
    },
    {
      type: 'SNAPSHOT',
      title: 'E-Commerce Platform',
      subtitle: 'Full Stack Development',
      image: '/images/pimg5.jpg',
      link: '/case-study-2',
    },
    {
      type: 'SNAPSHOT',
      title: 'Healthcare Dashboard',
      subtitle: 'UI/UX Design & Development',
      image: '/images/pimg9.jpg',
      link: '/case-study-3',
    },
    {
      type: 'CASE STUDY',
      title: 'Mixpanel Rebrand',
      subtitle: 'Brand Design',
      image: '/images/pimg13.jpg',
      link: '/case-study-2',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black w-full text-white">
      <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-16 sm:py-20 md:py-24 lg:py-28 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <a key={index} href={project.link} className="group cursor-pointer block">
            {/* Header */}
            <div className="mb-4">
              <p className="uppercase text-xs tracking-widest text-gray-400 mb-2">
                {index === 0 ? '📸' : '📄'} {project.type}
              </p>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium transition-all duration-300 relative">
                  {project.title}
                  <ArrowUpRight
                    className="w-6 h-6 absolute -right-6 top-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  />
                </h2>
              </div>
              <p className="text-gray-400 text-sm">{project.subtitle}</p>
            </div>

            {/* Image */}
            <div className="overflow-hidden w-full">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[500px] md:h-[580px] lg:h-[620px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Page2;