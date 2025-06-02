import { useState, useEffect } from 'react';

export default function ColorChangeOnScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
 
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Get scroll position and page height
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
     
      // Calculate how far down the page the user has scrolled
      // Using a more sensitive factor (0.1) to make the effect more noticeable and faster
      const scrolled = Math.min(scrollTop / ((scrollHeight - clientHeight) * 0.1), 1);
      setScrollProgress(scrolled);
    };
   
    // Initialize scroll position
    handleScroll();
   
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
   
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 
  // Text content to display with scroll-based highlighting
  const topText = "Established in 2014, Sonatek Steels Pvt. Ltd. are the distributors of flat steel products in Northern India.";
  const bottomText = "SINGLE CLICK. YOU CAN MIX AND MATCH ALL THE DEMOS AND TEMPLATES!";
 
  // Calculate how much of the text should be visible based on scroll
  const textDivider = Math.floor(scrollProgress * topText.length);
 
  return (
    <div className="h-full flex bg-gray-50 flex-col sm:px-5">
      <div className="w-full h-full lg:w-4/5 xl:w-4/5 sm:mt-16 px-4 py-5 sm:py-8 relative">
        <div className="relative">
          {/* Top text - always visible, highlighted part */}
          <div className="w-52 h-12 gap-2 justify-center items-center bg-white flex border-gray-400 border rounded-full">
            <button className=""> SONATEK LEGACY</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"/>
            </svg>
          </div>
 
          <h1 className="sm:text-3xl text-2xl pt-5 font-poppins md:text-5xl h-full lg:text-6xl font-bold mb-0">
            <span className="text-gray-800">{topText.substring(0, textDivider)}</span>
            <span className="text-gray-300">{topText.substring(textDivider)}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}