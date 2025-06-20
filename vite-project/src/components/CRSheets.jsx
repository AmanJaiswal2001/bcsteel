import React, { useRef, useState,useEffect } from 'react'
import { motion, useInView } from 'framer-motion';
import {cardData} from "../components/data/coldrollcoilshhet"
import CardSheet from './CardSheet';
import { Link } from 'react-router-dom';
import useFetchProducts from '../hooks/useFetchProducts';
const contentData = {
  title: 'Cold Rolled (CR) Sheets',
  description:
    'Cold rolled sheets are manufactured by rolling hot rolled pickled coils below the recrystallization temperature, which enhances surface finish, dimensional accuracy, and mechanical strength. This process yields sheets with excellent surface quality and superior formability—ideal for precision applications.',
  processTitle: 'Manufacturing Process of ',
  processIntro: 'At Sonatek Steel, cold rolled sheets are crafted with precision through the following stages:',
  processes: [
    {
      num:"1",
      img:"/CRpickling(1).png",
      title: 'Pickling',
      text: 'Hot rolled coils are first passed through acid baths to remove surface scale and impurities. This prepares a clean surface essential for high-quality cold rolling.'
    },
    {
      num:"2",
      img:"/coldcoils.jpg",
      title: 'Cold Rolling',
      text: 'The pickled coils are cold reduced to the desired thickness using multi-stand rolling mills. Sonatek’s advanced mills ensure tight thickness tolerances and consistent mechanical properties.'
    },
    {
      num:"3",
      img:"/cranneling.png",
      title: 'Annealing',
      text: 'The cold rolled sheets are heat-treated in controlled atmospheres to restore ductility and refine grain structure. Sonatek uses both batch and continuous annealing lines for optimal properties.'
    },
    {
      num:"4",
      img:"/crsskin.png",
      title: 'Skin Passing',
      text: 'A light rolling pass (skin pass) is applied to improve sheet flatness, surface texture, and mechanical uniformity. This step ensures excellent formability for downstream applications.'
    },
    {
      num:"5",
      img:"/crsfinish.png",
      title: 'Finishing & Inspection',
      text: 'Sheets are trimmed, leveled, and inspected for surface defects. Sonatek ensures every coil meets stringent surface finish and dimensional standards before dispatch.'
    }
  ],
  featureText:
    'Sonatek Steel’s cold rolled sheets are designed to deliver precision, surface smoothness, and mechanical excellence. Our integrated process and rigorous inspection ensure consistent quality that meets global benchmarks.',
  subFeatureText:
    'The superior surface finish and tight thickness control make our CR sheets ideal for applications where precision and aesthetic value are critical.',

  applications: [
    'Automotive body panels and interior components',
    'Home appliances like refrigerators and washing machines',
    'Office furniture and filing cabinets',
    'Electrical panels and enclosures',
    'Drums, barrels, and containers',
    'Precision engineering and fabrication'
  ]
};


