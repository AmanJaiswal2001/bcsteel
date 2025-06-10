import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFetchTestimonial from "../hooks/useFetchTestimonial";

// Mock data for testimonials
// const testimonialList = [
//   {
//     author: {
//       fullName: "Arvind Mehta",
//       picture: "/testi.avif",
//       designation: "Founder / CEO",
//     },
//     rating: 3.5,
//     description:
//       "Sonatek's technical team is incredibly responsive. Whether it's a custom steel specification or a logistics query, they are always ready to assist with complete professionalism.",
//   },
//   {
//     author: {
//       fullName: "RShruti Verma",
// 	  picture: "/testi.avif",
//       designation: "Project Engineer",
//     },
//     rating: 3.8,
//     description:
//       "Sonatek's technical team is incredibly responsive. Whether it's a custom steel specification or a logistics query, they are always ready to assist with complete professionalism.",
//   },
  
//   {
//     author: {
//       fullName: "Neha Singh",
// 	  picture: "/testi.avif",
//       designation: "Sustainability Manager,",
//     },
//     rating: 4.5,
//     description:
//       "What impressed us most about Sonatek is their focus on sustainable sourcing and modern processing methods.",
//   },
//   {
//     author: {
//       fullName: "Ravi Deshmukh",
// 	  picture: "/testi.avif",
//       designation: "Operations Lead",
//     },
//     rating: 5.0,
//     description:
//       "Even after the order was fulfilled, Sonatek’s team ensured we had the necessary certifications, documentation, and post-delivery support. That level of care is rare in the steel industry",
//   },
//   {
//     author: {
//       fullName: "Rahul Khanna",
// 	  picture: "/testi.avif",
//       designation: "Tech Lead",
//     },
//     rating: 4.0,
//     description:
//       "The platform is intuitive and easy to navigate, making the entire process seamless and enjoyable.",
//   }
// ];




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
const TestimonialItem = ({ testimonial, isActive }) => (
  <div 
    className={`shadow-xl rounded-2xl w-full mt-4 h-64 transition-all duration-300 p-4 sm:p-6 
      ${isActive 
        ? "scale-110 z-10 bg-[#12396d] text-white" 
        : "scale-90 opacity-70 bg-white text-black "}`}
  >
    <div className="sm:mt-0   h-full">
      <Rating rating={testimonial.rating} />
      <p className={`sm:mb-6 sm:h-14 text-sm h-36 ${isActive ? "opacity-90" : "opacity-50"}`}>
        {testimonial.description}
      </p>
      <div className="flex items-center">
        <div className="mr-2">
          <img
            src={testimonial?.author?.picture}
            alt={testimonial?.author?.fullName}
            className="rounded-full border w-12 h-12 sm:w-20 sm:h-20"
           
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

// Main Testimonial component with carousel
export const  Testimonial=()=> {
  const { testimonial, loading, error } = useFetchTestimonial([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  // const [visibleTestimonials, setVisibleTestimonials] = useState([]);

  const [isMobile, setIsMobile] = useState(false);

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

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonial.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonial.length) % testimonial.length);
  };

  // Calculate visible testimonials for desktop view
  const getVisibleTestimonials = () => {
    if (isMobile) {
      // On mobile, show only current testimonial
      return [{ ...testimonial[currentIndex], isActive: true }];
    } else {
      // On desktop, show 3 testimonials (prev, current, next)
      const prevIndex = (currentIndex - 1 + testimonial.length) % testimonial.length;
      const nextIndex = (currentIndex + 1) % testimonial.length;
    
     
      return [
        { ...testimonial[prevIndex], isActive: false },
        { ...testimonial[currentIndex], isActive: true },
        { ...testimonial[nextIndex], isActive: false }
      ];
    }
  }
  const visibleTestimonials = getVisibleTestimonials();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading testimonials</div>;

  return (
    <section className=" px-10 w-[98%] py-5 sm:py-10 m-auto mt-5 sm:mt-0   border-t border-gray-900 bg-white  text-zinc-900 dark:text-white">
      <div className="  w-full  mx-auto">
        <div className="flex w-full justify-center md:mb-6">
          <div className="sm:w-full  text-center">
            <h2 className="text-3xl text-black leading-none md:text-4xl font-bold sm:mb-4">
              Testimonial
            </h2>
            {/* <p className="text-black ">
              It's easier to reach your savings goals when you have the right
              savings account. Take a look and find the right one for you!
            </p> */}
          </div>
        </div>
        
        <div className="relative mt-5 sm:mt-5">
          {/* Carousel navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 cursor-pointer -left-10 z-20">
            <button 
              onClick={goToPrev}
              className="p-2 rounded-full cursor-pointer bg-white shadow-lg dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          {/* Carousel items */}
          <div className="grid grid-cols-1 w-full   md:grid-cols-3 gap-0 sm:py-2 xl:px-5    px-5 ">
  {visibleTestimonials.map((item, index) => (
    <div 
      key={index}
      className={`transition-all w-full  duration-500 ${

        item.isActive ? "z-10 scale-100" : "z-0 scale-95"
      }`}
    >
      <div className="w-full     md:w-[450px] ">
        <TestimonialItem testimonial={item} isActive={item.isActive} />
      </div>
    </div>
  ))}
</div>

          
          <div className="absolute top-1/2 -translate-y-1/2 -right-10 cursor-pointer z-20">
            <button 
              onClick={goToNext}
              className="p-2 rounded-full cursor-pointer bg-white shadow-lg dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Carousel indicators */}
        <div className="flex justify-center mt-10 gap-2">
          {testimonial.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${index === currentIndex ? "bg-[#12396d] w-6" : "bg-gray-300 "}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}