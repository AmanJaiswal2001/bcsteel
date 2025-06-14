import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdKeyboardArrowLeft } from 'react-icons/md';
import { FaUserCircle, FaUserClock, FaIdCard } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const name = sessionStorage.getItem('adminName');
    setAdminName(name);
    console.log('Admin Name from sessionStorage (useEffect):', name);
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('adminName');
    navigate('/adminlogin');
  };

  return (
    <div id="main" className="h-screen flex">
      {/* Hamburger Menu Button for Mobile/Tablet */}
      <button
        onClick={toggleSidebar}
        className="pt-1 text-white fixed top-4 left-4 z-50 lg:hidden"
      >
        <svg className='text-gray-400' width="24" height="24" viewBox="0 0 24 24" fill="fill">
          <path
            d="M4 18H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 12L16 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 6L20 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`lg:w-[244px] bg-black lg:relative h-screen w-[204px] lg:opacity-100 backdrop-blur-md bg-opacity-40 lg:bg-opacity-100 lg:backdrop-blur-none ${
          sidebarOpen ? 'block' : 'hidden'
        } lg:block fixed z-40`}
      >
        {/* Collapse button on mobile/tablet */}
        <button
          id="collapse"
          onClick={toggleSidebar}
          className="lg:hidden ml-auto mt-5 text-2xl"
        >
          <MdKeyboardArrowLeft />
        </button>

        <div id="heading" className="flex pt-5 px-5">
          <img className="w-full object-cover" src="/Group 611.png" alt="Logo" />
        </div>

        <h1 className="text-white px-2 pt-5 text-lg font-semibold">
          👋Hello, {adminName ? adminName.split(' ')[0].slice(0, 12) : 'Admin'}
        </h1>

        {/* Sidebar Links */}
        <div
          id="sidebarButtons"
          className="lg:w-[80%] flex flex-col gap-4 lg:h-[50%] mx-auto"
        >
          <ul className="flex flex-col lg:gap-2 text-white gap-6 mx-3 pt-5 lg:mx-0">
            <Link
              to="/admindashboard"
              className={`flex items-center lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3 ${
                isActive('/admindashboard')
                  ? 'bg-white text-black outline border-none font-bold'
                  : 'bg-transparent'
              }`}
            >
              <span className="flex items-center gap-2 font-lato lg:text-sm text-xs">
                <MdDashboard className="text-xl" />
                Dashboard
              </span>
            </Link>

            <Link
              to="/allProduct"
              className={`flex items-center w-full lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3 ${
                isActive('/allProduct')
                  ? 'bg-white text-black outline border-none font-bold'
                  : 'bg-transparent'
              }`}
            >
              <span className="flex items-center gap-2 font-lato lg:text-sm text-xs">
                <FaUserCircle className="text-xl" />
                Product
              </span>
            </Link>

            <Link
              to="/allblogs"
              className={`flex items-center w-full lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3 ${
                isActive('/allblogs')
                  ? 'bg-white text-black outline border-none font-bold'
                  : 'bg-transparent'
              }`}
            >
              <span className="flex items-center gap-2 font-lato lg:text-sm text-xs">
                <FaIdCard className="text-xl" />
                Blogs
              </span>
            </Link>

            <Link
              to="/adminTestimonialcard"
              className={`flex items-center w-full lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3 ${
                isActive('/adminTestimonialcard')
                  ? 'bg-white text-black outline border-none font-bold'
                  : 'bg-transparent'
              }`}
            >
              <span className="flex items-center gap-2 font-lato lg:text-sm text-xs">
                <FaUserClock className="text-xl" />
                Testimonial
              </span>
            </Link>

            <Link
              to="#"
              className={`flex items-center w-full lg:h-[40px] h-[30px] rounded-[20px] hover:border hover:border-gray-300 text-center transition-all duration-300 px-3 ${
                isActive('#')
                  ? 'bg-white text-black outline border-none font-bold'
                  : 'bg-transparent'
              }`}
            >
              <span className="flex items-center gap-2 font-lato lg:text-sm text-xs">
                <FaUserClock className="text-xl" />
                User
              </span>
            </Link>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="lg:h-[10%] bg-white text-black mt-auto absolute bottom-0 left-0 w-full h-[61px]"
        >
          <span className="lg:w-full lg:h-full flex px-[30%] font-lato font-normal lg:text-base text-sm items-center hover:font-bold">
            <TbLogout className="lg:w-[24px] lg:h-[24px] mr-2" />
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
