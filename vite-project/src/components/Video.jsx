import React from 'react'

import ReactPlayer from 'react-player'
import NewCard from './NewCard'
const Video = () => {
  return (
    <div>

<div className="   mb-20 lg:pt-20 pt-5">
  <div className="relative   justify-between gap-5  flex flex-col-reverse   lg:flex lg:flex-row w-full">
    {/* <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" */}
<div className='w-full h-[550px]'>
<img className='w-full h-full' src="/videobaner.jpg"/>
</div>     
    

<div className='absolute px-10 gap-10 top-20 flex'>

    <div className='lg:w-1/2 flex flex-col gap-3 pt-5'>
      {/* <p className="text-5xl  font-extrabold font-poppins uppercase text-[#12396d] ">Your one stop solution   </p> */}
      {/* <p className="text-5xl leading-16 font-extrabold font-poppins uppercase text-[#12396d] ">for your industrial needs</p> */}
      {/* <p className="font-medium md:text-2xl text-white  text-lg  font-poppins border-box"> */}
       
       <NewCard/>
        {/* </p> */}
    
    </div>
    <div className='w-1/2'>
    <div className="flex justify-center overflow-hidden">
            <ReactPlayer
              url="/sonatekvideo.mp4" // Replace with your local or hosted video URL
              controls
              width="1000px"
                height="300px"
              className="rounded-lg shadow-md"
            />
          </div>
</div>
  </div>
</div>
</div>

    </div>
  )
}

export default Video