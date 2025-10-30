import React from 'react'

const ProjectCard = (props) => {
    
    return (
        < >
            <div className='lg:w-1/2 group h-full transition relative hover:rounded-[50px] overflow-hidden'>
                <img className='h-full w-full object-cover' src={props.image1} alt="xyz" />
                <div className=' opacity-0 group-hover:opacity-100 absolute top-0 left-0 flex items-center text-center justify-center h-full w-full bg-black/10'>
                    <h2 className='font-[font1] uppercase text-6xl border-2  p-3 text-white border-white rounded-full '>View Project</h2>
                </div>
            </div>
            <div className='lg:w-1/2 group h-full transition relative hover:rounded-[50px] overflow-hidden'>
                <img className='h-full w-full object-cover' src={props.image2} alt="" />
                <div className=' opacity-0 group-hover:opacity-100 absolute top-0 left-0 flex items-center text-center justify-center h-full w-full bg-black/10'>
                    <h2 className='font-[font1] uppercase text-6xl border-2  p-3 text-white border-white rounded-full '>View Project</h2>
                </div>
            </div>
        </>
    )
}

export default ProjectCard