import React from 'react'
import { motion } from "framer-motion"
export const Founder = () => {
  return (
    <div className="w-full flex flex-col gap-5 lg:flex-row justify-between sm:px-6 lg:px-10  sm:pt-8 lg:pt-0">
    {/* Left Image Section */}
    <div className="w-full lg:w-[40%] flex justify-center sm:mb-8 lg:mb-0">
  <motion.div
    className="w-[90%] sm:w-[550px]"
    initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -5 }}
    whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
    whileHover={{ scale: 1.05 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <img
      className="w-full h-full rounded-lg sm:h-[500px] object-cover"
      src="/indus.png"
      alt="Founder"
    />
  </motion.div>
</div>

  
    {/* Right Text Section */}
    <div className="w-full lg:w-[60%] flex flex-col justify-center  px-4 sm:px-6 lg:px-0">
      <div className="w-10 mb-2 hidden md:block">
        <img src="/quotation-mark-svgrepo-com (2).svg" alt="Quote Mark" />
      </div>
  
      <div className="text-center sm:text-left">
        <p className="font-semibold text-[24px] sm:text-[28px] text-[#12396d] font-poppins leading-snug">
          At Sonatek, we take pride in our extensive experience in the steel and industrial solutions sector.
        </p>
  
        <p className="text-[16px] sm:text-[18px] font-medium text-gray-700 mt-5">
          Our team brings decades of expertise in handling Hot Rolled, Cold Rolled, Galvanized, and Pickled & Oiled steel products. We specialize in sourcing, processing, and supplying steel in customized formats — ensuring clients receive precisely what they need, when they need it.
        </p>
  
        <p className="font-semibold text-[24px] sm:text-[28px] pt-6 text-[#12396d] font-poppins">
          Adish Jain
        </p>
        <p className="text-[16px] sm:text-[18px] font-medium text-gray-700">Director, Sonatek</p>
  
        <div className="bg-[#12396d] w-[95%] sm:w-[60%] md:w-[40%] h-14 mt-6 rounded-2xl cursor-pointer flex items-center justify-center text-white group overflow-hidden mx-auto sm:mx-0">
          <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
            />
          </svg>
          <button className="font-medium text-[16px] sm:text-[18px] font-poppins group-hover:translate-x-1 group-hover:opacity-100 duration-300 relative z-10">
            Know His Story
          </button>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Founder