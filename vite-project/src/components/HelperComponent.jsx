import React, { useEffect, useState } from 'react'
import { FaSquareWhatsapp } from "react-icons/fa6";
const HelperComponent = ({bgColor, textColor,width,height,description}) => {
  return (
    <div className={`${bgColor} ${textColor} ${width} ${height}  flex justify-center   items-center `}>
<p className='w-64  text-center font-medium text-sm   font-poppins'>{description}</p>
    </div>
  )
}

export default HelperComponent

 export const  Design =({description})=>{
  return(
    <div className='bg-[#e6f0ff] h-full lg:flex md:flex-row sm:flex-row lg:flex-row flex flex-col items-center '>
    <h4 className='font-poppins font-normal lg:w-2/3 lg:text-[1.5rem] mt-5 lg:mt-0 text-sm text-center mx-5 lg:mx-20'>{description} </h4>
    <button className='flex gap-2 items-center justify-center mt-10 lg:mt-0 p-2 rounded-lg w-64 bg-[#12396d]'>      
     <a href="#" target="_blank">
     <FaSquareWhatsapp
     className='md:w-10 md:h-10 lg:w-10 lg:h-10 w-8 h-8 text-white '
      />
        </a><span className='text-white font-poppins'>Connect on whatsapp</span>
</button>
            </div>
  )
}

