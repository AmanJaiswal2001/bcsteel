import React, { useState } from 'react'
import CardContainer from './CardContainer';
import { Link } from 'react-router-dom';

const Sidebar = ({activeType,setActiveType,items}) => {
    const [showCards, setShowCards] = useState("Hot rolled");
    return (
    <div className=' bg-[#f6f9ff] h-full rounded-lg'>
<div className='w-full pt-8   m-auto flex flex-col gap-5  justify-center items-start '>
    {/* <Link to="" 
    //  onClick={() => setShowCards(!showCards)}
    onClick={() => setActiveType("hot")}
     className=
     {` p-4 text-lg text-left m-auto rounded-lg  w-[80%] ${activeType==="hot"?"bg-[#e6f0ff] text-black font-semibold ":"text-blue-400"}`}>
        Hot rolled
    </Link>

    <Link to="" 
    //  onClick={() => setShowCards(!showCards)}
    onClick={() => setActiveType("cold")}
     className={` p-4 text-lg text-left m-auto  rounded-lg ${activeType==="cold"?"bg-[#e6f0ff] font-semibold text-black":"text-blue-400"} w-[80%]`}>
        cold rolled
    </Link> */}

    {items.map((item, idx) => (
          <Link
            key={idx}
            to={item.link || "#"}
            onClick={() => setActiveType(item.type)}
            className={`p-4 text-[1rem] text-left transition-all duration-300 ease-in-out cursor-pointer font-poppins m-auto rounded-lg w-[80%] ${
              activeType === item.type
                ? 'bg-[#e6f0ff] text-black font-bold'
                : 'text-[#12396d]'
            }`}
          >
            {item.label}
          </Link>
        ))}
   
</div>
    </div>
  )
}

export default Sidebar