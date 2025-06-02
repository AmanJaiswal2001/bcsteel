import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Expandingcard=()=> {
  const cards = [
    { 
      id: 1, 
      text: "HR Sheets", 
      description: "Explore",
      image: "/hrSheet.jpg",
       href: "/hrsheets"
    },
    { 
      id: 2, 
      text: "HR Coils", 
      description: "Explore",
      image: "/hrcn.jpg",
         href: "/hrcoils"
    },
    { 
      id: 3, 
      text: "CR Sheets", 
      description: "Explore",
      image: "/coldsheet.jpg",
       href: "/crsheets"
    },
    { 
        id: 3, 
        text: "CR Coils", 
        description: "Explore",
        image: "/coldcoils.jpg",
          href: "/crcoils"
      }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="flex h-full   w-full sm:px-10 flex-col items-center justify-center px-5   p-4">
       
      {/* The Card Component */}
      <div className="w-full sm:h-[520px] h-auto  rounded-lg outline-none p-1 grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-1">
  {cards.map((card, index) => (
    <Link
      to={card.href}
      key={card.id}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      className={`relative w-full h-40 sm:h-full  flex overflow-hidden cursor-pointer rounded-lg
             justify-center items-center transition-all duration-500
             sm:flex-1 hover:sm:flex-[4] group`}
>
      {/* Background Image */}
      <img
        src={card.image}
        alt={card.text}
        className="absolute w-full h-full object-cover"
      />

      {/* Dark base overlay always visible */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div> */}

      {/* Blue overlay (visible only when not active) */}
      <div
    className={`absolute inset-0 transition-opacity duration-300
      ${activeIndex === index
        ? 'bg-transparent'
        : ' sm:group-hover:bg-gray-100/40'}`}
  ></div>

      {/* Content box */}
      <div
    className={`absolute inset-x-0 text-white sm:p-6 p-2 transition-all duration-500 ${
      activeIndex === index ? 'bottom-0' : 'bottom-0'
    }`}
  >
    <h2 className="sm:text-3xl text-lg font-bold mb-2">{card.text}</h2>

    <div
      className={`transition-all duration-700 overflow-hidden ${
        activeIndex === index
          ?   ' h-0 sm:max-h-40 opacity-100 sm:mt-3'
          : 'sm:max-h-0 h-0 opacity-0'
      }`}
    >
      <motion.div className="flex items-center gap-2">
        <p className="text-white font-poppins text-opacity-90">{card.description}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"/></svg>
      </motion.div>
    </div>
  </div>
</Link>


  ))}
</div>

        </div>
  );
}