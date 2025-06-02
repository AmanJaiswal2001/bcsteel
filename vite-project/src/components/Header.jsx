import React, { useState,useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import {MobileSidebar} from './MobileSidebar'
const Header = () => {
  const [search, setSearch] = useState('')
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const navigate = useNavigate()
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`)
    }
  }
  
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth < 768) { // Only apply on mobile views
        if (currentScrollY > lastScrollY) {
          setShowHeader(false); // Scrolling down
        } else {
          setShowHeader(true); // Scrolling up
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);




  return (
    <>
   <div className={`flex md:justify-between bg-white w-full gap-5 h-20 md:gap-0 fixed lg:static md:static sm:static z-40 lg:z-0 top-0 px-10 transition-transform duration-300 ${
  showHeader ? 'translate-y-0' : '-translate-y-full'
}`}> <div className="md:hidden bg-white ">
          <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
   
        {/* <div className={`transition-all duration-300 ${isSidebarOpen ? 'blur-sm pointer-events-none' : ''} w-full`}> */}
 

    <div className='md:flex w-full   md:items-center gap-0 mt-7  sm:mt-0 md:mt-0  md:gap-10  '> 
  
    
        <div className='xl:flex hidden md:w-full max-w-xxl   mt-1 sm:mt-0 md:mt-0  md:justify-center md:h-12 h-9  md:mx-20 md:items-center'>
            {/* search  */}
{/* <div className='flex  md:justify-center h-10  mx-20 items-center'> */}
<input type='search'
value={search}
onChange={(e) => setSearch(e.target.value)}
onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }}
    className='md:w-full w-[100%]  px-2 h-full border-1 border-gray-200 outline-0 rounded-l-2xl '
/>
<div className='md:h-12 md:w-[30%] h-9   '>
<button className='bg-[#12396d] md:h-12 md:w-28 w-[80%] cursor-pointer px-2  h-9 flex    items-center  rounded-r-xl text-white'>
<svg
className='text-xl  '
 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
 
<button onClick={handleSearch} className='flex w-20 font-medium cursor-pointer text-md font-poppins items-center px-2   '>
   Search
</button>
</button>
</div>





        {/* </div> */}
    </div>
        
         <div className='sm:flex hidden gap-4 items-center   '>
            {/* user */}
            <a href="tel:+919891998846" target='_blank' rel="noopener noreferrer" className="font-semibold text-[#12396d] w-36  text-[16px] font-poppins">+91-9891998846</a>
       <a  href="mailto:sonateksteels@gmail.com" target='_blank'  rel="noopener noreferrer" className="font-semibold  text-[#12396d]  text-[16px] font-poppins">sonateksteels@gmail.com</a>
        </div> 
{/* mobile views  */}
          
    </div>
    </div>
    <div className={`transition-all duration-300 ${isSidebarOpen ? 'blur-sm pointer-events-none' : ''}`}>

    <div className='sm:flex hidden xl:hidden justify-center items-center w-full mt-10 sm:mt-2 md:mt-2 h-10 md:h-12'>
    {/* search  */}
{/* <div className='flex  md:justify-center h-10  mx-20 items-center'> */}
<div className='flex w-[90%] sm:w-[90%] md:w-[90%]'>
  <input
    type='search'
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') handleSearch();
    }}
    className='w-full px-3 py-2 h-full border border-gray-200 outline-0 rounded-l-2xl'
  />
  <button onClick={handleSearch} className='bg-[#12396d] py-2 px-2 w-24 sm:w-28 h-full flex items-center justify-center rounded-r-xl text-white'>
    <svg className='text-xl' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
    <span className='ml-2 text-sm sm:text-md font-poppins'>Search</span>
  </button>
</div>






        </div> 
        </div>
        </>
  )
}

export default Header