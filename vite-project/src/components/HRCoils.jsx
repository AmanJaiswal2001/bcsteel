import React, { useRef, useState,useEffect } from 'react'
import { motion, useInView } from 'framer-motion';
import cardData from "../components/data/hotrollcoils"
import CardSheet from './CardSheet';
import { Link } from 'react-router-dom';
import Card from './Card';
import useFetchProducts from '../hooks/useFetchProducts';


const contentData = {
  title: 'Hot Rolled (HR) Coils',
  description:
    'Hot rolled coils are manufactured at high temperatures ranging from 900°C to 1200°C, which is above the recrystallization point of most steels. This allows the material to be shaped easily under heavy roll pressure while maintaining structural integrity and enhancing mechanical properties.',
  processTitle: 'Making of HRAP ',
  processIntro: 'Hot rolling involves the following processes:',
  processes: [
    {
      num:"1",
      title: 'Reheating',
      text: 'At Sonatek Steel, the process begins with reheating stainless steel slabs or blooms to temperatures exceeding the recrystallization point, typically above 900°C. This stage is crucial for eliminating the coarse dendritic grain structures formed during casting.'
    },
    {
      num:"2",
      title: 'Roughing & Finishing',
      text: 'Once reheated, the material is passed through roughing and finishing mills to reduce its thickness to near-final dimensions. At Sonatek, this reduction process is handled with precision using state-of-the-art Steckel (reversible) or Tandem (continuous) mills.'
    },
    {
      num:"3",
      title: 'Laminar Cooling',
      text: 'In specific grades, the hot rolled material undergoes controlled laminar cooling using water sprays. This step rapidly reduces the temperature below 500°C, helping stabilize the steel’s microstructure while enhancing flatness, strength, and surface properties.'
    },
    {
      num:"4",
      title: 'Coiling',
      text: 'The final stage involves coiling the hot rolled sheet into compact, manageable rolls. Coiling ensures safe handling, efficient transport, and convenient storage. At Sonatek, every coil is prepared with care and precision to meet individual customer requirements, supporting seamless integration into further fabrication or finishing processes.'
    }
  ],
  featureText:
    'At Sonatek Steel, we are committed to delivering top-quality hot rolled sheets that meet the demands of modern industries. Our sheets are manufactured using advanced rolling mills and strict quality control processes to ensure consistent thickness, surface flatness, and strength.',
  subFeatureText:
    'Sonatek Steel’s hot rolled sheets are known for excellent weldability and formability, making them suitable for a wide range of applications including construction, automotive components, structural fabrication.',


applications: [
    "Structural and general engineering",
    "Automotive chassis and components",
    "Industrial equipment and machinery",
    "Pipelines and gas cylinders",
    "Railway wagons and tracks",
    "Bridges and infrastructure projects"
  ]

  };



const HRCoils = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-10px' });

  const [isRevealed, setIsRevealed] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
 
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

const hotCoils = products.filter((p) => {
  // console.log("Checking product:", p);
  return   p.type.toLowerCase().includes("coil") && // matches 'hotrolledcoil', 'coldcoil', etc.
  p.name.toLowerCase().includes("hot")
});

  return (
    <div className="w-full h-full">
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url('/bhrc.jpg')` }}
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
        <p className="sm:text-[60px] text-3xl leading-12 text-black uppercase  font-poppins font-bold">Hr Coils</p>
        {/* <div className="flex flex-col mt-5 gap-4 w-[80%]"> */}
          <p className="text-[20px] font-poppins font-medium">{contentData.processIntro}</p>
          <div className=" mt-5  w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2">
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
    <p className="text-9xl font-bold px-2 text-white font-poppins">{item.num}</p>
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
        {/* </div> */}
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
    {/* <motion.h1
    className="text-3xl sm:text-4xl md:text-5xl uppercase font-poppins font-extrabold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent sm:mt-5"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.8 }}
  >
    Features
  </motion.h1> */}

  <motion.div
    className="w-full sm:pt-8 h-64 sm:h-80 md:h-[400px] lg:h-[500px] relative group"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.8 }}
  >
    {/* Glow or gradient overlay */}
    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-10"></div> */}

    {/* Floating image card */}
    <motion.img
      src="/hrcn.jpg"
      alt="Feature"
      className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-[1.05] transition-transform duration-500 ease-in-out"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Optional bottom caption */}
    {/* <div className="absolute bottom-4 left-4 text-white z-20">
      <p className="text-xl sm:text-2xl font-semibold drop-shadow-md">High Quality HRC</p>
      <p className="text-sm font-light drop-shadow-sm">Engineered for durability & performance</p>
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

<div className="relative lg::h-full mt-0 ">
  {/* Background Image */}
  <div
    style={{ backgroundImage: `url('/2835.jpg')` }}
    className="absolute inset-0 h-full w-full bg-[url('/2835.jpg')] bg-cover bg-center"

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
    xl:left-32
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
  `}onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <svg className='text-center font-normal' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="m3.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675T.825 12t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"/>
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
        }}
      >
            {hotCoils.map((item, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 sm:px-2 mx-auto   flex justify-center sm:mx-0 mt-5 snap-start`}
            style={{
              width: `calc((100%) / ${visibleCards})`,
              minWidth: '15rem', // mobile scroll width
            }}>
               <div className="p-1  w-72 ">
                <Link  className="block " key={index} to={`/product/${item._id||index}`}>
                <Card {...item} />
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
    right-0 
    sm:right-4 
    md:right-8 
    lg:right-16 
    xl:right-28 
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
 
  )
}

export default HRCoils