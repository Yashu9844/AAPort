"use client";
import { useEffect } from "react";
import Link from "next/link";

const ArrowUpRight = (props: any) => (
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
      type: "SNAPSHOT",
      title: "Robinhood Onboarding",
      subtitle: "Brand Experience Design",
      image: "/images/pimg9.jpg",
      image2: "/images/pimg10.jpg",
      link: "/case-study-1",
      hasGooey: true,
    },
    {
      type: "SNAPSHOT",
      title: "Mixpanel Rebrand",
      subtitle: "Brand Identity & Design System",
      image: "/images/pimg11.jpg",
      image2: "/images/pimg12.jpg",
      link: "/case-study-2",
      hasGooey: true,
    },
    {
      type: "SNAPSHOT",
      title: "Meta System Iconography",
      subtitle: "Icon Design & Visual Language",
      image: "/images/pimg13.jpg",
      image2: "/images/pimg14.jpg",
      link: "/case-study-3",
      hasGooey: true,
    },
    {
      type: "SNAPSHOT",
      title: "Product Development",
      subtitle: "Full Stack Application",
      image: "/images/pimg15.jpg",
      image2: "/images/pimg16.jpg",
      link: "#",
      hasGooey: true,
    },
  ];

  useEffect(() => {
    const initShery = () => {
      // Check if all dependencies are loaded
      if (typeof window === "undefined") {
        setTimeout(initShery, 100);
        return;
      }

      const hasGSAP = !!(window as any).gsap;
      const hasThree = !!(window as any).THREE;
      const hasShery = !!(window as any).Shery;

      console.log('📦 Dependencies:', { hasGSAP, hasThree, hasShery });

      if (!hasGSAP || !hasThree || !hasShery) {
        setTimeout(initShery, 100);
        return;
      }

      const Shery = (window as any).Shery;
      
      // Wait for images to load
      const images = document.querySelectorAll('.image-div img');
      if (images.length === 0) {
        setTimeout(initShery, 100);
        return;
      }

      const allLoaded = Array.from(images).every((img: any) => {
        return img.complete && img.naturalHeight !== 0;
      });

      if (!allLoaded) {
        setTimeout(initShery, 100);
        return;
      }

      // Initialize the effect
      setTimeout(() => {
        try {
          console.log('🔍 Initializing Shery on elements:', document.querySelectorAll('.image-div'));
          console.log('🖼️ Images found:', images.length);
          console.log('🤖 Shery methods:', Object.keys(Shery));
          
          const result = Shery.imageEffect(".image-div", {
            style: 5,
            gooey: true,
            config: {
              a: { value: 2, range: [0, 30] },
              b: { value: 0.75, range: [-1, 1] },
              zindex: { value: -9996999, range: [-9999999, 9999999] },
              aspect: { value: 0.7241195453907675 },
              gooey: { value: true },
              infiniteGooey: { value: false },
              growSize: { value: 4, range: [1, 15] },
              durationOut: { value: 1, range: [0.1, 5] },
              durationIn: { value: 1.5, range: [0.1, 5] },
              displaceAmount: { value: 0.5 },
              masker: { value: true },
              maskVal: { value: 1.23, range: [1, 5] },
              scrollType: { value: 0 },
              geoVertex: { range: [1, 64], value: 1 },
              noEffectGooey: { value: false },
              onMouse: { value: 1 },
              noise_speed: { value: 0.5, range: [0, 10] },
              metaball: { value: 0.33, range: [0, 2] },
              discard_threshold: { value: 0.5, range: [0, 1] },
              antialias_threshold: { value: 0.01, range: [0, 0.1] },
              noise_height: { value: 0.5, range: [0, 2] },
              noise_scale: { value: 10, range: [0, 100] },
            },
          });
          console.log('✅ Shery.js effect initialized, result:', result);
          
          // Check what Shery did to the elements
          setTimeout(() => {
            const divs = document.querySelectorAll('.image-div');
            console.log('📍 Image divs after Shery:', divs.length);
            divs.forEach((div: any, i) => {
              console.log(`Div ${i}:`, {
                opacity: window.getComputedStyle(div).opacity,
                display: window.getComputedStyle(div).display,
                hasCanvas: !!div.querySelector('canvas'),
                childrenCount: div.children.length,
                html: div.innerHTML.substring(0, 200)
              });
            });
            
            // Check for Shery effect containers
            const sheryContainers = document.querySelectorAll('[class*="_canvas"], canvas');
            console.log('🎪 Shery/Canvas containers in DOM:', sheryContainers.length);
            sheryContainers.forEach((container: any) => {
              console.log('Container:', {
                className: container.className,
                id: container.id,
                width: container.width || container.offsetWidth,
                height: container.height || container.offsetHeight,
                parent: container.parentElement?.className
              });
            });
          }, 500);
        } catch (error) {
          console.error('❌ Shery error:', error);
        }
      }, 200);
    };

    // Start checking after a delay
    setTimeout(initShery, 1000);
  }, []);

  return (
    <div className="relative min-h-screen bg-black w-full text-white flex justify-center">
      <div className="w-[95%] py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="group cursor-pointer">
            <Link href={project.link}>
              <div className="mb-4">
                <p className="uppercase text-xs tracking-widest text-gray-400 mb-2">
                  {index === 0 ? "📸" : "📄"} {project.type}
                </p>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-medium relative">
                    {project.title}
                    <ArrowUpRight
                      className="w-4 h-4 absolute -right-6 top-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    />
                  </h2>
                </div>
                <p className="text-gray-400 text-sm">{project.subtitle}</p>
              </div>
            </Link>

            {/* Image - NOT wrapped in Link */}
            {project.hasGooey ? (
              <div className="image-div">
                <img src={project.image} alt="" />
                <img src={project.image2} alt="" />
              </div>
            ) : (
              <Link href={project.link}>
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page2;
