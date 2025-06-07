import React, { useState } from 'react'
import DroupdownMenu, { DropdownMenu2 } from './DroupdownMenu'
import image from "../../public/Group 611.png"

import { Link, useLocation } from 'react-router-dom'
import Header from './Header'
import { MobileSidebar } from './MobileSidebar'

const Nav = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const isHome = location.pathname === "/";
  return (
    <>
    <div className='absolute top-0 left-0  w-full z-50'>
   
    
    {/* <Header/> */}
    {/* <hr className='text-gray-400  mt-5 sm:mt-4 md:mt-4 lg:mt-4'></hr> */}
  {/* <div className='relative   flex items-center bg-yellow-400  pt-0 justify-between  '> */}

   {/* <div className='flex h-full  items-center justify-between gap-10  '> */}

   


   <div
  className={`fixed top-0 z-50 w-full transition-all duration-300 bg-black/40 backdrop-blur-md text-white`}
>


<div className="md:hidden  ">
          <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
  <div className="flex items-center md:justify-between  justify-center h-20 px-6">
    
    {/* Logo */}
    <div className="w-[14rem]">
      <Link to="/">
        <img
          src={image}
          alt="logo"
          className="w-full h-auto"
        />
      </Link>
    </div>

    {/* Menu Items */}
    <div className="hidden md:flex font-poppins justify-center  text-white text-[16px] gap-10 items-center">
      <Link className="font-medium font-poppins " to="/">Home</Link>
    
      <Link className="font-medium  font-poppins" to="/about">About</Link>
      <DroupdownMenu
        menuItems={["Hot Rolled", "Cold Rolled", "Steel"]}
        buttonName="Product"
      />
   
      <Link className="font-medium  font-poppins" to="/allblogs">Blog</Link>
      <Link className="font-medium  font-poppins" to="/contact">Contact</Link>
    </div>

    {/* Connect With Us */}
    <div className=" md:flex hidden">
      <DropdownMenu2 buttonName="Connect with us" />
    </div>
  </div>
</div>


   </div>
    {/* // </div> */}
       
    </>

      
    
    // </div>
    
  )
}

export default Nav