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
      image: '/image1pro.png', // ✅ use public folder image like this
      link: '#',
    },
   {
      type: 'SNAPSHOT',
      title: 'Robinhood Onboarding',
      subtitle: 'Brand Experience Design',
      image: '/image1pro.png', // ✅ use public folder image like this
      link: '#',
    },
    {
      type: 'SNAPSHOT',
      title: 'Robinhood Onboarding',
      subtitle: 'Brand Experience Design',
      image: '/image1pro.png', // ✅ use public folder image like this
      link: '#',
    },
    {
      type: 'SNAPSHOT',
      title: 'Robinhood Onboarding',
      subtitle: 'Brand Experience Design',
      image: '/image1pro.png', // ✅ use public folder image like this
      link: '#',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black w-full text-white flex justify-center">
      {/* Top blend into hero */}
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent" />

      <div className="w-[95%] grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
        {projects.map((project, index) => (
          <div key={index} className="group cursor-pointer">
            {/* Header */}
            <div className="mb-4">
              <p className="uppercase text-xs tracking-widest text-gray-400 mb-2">
                {index === 0 ? '📸' : '📄'} {project.type}
              </p>
<div className="flex items-center gap-2">
  <h2 className="text-lg sm:text-xl md:text-2xl font-medium transition-all duration-300 relative group/title">
    {project.title}
    <ArrowUpRight
      className="w-4 h-4 absolute -right-6 top-1 opacity-0 translate-y-1 group-hover/title:opacity-100 group-hover/title:translate-y-0 transition-all duration-300"
    />
  </h2>
</div>

              <p className="text-gray-400 text-sm">{project.subtitle}</p>
            </div>

            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page2;
