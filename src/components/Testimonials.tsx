'use client'

import React from 'react'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechCorp',
      content: 'Working with this team has been transformative for our business. Their attention to detail and innovative solutions exceeded all expectations.',
      avatar: '/images/pimg1.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLabs',
      content: 'The level of professionalism and creativity brought to our project was outstanding. They delivered beyond what we imagined possible.',
      avatar: '/images/pimg2.jpg',
    },
    {
      name: 'Emma Davis',
      role: 'Founder',
      company: 'StartupHub',
      content: 'Exceptional work from start to finish. The team understood our vision and brought it to life with precision and care.',
      avatar: '/images/pimg3.jpg',
    },
  ]

  return (
    <section className="w-full bg-black text-white py-16 sm:py-20 lg:py-24">
      <div className="w-[95%] mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase mb-4">
            Testimonials
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl">
            What our clients say about working with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group relative bg-zinc-900 rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:bg-zinc-800 hover:scale-[1.02] border border-zinc-800 hover:border-zinc-700"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-6xl text-zinc-700 opacity-50 group-hover:opacity-70 transition-opacity">
                "
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  {testimonial.content}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-primary text-white font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
