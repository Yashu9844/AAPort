'use client'

import React from 'react'
import ProjectCard from './ProjectCard'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const Projects = () => {
  const projects = [{ image1: '/images/pimg1.jpg', image2: '/images/pimg2.jpg' }, { image1: '/images/pimg3.jpg', image2: '/images/pimg4.jpg' }, { image1: '/images/pimg5.jpg', image2: '/images/pimg6.jpg' }, { image1: '/images/pimg7.jpg', image2: '/images/pimg8.jpg' },]

  gsap.registerPlugin(ScrollTrigger)
  useGSAP(function () {
    gsap.from('.hero', {
      height: '100px',
      stagger: {
        amount: 0.5,
      },
      scrollTrigger: {
        trigger: '.lol',
        markers: false,
        start: 'top 100%',
        end: 'top -150%',
        scrub: true
      }
    })
  })



  return (
    <div className='p-2 sm:p-3 lg:p-4 mb-[10vh] sm:mb-[15vh] lg:mb-[20vh]'>
      <div className='pt-[6vh] sm:pt-[8vh] md:pt-[10vh] lg:pt-[12vh]'>
        <h2 className='font-secondary text-white text-5xl sm:text-6xl md:text-7xl lg:text-[12vw] uppercase'>Projects</h2>
      </div>
      <div className='mt-8 sm:mt-12 md:mt-16 lg:mt-20 lol'>
        {projects.map(function (elem, idx) {
          return (
            <div key={idx} className='hero w-full h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[600px] flex lg:flex-row flex-col gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-2.5 lg:mt-3'>
              <ProjectCard image1={elem.image1} image2={elem.image2} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Projects
