import React, { useEffect, useState } from 'react';
import { FaSquareWhatsapp } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const image = [
 
   "/SONATEKBANNERS.jpg",
  "/SONATEKbaner2.jpg",
  "/SONATEKbaner3.jpg",
  
   "/sonatch.jpg",
];

const Crousel = () => {
  const [current, setCurrent] = useState(0);
  
  const nextSlide = () => {
    setCurrent(prev => (prev === image.length - 1 ? 0 : prev + 1));
  };
  
  const previousSlide = () => {
    setCurrent(prev => (prev === 0 ? image.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);
  
  const sliderRef = React.useRef(null);
  
  const settings = {
    className: "center",
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // ease-out animation
    fade: false,
    beforeChange: (current, next) => setCurrent(next),
    arrows: false, // Disable default arrows to use custom ones
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  };
  
  return (
    <div className="relative h-full sm:h-screen   w-full mx-auto overflow-hidden ">
      <Slider ref={sliderRef} {...settings}>
        {image.map((item, index) => (
          <div key={index} className="pt-20 md:pt-0 w-full object-cover h-auto sm:h-screen outline-none">
            {/* <div className="relative"> */}
              <img 
                className="w-full h-1/2 sm:h-full object-cover transform transition-transform duration-500" 
                src={item} 
                alt={`slide-${index}`}
              />
              {/* <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 transform transition-all duration-700 ease-out">
                <button className="flex items-center gap-2 p-2 rounded-lg bg-[#12396d] shadow-lg hover:bg-[#1a4d8c] transition-all duration-300">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaSquareWhatsapp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </a>
                  <span className="text-white text-sm font-medium hidden sm:block">Connect on WhatsApp</span>
                </button>
              </div> */}
            </div>
       
        ))}
      </Slider>
      
      {/* Custom Navigation Arrows */}
      <button 
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2   hidden lg:flex  lg:items-center  lg:justify-center cursor-pointer  p-4  z-20 transition-all duration-300"
      >
       <div className="w-10 h-10  flex items-center justify-center">
  <svg className='' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="white" d="m3.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675T.825 12t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"/>
  </svg>
</div>
      </button>
      
      <button 
        onClick={() => sliderRef.current.slickNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center cursor-pointer text-white p-4 rounded-full z-20  transition-all duration-300"
      >
      <div className="w-10 h-10  flex items-center justify-center">

        <svg  className =" " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"/>
        </svg>
        </div>
      </button>
      
      {/* Indicator Dots */}
      <div className="absolute bottom-4  left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {image.map((_, index) => (
          <button
            key={index}
            onClick={() => sliderRef.current.slickGoTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Crousel;

export const CrouselCard = ({ images }) => {
  const sliderRef = React.useRef(null);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // ease-out animation
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    className: "center",
  };

  return (
    <div className="carousel-container w-full shrink-0 sm:max-w-4xl mx-auto overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <div className="outline-none sm:px-2" key={index}>
            <div className="transform transition-all duration-500 ease-out">
              <img 
                className="w-full rounded-lg shadow-lg" 
                src={src} 
                alt={`carousel-${index}`} 
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};