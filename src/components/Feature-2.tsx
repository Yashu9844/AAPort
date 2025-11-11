'use client';

import { useState } from 'react';
import Image from 'next/image';

const ArrowUpRight = (props: React.SVGProps<SVGSVGElement>) => (
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

const features = [
  {
    title: 'Crafting Thoughtful Interfaces',
    image: '/images/pimg1.jpg',
  },
  {
    title: 'Building for Scale',
    image: '/images/pimg3.jpg',
  },
  {
    title: 'Engineering with Clarity',
    image: '/images/pimg10.jpg',
  },
  {
    title: 'Performance & Precision',
    image: '/images/pimg14.jpg',
  },
    {
    title: 'Crafting Thoughtful Interfaces',
    image: '/images/pimg1.jpg',
  },
];

export default function Feature2() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full  bg-black py-24 px-8 md:px-16">
      <div className="max-w-[95vw] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 lg:gap-40">
          

 <div className="relative h-full min-h-[400px] flex items-center">
            <div className="relative w-full h-full   overflow-hidden">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-200 ${
                    activeIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="cursor-pointer group relative"
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className={`flex items-start gap-6 transition-all duration-400 ease-out ${
                  activeIndex === index 
                    ? '-translate-y-2 opacity-100' 
                    : 'translate-y-0 opacity-70'
                }`}>
                  <div className="flex-1">
                    <h3 className={`font-kh-teka transition-all duration-400 ease-out ${
                      activeIndex === index ? 'text-white translate-x-1' : 'text-neutral-300 translate-x-0'
                    }`} style={{ 
                      fontSize: '20px', 
                      lineHeight: '26px', 
                      color: activeIndex === index ? 'rgb(255, 255, 255)' : 'rgb(229, 229, 229)'
                    }}>
                      {feature.title}
                    </h3>
                  </div>
                  
                  <div 
                    className="transition-all duration-400 ease-out"
                    style={{
                      transform: activeIndex === index ? 'translateX(6px) translateY(-2px) rotate(45deg)' : 'translateX(0) rotate(0)',
                      opacity: activeIndex === index ? 1 : 0.5
                    }}
                  >
                    <ArrowUpRight 
                      className={`w-6 h-6 transition-colors duration-300 ${
                        activeIndex === index ? 'text-teal-400' : 'text-neutral-500'
                      }`}
                    />
                  </div>
                </div>
                
                <div 
                  className={`mt-4 h-px transition-all duration-500 ease-out ${
                    activeIndex === index 
                      ? 'bg-gradient-to-r from-transparent via-teal-400/30 to-transparent opacity-100 scale-x-100' 
                      : 'bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 scale-x-0'
                  }`}
                  style={{ transformOrigin: 'left' }}
                ></div>
              </div>
            ))}
          </div>

         

        </div>
      </div>
    </div>
  );
}
