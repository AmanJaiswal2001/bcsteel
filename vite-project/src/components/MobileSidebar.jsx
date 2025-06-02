import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import image from "../../public/Group 611.png"

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Handler to close the sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };
  
  // Add event listener to document body for global click detection
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const sidebar = document.getElementById("mobile-sidebar");
      if (sidebar && !sidebar.contains(e.target)) {
        setIsOpen(false);
      }
    };
  
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
  
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);
  
  // Prevent event propagation when clicking inside the sidebar
  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Hamburger Button - stopPropagation to prevent closing immediately */}
      <button
        onClick={(e) => {
          handleSidebarClick(e);
                   setIsOpen(true);
        }}
        className="p-2 text-white fixed top-4 left-0 z-50 rounded"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 18H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            key="close-btn"
            onClick={(e) => {
        handleSidebarClick(e);
              closeSidebar();
            }}
            className="fixed top-1 right-4 z-60 p-2 text-white rounded-full shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275z"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar - with stopPropagation to prevent clicks inside from closing */}
      <motion.div
        id="mobile-sidebar"
        onClick={(e) => e.stopPropagation()}
        className="fixed top-0 left-0 h-screen w-[70%] bg-black/60 shadow-lg z-50 flex flex-col"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Logo section */}
        <div className="flex items-center px-4 pt-5 justify-between text-white">
          <div className="w-[14rem]">
            <Link to="/">
              <img
                src={image}
                alt="logo"
                className="w-full h-auto"
              />
            </Link>
          </div>
        </div>

        {/* Links */}
        <ul className="w-full h-screen px-4 bg-black/60 text-lg mt-5 flex flex-col gap-5 font-semibold font-poppins text-white">
          <li className="">
            <Link to="/" onClick={closeSidebar}>Home</Link>
          </li>

          <li>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full"
            >
              Products {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  key="dropdown"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <li><Link to="/hotRolled/sheet" onClick={closeSidebar} className="block py-2">Hot Rolled Sheet</Link></li>
                  <li><Link to="/hotRolled/coils" onClick={closeSidebar} className="block py-2">Hot Rolled Coils</Link></li>
                  <li><Link to="/coldRolled/sheet" onClick={closeSidebar} className="block py-2">Cold Rolled Sheet</Link></li>
                  <li><Link to="/coldRolled/coils" onClick={closeSidebar} className="block py-2">Cold Rolled Coils</Link></li>
                  <li><Link to="/mildStainless" onClick={closeSidebar} className="block py-2">Steel</Link></li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li><Link to="/about" onClick={closeSidebar}>About</Link></li>
          <li><Link to="/contact" onClick={closeSidebar}>Contact</Link></li>
          <li><Link className="font-medium  font-poppins" to="/allblogs">Blog</Link></li>
    
        </ul>

        <div className="relative">
          <div className="absolute left-3 bottom-20">
            <div className="flex gap-1 items-center mt-10">
              <div>
                <a href="mailto:sonateksteels@gmail.com" target="_blank">
                  <svg className="text-white rounded-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></svg>
                </a>
              </div>
              <div>
                <a href="mailto:sonateksteels@gmail.com" className="flex gap-0 items-center">
                  <span className="text-white text-lg w-52 font-bold overflow-hidden whitespace-nowrap text-ellipsis" title="sonateksteels@gmail.com">
                    sonateksteels@gmail.com
                  </span>
                </a>
              </div>
            </div>

            <div className='flex justify-center mt-10 gap-5 w-40'>
              <a target='_blank' href='https://www.youtube.com/channel/UCUmUCit141YxyIbTmjioJfA' className="link link-hover">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M21.582,6.186c-0.23,-0.86 -0.908,-1.538 -1.768,-1.768c-1.56,-0.418 -7.814,-0.418 -7.814,-0.418c0,0 -6.254,0 -7.814,0.418c-0.86,0.23 -1.538,0.908 -1.768,1.768c-0.418,1.56 -0.418,5.814 -0.418,5.814c0,0 0,4.254 0.418,5.814c0.23,0.86 0.908,1.538 1.768,1.768c1.56,0.418 7.814,0.418 7.814,0.418c0,0 6.254,0 7.814,-0.418c0.861,-0.23 1.538,-0.908 1.768,-1.768c0.418,-1.56 0.418,-5.814 0.418,-5.814c0,0 0,-4.254 -0.418,-5.814zM10,14.598v-5.196c0,-0.385 0.417,-0.625 0.75,-0.433l4.5,2.598c0.333,0.192 0.333,0.674 0,0.866l-4.5,2.598c-0.333,0.193 -0.75,-0.048 -0.75,-0.433z"/>
                  </g>
                </svg>
              </a>
              <a target='_blank' href="https://www.instagram.com/sonateksteels/" className="link link-hover" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M8,3c-2.761,0 -5,2.239 -5,5v8c0,2.761 2.239,5 5,5h8c2.761,0 5,-2.239 5,-5v-8c0,-2.761 -2.239,-5 -5,-5zM18,5c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM12,7c2.761,0 5,2.239 5,5c0,2.761 -2.239,5 -5,5c-2.761,0 -5,-2.239 -5,-5c0,-2.761 2.239,-5 5,-5zM12,9c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z" />
                  </g>
                </svg>
              </a>
              <a target='_blank' href="https://www.facebook.com/people/Sonatek-Steels-Private-Limited/61557799228243/" className="link link-hover" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h7.621v-6.961h-2.343v-2.725h2.343v-2.005c0,-2.324 1.421,-3.591 3.495,-3.591c0.699,-0.002 1.397,0.034 2.092,0.105v2.43h-1.428c-1.13,0 -1.35,0.534 -1.35,1.322v1.735h2.7l-0.351,2.725h-2.365v6.965h3.586c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2z" />
                  </g>
                </svg>
              </a>
              <a target='_blank' href="https://www.linkedin.com/in/adish-jain-b10107310/?originalSubdomain=in" className="link link-hover" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2zM9,17h-2.523v-7h2.523zM7.694,8.717c-0.771,0 -1.286,-0.514 -1.286,-1.2c0,-0.686 0.514,-1.2 1.371,-1.2c0.771,0 1.286,0.514 1.286,1.2c0,0.686 -0.514,1.2 -1.371,1.2zM18,17h-2.442v-3.826c0,-1.058 -0.651,-1.302 -0.895,-1.302c-0.244,0 -1.058,0.163 -1.058,1.302v3.826h-2.523v-7h2.523v0.977c0.325,-0.57 0.976,-0.977 2.197,-0.977c1.221,0 2.198,0.977 2.198,3.174z" />
                  </g>
                </svg>
              </a>
            </div>

            {/* <div className='flex justify-center mt-10 gap-5 w-40'>
             
              <a className="link link-hover">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M21.582,6.186c-0.23,-0.86 -0.908,-1.538 -1.768,-1.768c-1.56,-0.418 -7.814,-0.418 -7.814,-0.418c0,0 -6.254,0 -7.814,0.418c-0.86,0.23 -1.538,0.908 -1.768,1.768c-0.418,1.56 -0.418,5.814 -0.418,5.814c0,0 0,4.254 0.418,5.814c0.23,0.86 0.908,1.538 1.768,1.768c1.56,0.418 7.814,0.418 7.814,0.418c0,0 6.254,0 7.814,-0.418c0.861,-0.23 1.538,-0.908 1.768,-1.768c0.418,-1.56 0.418,-5.814 0.418,-5.814c0,0 0,-4.254 -0.418,-5.814zM10,14.598v-5.196c0,-0.385 0.417,-0.625 0.75,-0.433l4.5,2.598c0.333,0.192 0.333,0.674 0,0.866l-4.5,2.598c-0.333,0.193 -0.75,-0.048 -0.75,-0.433z"/>
                  </g>
                </svg>
              </a>
              <a href="#" className="link link-hover" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M8,3c-2.761,0 -5,2.239 -5,5v8c0,2.761 2.239,5 5,5h8c2.761,0 5,-2.239 5,-5v-8c0,-2.761 -2.239,-5 -5,-5zM18,5c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM12,7c2.761,0 5,2.239 5,5c0,2.761 -2.239,5 -5,5c-2.761,0 -5,-2.239 -5,-5c0,-2.761 2.239,-5 5,-5zM12,9c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z" />
                  </g>
                </svg>
              </a>
              <a href="#" className="link link-hover" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h7.621v-6.961h-2.343v-2.725h2.343v-2.005c0,-2.324 1.421,-3.591 3.495,-3.591c0.699,-0.002 1.397,0.034 2.092,0.105v2.43h-1.428c-1.13,0 -1.35,0.534 -1.35,1.322v1.735h2.7l-0.351,2.725h-2.365v6.965h3.586c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2z" />
                  </g>
                </svg>
              </a>
              <a href="#" className="link link-hover" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24px" height="24px" fill="white">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M19,3h-14c-1.105,0 -2,0.895 -2,2v14c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-14c0,-1.105 -0.895,-2 -2,-2zM9,17h-2.523v-7h2.523zM7.694,8.717c-0.771,0 -1.286,-0.514 -1.286,-1.2c0,-0.686 0.514,-1.2 1.371,-1.2c0.771,0 1.286,0.514 1.286,1.2c0,0.686 -0.514,1.2 -1.371,1.2zM18,17h-2.442v-3.826c0,-1.058 -0.651,-1.302 -0.895,-1.302c-0.244,0 -1.058,0.163 -1.058,1.302v3.826h-2.523v-7h2.523v0.977c0.325,-0.57 0.976,-0.977 2.197,-0.977c1.221,0 2.198,0.977 2.198,3.174z" />
                  </g>
                </svg>
              </a>
            </div> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};