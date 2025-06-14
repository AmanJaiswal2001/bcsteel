import React, { useState, useEffect } from "react";
import useFetchTestimonial from "../../hooks/useFetchTestimonial";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE
// Rating component
const Rating = ({ rating }) => {
  return (
    <div className="flex mb-6 text-yellow-500">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= Math.floor(rating) ? (
            // Full star
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ) : star === Math.ceil(rating) && !Number.isInteger(rating) ? (
            // Half star
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              <path
                className="text-yellow-200 fill-current"
                d="M12 17.27V2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
              />
            </svg>
          ) : (
            // Empty star
            <svg className="w-5 h-5 text-yellow-200 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
};

// TestimonialItem component
const TestimonialItem = ({ testimonial }) => (
    
  <div className="shadow-xl rounded-lg bg-[#12396d] w-full mt-4 h-64 transition-all duration-300 p-4 sm:p-6  text-white">
    <div className="sm:mt-0 h-full">
      <Rating rating={testimonial.rating} />
      <p className="sm:mb-6 text-wrap break-words sm:h-14 text-sm h-36 opacity-90">{testimonial.description}</p>
      <div className="flex pb-5 items-center">
        <div className="">
          <img
           src={`${BASE_URL}${testimonial.author.picture}`}
  
           
            alt={testimonial.author.fullName}
            className="rounded-full  object-cover w-12 h-12 sm:w-20 sm:h-20"
          />
        </div>
        <div>
          <h4 className="sm:text-xl text-[12px] font-medium">{testimonial?.author?.fullName}</h4>
          <p className="sm:text-sm text-[8px]">
            <i>{testimonial?.author?.designation}</i>
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Main Testimonial component
export const AdminTestimonialCard = () => {
  const { testimonial, loading, error } = useFetchTestimonial([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add listener for resize events
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Calculate visible testimonials for desktop view
  const getVisibleTestimonials = () => {
    // On desktop, show 3 testimonials in a grid
    return testimonial.slice(0, 3);
  };

  const visibleTestimonials = getVisibleTestimonials();

const navigate=useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading testimonials</div>;
const isAdmin=sessionStorage.getItem('isAdmin')==='true'
  return (

    <div className="flex h-screen overflow-y-hidden">
    {isAdmin&&(
        <AdminSidebar/>
    )}
  <section className=" w-full  h-full bg-white  overflow-y-auto    sm:mt-0    ">
      <div className="w-full mx-auto p-10">
        <div className="flex w-full justify-between  ">
          <div className="w-full text-start flex justify-between items-center">
            <h2 className="text-2xl text-black leading-none  font-bold sm:mb-4">
              Testimonial({testimonial.length})
            </h2>
            {isAdmin && (
          <div className="flex justify-end md:px-10 ">
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate('/createtestimonial')}
            >
           {isMobile?<svg className='' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V20M20 12L4 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>:" Add Testimonial"}
            </button>
          </div>
        )}
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonial.map((item, index) => (
            <div key={index} className="transition-all  duration-500">
              <TestimonialItem testimonial={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  
  );
};
