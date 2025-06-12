import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard, MdKeyboardArrowLeft, MdEventRepeat } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaUserClock, FaCreditCard,FaIdCard } from "react-icons/fa6";

import { TbLogout } from "react-icons/tb";
import { useNavigate, useLocation } from 'react-router-dom';




const AdminSidebar = () => 
{
  
   const [sidebarOpen, setSidebarOpen] = useState(false);

   const [adminName, setAdminName] = useState(null);
   useEffect(() => {
    const name = sessionStorage.getItem("adminName");
    setAdminName(name);
    console.log("Admin Name from sessionStorage (useEffect):", name);
  
  }, []);

  

  const isActive = (path) => location.pathname === path;


  const toggleSidebar = () =>
  {
    setSidebarOpen(!sidebarOpen)
  }

  const navigate = useNavigate();
  const location = useLocation();
  // const adminName = sessionStorage.getItem("adminName");
  
  const handleLogout = () =>
  {
    // localStorage.removeItem("employeeData")
    // localStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("isAdmin");
sessionStorage.removeItem("adminName");
    navigate("/adminlogin");
  };

  return (

    <div
    id='main'
    className='h-screen'>

      {/* {!sidebarOpen && (

        <button
        id='openSidebar'
        onClick={toggleSidebar}
        className='lg:hidden text-2xl absolute top-5 left-5'>
          <RiMenu5Fill />
        </button>

      )} */}

      <div 
      id='sidebar'
      className={`lg:w-[244px] bg-black lg:relative h-screen w-[204px]  lg:opacity-100 backdrop-blur-md bg-opacity-40 lg:bg-opacity-100 lg:backdrop-blur-none 
      ${sidebarOpen ? 'block' : 'hidden'} lg:block fixed z-40`}>

        <button 
        id='collapse'
        onClick={toggleSidebar}
        className='lg:hidden ml-44 mt-5 text-2xl'><MdKeyboardArrowLeft/></button>

        <div 
        id="heading"
        className='flex pt-5 px-5'>

          <img 
          className=' '
          src="/Group 611.png" 
          alt="Logo" />

        

        </div>


        <h1 className='text-white px-10 pt-5 text-lg font-semibold'>
        👋Hello,  {adminName || "Admin"}
</h1>
        <div 
        id="sidebarButtons"
        className='lg:w-[80%] flex flex-col  gap-4 lg:h-[50%] mx-auto '>

          <ul 
          className='flex flex-col lg:gap-2 text-white gap-6 mx-3  pt-5 lg:mx-0'>
          
            <Link 
            to="/admindashboard"
            className={`flex items-center lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3
            ${isActive("/admindashboard") 
            ? 'bg-white text-black outline border-none font-bold' 
            : 'bg-transparent'}`}>
              <span className='flex items-center gap-2 font-lato lg:text-sm text-xs'>
                <MdDashboard className='text-xl'/>
                Dashboard
              </span>
            </Link>

            <Link 
            to="/allProduct"
            className={`flex items-center w-full lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3
              ${isActive("/allProduct") 
              ? 'bg-white text-black outline border-none font-bold' 
              : 'bg-transparent'}`}>
              <span className='flex items-center gap-2 font-lato lg:text-sm text-xs'>
                <FaUserCircle className='text-xl'/>
                Product
              </span>
            </Link>

            <Link 
            to="/allblogs"
            className={`flex items-center w-full lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3
              ${isActive("/allblogs") 
              ? 'bg-white text-black outline border-none font-bold' 
              : 'bg-transparent'}`}>
              <span className='flex items-center gap-2 font-lato lg:text-sm text-xs'>
                <FaIdCard className='text-xl'/>
                Blogs
              </span>
            </Link>

            <Link 
            to="/adminTestimonialcard"
            className={`flex items-center w-full lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3
              ${isActive("/adminTestimonialcard") 
              ? 'bg-white text-black outline border-none font-bold' 
              : 'bg-transparent'}`}>
              <span className='flex items-center gap-2 font-lato lg:text-sm text-xs'>
                <FaUserClock className='text-xl'/>
                Testimonial
              </span>
            </Link>


            <Link 
            to="#"
            className={`flex items-center w-full lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3
              ${isActive("#") 
              ? 'bg-white text-black outline border-none font-bold' 
              : 'bg-transparent'}`}>
              <span className='flex items-center gap-2 font-lato lg:text-sm text-xs'>
                <FaUserClock className='text-xl'/>
               User
              </span>
            </Link>

         

            {/* {payrollDropdownOpen && (
                <div className="w-[70%] lg:h-[40px] h-[30px] hover:border-gray-300 hover:border rounded-[20px] transition-all duration-300 ml-auto">
                  <Link to="/employerPayslip" className={`w-full lg:h-[40px] h-[30px] flex items-center pl-2`}>
                    <span className="flex font-lato lg:text-sm text-xs font-normal gap-2">
                      <RiBillFill className="text-xl" />
                      Payslip
                    </span>
                  </Link>
                </div>
              )} */}

        

            </ul>

          </div>

        <button 
        onClick={handleLogout} 
        className='lg:h-[10%] bg-white text-black mt-auto absolute bottom-0 left-0 w-full  h-[61px]  '>
          <span className='lg:w-full lg:h-full flex px-[30%] font-lato font-normal lg:text-base text-sm items-center hover:font-bold'>
            <TbLogout className='lg:w-[24px] lg:h-[24px] mr-2'/>
            Logout
          </span>
        </button>

      </div>

    </div>
  )
}

export default  AdminSidebar