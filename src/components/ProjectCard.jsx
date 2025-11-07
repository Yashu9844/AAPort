import React, { useState } from 'react'

const ProjectCard = (props) => {
    const [leftActive, setLeftActive] = useState(false)
    const [rightActive, setRightActive] = useState(false)

    return (
        < >
            <div
                className='lg:w-1/2 group h-1/2 lg:h-full transition relative overflow-hidden cursor-pointer select-none'
                onClick={() => setLeftActive((v) => !v)}
                onTouchStart={() => setLeftActive((v) => !v)}
            >
                <img className='h-full w-full object-cover' src={props.image1} alt="xyz" />
                <div className={`absolute top-0 left-0 flex items-center text-center justify-center h-full w-full bg-black/10 transition-opacity duration-200 ${leftActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <h2 className='font-[font1] uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl border-2 p-3 text-white border-white rounded-full'>View Project</h2>
                </div>
            </div>
            <div
                className='lg:w-1/2 group h-1/2 lg:h-full transition relative overflow-hidden cursor-pointer select-none'
                onClick={() => setRightActive((v) => !v)}
                onTouchStart={() => setRightActive((v) => !v)}
            >
                <img className='h-full w-full object-cover' src={props.image2} alt="" />
                <div className={`absolute top-0 left-0 flex items-center text-center justify-center h-full w-full bg-black/10 transition-opacity duration-200 ${rightActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <h2 className='font-[font1] uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl border-2 p-3 text-white border-white rounded-full'>View Project</h2>
                </div>
            </div>
        </>
    )
}

export default ProjectCard