const CRSheets = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-10px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isRevealed, setIsRevealed] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 840) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1124) {
          setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    // Initial call
    handleResize();

     // Add event listener
     window.addEventListener('resize', handleResize);

     // Clean up
     return () => window.removeEventListener('resize', handleResize);
   }, []);
 
   const nextSlide = () => {
    if (currentIndex < cardData.length - visibleCards) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const {products,loading,error}=useFetchProducts();

  const coldSheet = products.filter((p) => {
    // console.log("Checking product:", p);
    return   p.type.toLowerCase().includes("coldrolledsheet") 
    // && // matches 'hotrolledcoil', 'coldcoil', etc.
    // p.name.toLowerCase().includes("cold")
  });
  return (
    <div className="w-full h-full">
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url('/bcrs.jpg')` }}
      >
        <motion.div
          ref={ref}
          className="absolute top-1/2 w-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', type: 'spring' }}
        >
          <div className='relative sm:h-60 -z-10 flex flex-col justify-start p-5 sm:p-0 sm:pt-6'>
        <div className='absolute inset-0 bg-[#12396d] opacity-50 -z-10'></div> 
        <h1 className="sm:text-5xl text-2xl text-white z-10 font-poppins font-bold sm:mx-auto mx-0 sm:w-[550px]">
            {contentData.title}
          </h1>
          <p className="text-white text-lg sm:w-[60%]  sm:mx-auto mt-4">
            {contentData.description}
          </p>
        {/* </div> */}
        </div>
        </motion.div>
      </div>

      <div className="lg:px-20 w-full px-10">
        <p className="sm:text-[36px] text-xl text-black uppercase mt-10 font-poppins font-bold">{contentData.processTitle}</p>
        <p className="sm:text-[60px] text-3xl leading-12 text-black uppercase  font-poppins font-bold">Cr Sheets</p>
        <p className="text-[20px] font-poppins pt-3 font-medium">{contentData.processIntro}</p>
        
        <div className=" mt-5  w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-2">

           {contentData.processes.map((item, index) => (
            <div
  key={index}
  className="relative group cursor-pointer w-full h-80 rounded-lg shadow-lg overflow-hidden"
  onClick={() => setIsRevealed((prev) => ({ ...prev, [index]: !prev[index] }))}
>
  {/* Hover Overlay */}
  <div
  className={`absolute top-0 left-0 inset-0 w-full h-full bg-black flex  flex-col z-10 transition-opacity duration-500 ${
    isRevealed?.[index] ? "opacity-0" : "opacity-100"
  } group-hover:opacity-0`}
>
  <div className="top-0 left-0">
    <p className="text-9xl font-bold text-white font-poppins">{item.num}</p>
    <p className="text-3xl   text-center mt-10  uppercase font-bold text-white font-poppins">{item.title}</p>
  </div>
</div>


  {/* Actual Content */}
  <div className="flex gap-3 items-start h-full w-full p-5 bg-[#12396d]  justify-start relative z-0 rounded-md">
    {/* <svg
      className="mt-1 text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z" />
    </svg> */}
    <div className=' relative'>
      <span className="font-normal block  h-60  text-white">{item.text}</span>
      <p className="text-5xl  text-end       font-bold text-white font-poppins">{item.num}</p>
    </div>
  </div>
</div>

))}

        </div>
      </div>

      <div className="relative lg:h-full mt-10">
  {/* Background Image */}
  <div
    className="absolute inset-0 h-full w-full bg-cover bg-center"
    style={{ backgroundImage: `url('/2835.jpg')` }}
  ></div>

  {/* Blue Overlay */}
  <div className="absolute inset-0 bg-[#12396d] opacity-85"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10 px-5 sm:px-10 lg:px-20 xl:px-40 pt-10 sm:pt-16">
    {/* Left Column */}
    <div className="w-full lg:w-1/2 flex flex-col">
   

      <motion.div
  className="w-full sm:pt-8 h-64 sm:h-80 md:h-[400px] lg:h-[500px] relative group overflow-hidden rounded-2xl"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.8 }}
>
  {/* Floating image with hover scale */}
  <motion.img
    src="/coldps1.jpg"
    alt="Feature"
    className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-500 ease-in-out scale-100 group-hover:scale-[1.05]"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
  />

  {/* Caption with hover animation */}
  {/* <div className="absolute bottom-4 left-4 z-20">
    <motion.p
      className="text-xl sm:text-2xl font-semibold text-orange-400 drop-shadow-md"
      whileHover={{ scale: 1.05, x: 4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      High Quality HRC
    </motion.p>
    <motion.p
      className="text-sm font-light font-poppins text-orange-400 drop-shadow-sm"
      whileHover={{ scale: 1.05, x: 4 }}
      transition={{ type: 'spring', stiffness: 300, delay: 0.05 }}
    >
      Engineered for durability & performance
    </motion.p>
  </div> */}
</motion.div>

    </div>

    {/* Right Column */}
    <motion.div className="w-full lg:w-1/2 flex flex-col justify-center">
     
    <motion.h1
    className="text-3xl sm:text-4xl md:text-5xl uppercase font-poppins font-extrabold bg-gradient-to-r from-white via-gray-200 to-black bg-clip-text text-transparent "
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.8 }}
  >
    Features
  </motion.h1>
     
      <p className="font-medium text-base sm:text-lg px-2 mt-5 border-l-2 border-orange-400 text-white font-poppins">
        {contentData.featureText}
      </p>

      <p className="font-normal text-sm sm:text-base border-l-2 border-orange-400 px-2 text-white font-poppins mt-5">
        {contentData.subFeatureText}
      </p>

      <div className="mt-6">
        <h2 className="text-white text-lg sm:text-xl font-semibold mb-2">Applications:</h2>
        <ul className="list-disc list-inside text-white text-sm sm:text-base">
          {contentData.applications.map((app, idx) => (
            <li key={idx}>{app}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  </div>
</div>

<div className="relative lg:h-full mt-0 ">
  {/* Background Image */}
  <div
    style={{ backgroundImage: `url('/2835.jpg')` }}
    className="absolute inset-0 h-full  w-full bg-cover bg-center"
  ></div>

  {/* Blue Overlay */}
  <div className="absolute inset-0 bg-[#12396d] opacity-85"></div>

  {/* Content */}
  <div className="relative z-10 w-full px-4 sm:px-10 md:px-20 lg:px-40 py-10">
   
    <motion.h1
    className="text-3xl sm:text-4xl md:text-5xl uppercase font-poppins font-extrabold bg-gradient-to-r from-white via-gray-200 text-center to-white bg-clip-text text-transparent sm:mt-5"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.8 }}
  >
    MANUFACTURING RANGES
  </motion.h1>

    <div className="mt-6 overflow-x-auto snap-start">
      <table className="min-w-[600px] w-full  rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="bg-[#f5f6fa] font-poppins text-[#12396d] text-center p-3 sm:p-4 font-semibold border border-[#12396d]"
            >
              Product
            </th>
            <th
              colSpan={2}
              className="bg-[#f5f6fa] font-poppins  text-[#12396d] text-center p-3 sm:p-4 font-semibold border border-[#12396d]"
            >
              Max Width
            </th>
            <th
              colSpan={2}
              className="bg-[#f5f6fa]  font-poppins  text-[#12396d] text-center p-3 sm:p-4 font-semibold border border-[#12396d]"
            >
              Thickness
            </th>
          </tr>
          <tr>
            {["Min", "Max", "Min", "Max"].map((label, idx) => (
              <th
                key={idx}
                className="bg-[#f5f6fa]  font-poppins  text-[#12396d] text-center p-3 sm:p-4 font-semibold border border-[#12396d]"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {[
            ["Hot Rolled Coil", "1000", "1650", "2.0 *", "10"],
            ["N1", "1000", "1650", "2.0 *", "10"],
            ["2E", "1000", "1600", "1.4 *", "6.7"],
          ].map((row, idx) => (
            <tr key={idx} className={idx % 2 === 1 ? "bg-white" : ""}>
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className="text-center bg-white p-3 sm:p-4 font-poppins border  text-[#12396d]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


<div className='w-full mb-20'>
  {/* <HotRolledCatgory filters={filters}/> */}


  <div className="relative w-full lg:w-[90%] mx-auto px-5 mt-10 ">
        {/* Previous Button */}
        <button
  className={`
    absolute 
    top-[40%] 
    left-2 
    sm:left-4 
    md:left-8 
    lg:left-16 
    xl:left-36 
    z-20 
    h-8 w-8 
    sm:h-9 sm:w-9 
    flex items-center justify-center 
    bg-[#e6f0ff] bg-opacity-50 
    text-[#2241a6] 
    p-1 
    rounded-lg 
    cursor-pointer 
    hover:bg-[#d7e7ff] 
    ${currentIndex === 0 ? "invisible" : "visible"}
  `}
  onClick={prevSlide}
  disabled={currentIndex === 0}
>
  <svg
    className="text-center font-normal"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m3.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675T.825 12t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"
    />
  </svg>
</button>

        
        {/* Cards Container */}
        <div className="overflow-x-auto sm:w-[80%] w-full m-auto  lg:overflow-hidden">
        <h1 className="sm:text-2xl text-center lg:text-left text-lg text-[#12396d] z-10 font-poppins font-bold  mx-0 lg:mx-10 sm:w-[550px]">
        {contentData.title}
          </h1>
          <div 
           className={`flex   items-center lg:transition-transform duration-300 ease-in-out lg:gap-0 ${currentIndex > 0 ? '' : ''}`}
           style={{
          transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          width: '100%',
          flexWrap: 'nowrap',
        }}  >
          
          
          
          
            {loading? (
  <div className="w-full text-center mt-10 text-[#12396d] font-poppins font-semibold">
    Loading...
  </div>)
              
              
              
              :coldSheet
            .map((item, index) => (
              <div 
                 key={index}
                 className={`flex-shrink-0 sm:px-2 mx-auto   flex justify-center sm:mx-0 mt-5 snap-start`}
                 style={{
              width: `calc((100%) / ${visibleCards})`,
              minWidth: '15rem', // mobile scroll width
            }} >
               <div className="p-1 w-72  ">
                <Link  className="block " key={index} to={`/product/${item._id||index}`}>
                <CardSheet {...item} />
                </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Next Button */}
        <button
          className={`
            absolute 
    top-[40%] 
    right-2 
    sm:right-4 
    md:right-8 
    lg:right-16 
    xl:right-32 
    z-50 
    h-8 w-8 
    sm:h-9 sm:w-9 
    flex items-center justify-center 
    bg-[#e6f0ff] bg-opacity-50 
    text-[#2241a6] 
    p-1 
    rounded-lg 
    cursor-pointer 
    hover:bg-[#d7e7ff] 
    ${currentIndex >= cardData.length - visibleCards ? "invisible" : "visible"}
  `}onClick={nextSlide}
          disabled={currentIndex >= cardData.length - visibleCards}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"/>
          </svg>
        </button>
      </div>
      
      {/* Navigation Dots (Optional) */}
      <div className="hidden lg:flex justify-center mt-6">
        {Array.from({ length: Math.ceil(cardData.length - visibleCards + 1) }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${currentIndex === index ? 'bg-blue-700' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default CRSheets;
