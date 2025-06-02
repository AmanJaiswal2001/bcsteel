import React, { useRef, useEffect, useState } from 'react';

const sliderData = [
  {
    image: "/Slide1.jpg",
    topLeft: { title: "Naraina", subtitle: "Delhi" },
    bottomInfo: [
      { line1: "3.6 MTPA", line2: "Steel Production Capacity" },
      { line1: "1.3 MTPA", line2: "Direct Reduced Iron Plant (DRI)" },
      { line1: "1 MTPA", line2: "Plate Mill" },
      { line1: "1.5 MTPA", line2: "Rail Mill" },
    ],
  },
  {
    image: "/slider2.jpg",
    topLeft: { title: "Bawana", subtitle: "Delhi" },
    bottomInfo: [
      { line1: "3.6 MTPA", line2: "Steel Production Capacity" },
      { line1: "1.3 MTPA", line2: "Direct Reduced Iron Plant (DRI)" },
      { line1: "1 MTPA", line2: "Plate Mill" },
      { line1: "1.5 MTPA", line2: "Rail Mill" },
    ],
  },
  {
    image: "/slider3.jpg",
    topLeft: { title: "Faridabad", subtitle: "Haryana" },
    bottomInfo: [
      { line1: "3.6 MTPA", line2: "Steel Production Capacity" },
      { line1: "1.3 MTPA", line2: "Direct Reduced Iron Plant (DRI)" },
      { line1: "1 MTPA", line2: "Plate Mill" },
      { line1: "1.5 MTPA", line2: "Rail Mill" },
    ],
  },
];

const Sliderbaner = ({ onComplete, onBack }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalSlides = sliderData.length;
    const slideWidth = container.clientWidth;

    container.style.scrollSnapType = 'x mandatory';
    container.style.overflow = 'hidden';
    container.style.scrollBehavior = 'smooth';
    container.style.display = 'flex';

    const scrollToIndex = (index) => {
      container.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
      setCurrentIndex(index);
    };

    const handleWheel = (e) => {
      if (!canScroll) return;
      if (Math.abs(e.deltaY) < 5) return;

      e.preventDefault();
      setCanScroll(false);

      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = currentIndex + direction;

      if (newIndex >= totalSlides) {
        onComplete?.();
      } else if (newIndex < 0) {
        onBack?.();
      } else {
        scrollToIndex(newIndex);
      }

      setTimeout(() => {
        setCanScroll(true);
      }, 1000);
    };

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalSlides;
      scrollToIndex(nextIndex);
    }, 5000);
  
    container.addEventListener('wheel', handleWheel, { passive: false });
  
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearInterval(interval);
    };
  }, [currentIndex, canScroll, onComplete, onBack]);

  return (
    <div className="w-full h-full sm:mt-0">
      <div className="w-full h-[500px] overflow-hidden relative">
        {/* Slide Indicators (Dots) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {sliderData.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-white scale-125' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div ref={containerRef} className="w-full h-full flex scroll-smooth no-scrollbar">
          {sliderData.map((item, index) => (
            <div key={index} className="w-screen h-full flex-shrink-0 relative snap-start">
              <img src={item.image} alt={`slide-${index}`} className="w-full h-full object-cover" />

              {/* Top Left Text */}
              <div className="absolute top-10 sm:left-20 left-10 text-white">
                <p className="font-bold text-[36px] font-poppins">{item.topLeft.title}</p>
                <p className="font-medium text-[18px] font-poppins">{item.topLeft.subtitle}</p>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-10 left-[20%] sm:left-0 sm:w-full text-white md:px-20 xl:px-40">
                <div className="flex-col sm:flex sm:flex-row gap-5  bg-[#2241a6] opacity-80 rounded-xl p-4 shadow-md">
                  {item.bottomInfo.map((info, idx) => (
                    <div
                      key={idx}
                      className="sm:flex-1 border-t-2 border-b-2  my-2 border-orange-500 px-3 text-center"
                    >
                      <p className="font-poppins w-40 sm:w-full text-white sm:text-[36px] font-bold drop-shadow-md">
                        {info.line1}
                      </p>
                      <p className="font-poppins w-40 sm:w-full text-white sm:text-[18px] font-normal drop-shadow-sm">
                        {info.line2}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sliderbaner;