// filter dropdown
export const FilterDropdown=({title,options=[],selectedOptions = [], onChange })=>{
 
    const [open, setOpen] = useState(false);
    return(
    <div className="relative   w-full  border border-gray-300  rounded-md "
    onClick={() => {setOpen(!open)}}
     >
     
           
     <button
       
          // console.log('Dropdown is now:', !open ? 'Opening' : 'Closing');
        // }}
        className="w-full flex justify-between items-center cursor-pointer  px-6 py-3 bg-[#f5f7fc]  "
     
      >
      
        <span className="text-[1rem] font-poppins  font-semibold">{title}</span>
        <svg
        onClick={()=>setOpen(!open)}
          className={`w-5 h-5 transform transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 py-2 flex flex-col bg-white border-t border-gray-200 "
            onClick={(e) => e.stopPropagation()}
        >
       
       {options.map((option,index)=>(
        <label key={index} className='flex items-center space-x-2 m-1 bg-[#f5f7fc] dark:bg-white'>
          <input type="checkbox" className='accent-[#2241a6]  bg-[#f5f7fc] dark:bg-[#f5f7fc]'
 checked={selectedOptions.includes(option)}
 onChange={() => onChange(title, option)}

          />
          <span className='font-medium text-sm font-poppins text-left bg-[#f5f7fc] dark:bg-white'>{option}</span>
        </label>
       ))}
       
       
     
     
       
        </div>
      )}
    </div>
       
    );
// </div>
  
};


// thickness //width//length//



export const CommonFilter = ({
  title, minLabel,maxLabel,minOptions,maxOptions, onRangeChange,  value = { min: null, max: null },
}) => {
  const [isMinOpen, setIsMinOpen] = useState(false);
  const [isMaxOpen, setIsMaxOpen] = useState(false);
  const [selectedMin, setSelectedMin] = useState(null);
  const [selectedMax, setSelectedMax] = useState(null);

  // const minOptions = ["12.2", "11.5", "12.5"];
  // const maxOptions = ["15.2", "14.0", "13.8"];

  useEffect(() => {
    setSelectedMin(value.min);
    setSelectedMax(value.max);
  }, [value]);
  const handleMinSelect = (option) => {
    setSelectedMin(option);
    setSelectedMax(null); // clear max on min select
    setIsMinOpen(false);
    onRangeChange(title, option, null);
  };

  const handleMaxSelect = (option) => {
    setSelectedMax(option);
    setSelectedMin(null); // clear min on max select
    setIsMaxOpen(false);
    onRangeChange(title, null, option);
  };

  return (
    <div className="relative inline-block w-full border border-gray-300  rounded-md bg-[#f5f7fc] p-4">
      <p className="text-[1rem] font-poppins text-[#262626] text-left font-semibold mb-2">{title}</p>

      <div className="flex gap-2 relative ">
        {/* Min Button */}
        <div className="relative w-1/2">
          <button
            onClick={() => {
              setIsMinOpen(!isMinOpen);
              setIsMaxOpen(false); // close max if open
            }}
            className="w-full flex justify-between  rounded-lg items-center hover:border  cursor-pointer px-4 py-2 bg-white border border-[#b1b8c9]"
          >
            <span className=" text-sm font-poppins font-normal text-[#70737a] " >{selectedMin || minLabel}</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${
                isMinOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isMinOpen && (
            <div className="absolute left-0 top-full mt-0 w-full bg-white border border-gray-300 shadow z-10">
              {minOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleMinSelect(option)
                   // setSelectedMin(option);
                    // setIsMinOpen(false);
                  }
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-poppins font-normal text-[#70737a]">
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
<p className='py-2'>To</p>
        {/* Max Button */}
        <div className="relative w-1/2">
          <button
            onClick={() => {
              setIsMaxOpen(!isMaxOpen);
              setIsMinOpen(false); // close min if open
            }}
            className="w-full flex justify-between rounded-lg items-center cursor-pointer px-4 py-2 bg-white border border-gray-300"
          >
            <span className="text-sm font-poppins font-normal text-[#70737a]">{selectedMax ||maxLabel}</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${
                isMaxOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isMaxOpen && (
            <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 shadow z-20">
              {maxOptions.map((option, index) => (
                <div
                    key={index}
                    onClick={() => handleMaxSelect(option)}
           
               className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-poppins font-normal text-[#70737a]">
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export const ThicknessGrid=({values,title,onSelect,selected})=>{
  return(
    <>
   <div className='flex flex-col justify-between gap-0 mt-2 '>
    <p className='font-poppins text-[1rem] font-semibold'>{title} (mm)</p>
    {!selected && (
  <span className="text-orange-600 font-poppins  text-[12px]  lg:text-[1rem]">
     Please select <b>Thickness (mm)</b> to view available width
  </span>
)}

    </div>
   
    <div className="grid grid-cols-6 sm:grid-cols-5 md:grid-cols-8 gap-2 w-full">
      {values.map((value, index) => (
        <button
          key={index}
          onClick={() => onSelect(value)}
          className={`text-sm  cursor-pointer rounded-sm border p-2 flex justify-center items-center gap-2  
          ${selected === value ? 'bg-[#f2f6ff] border border-[#afc4f3] font-semibold text-[rgb(93,116,166)]' : 'border-[rgba(0,0,0,.125)] border font-normal text-[#212529]'}`}
        >
          {value}
        </button>
      ))}
    </div>
    </>  );
};

export const WidthGrid=({values,title,selected,onSelect, disable,showMessage })=>{
  return(
    <>
     <div className='flex flex-col justify-between gap-0 mt-2 '>
         <p className='font-poppins text-[1rem] font-semibold ' >{title} (mm)</p>
   
    {showMessage  && (
          <span className="text-orange-600 font-poppins  text-[12px] lg:text-[1rem]">
           Please select <b>Width (mm)</b> to view available length
          </span>
        )}
        </div>
    <div className={`grid grid-cols-6 sm:grid-cols-5 md:grid-cols-8 gap-2 w-full ${disable ? 'opacity-50 pointer-events-none' : ''}`}>
    
      {values.map((value, index) => (
        <button
          key={index}
          onClick={() =>!disable&& onSelect(value)}
          disabled={disable}
          className={`text-sm  cursor-pointer rounded-sm border p-2 w-full   
          ${selected === value ? 'bg-[#f2f6ff] border border-[#afc4f3] font-semibold text-[rgb(93,116,166)]' : 'border-[rgba(0,0,0,.125)] border font-normal  text-[#212529]'}`}
       >
          {value}
        </button>
      ))}
    </div>
    </>  );
};



export const LengthGrid=({values,title,selected,onSelect, disable,showMessage})=>{
  return(
    <>
     <div className='flex flex-col justify-between gap-0 mt-2 '>
 
    <p className=' font-poppins text-[1rem] font-semibold'>{title} (mm)</p>
    
    {showMessage && (
          <span className="text-orange-600 font-poppins   text-[12px] lg:text-[1rem]">
            Please select <b>Available Length (mm)</b> or add custom length
          </span>
        )}
        </div>
    
    <div className={`grid grid-cols-6 sm:grid-cols-5 md:grid-cols-8 gap-2 w-full ${disable ? 'opacity-50 pointer-events-none' : ''}`}>
      {values.map((value, index) => (
        <button
          key={index}
          onClick={() => !disable&& onSelect(value)}
          disabled={disable}
          className={`text-sm  cursor-pointer rounded-sm border p-2 w-full   
          ${selected === value ? 'bg-[#f2f6ff] border border-[#afc4f3] font-semibold text-[rgb(93,116,166)]' : 'border-[rgba(0,0,0,.125)] border font-normal text-[#212529]'}`}
         >
          {value}
        </button>
      ))}
    </div>
    </>  );
};