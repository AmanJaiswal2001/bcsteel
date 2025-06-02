import React, { useState } from 'react'
import { CommonFilter, FilterDropdown } from './HelperComponent'

const Filter = ({onFilterChange, hideFields = []}) => {
 const [selectedFilters,setSelectedFilters]=useState({Grade:[],});
 const [rangeFilters, setRangeFilters] = useState({
  Thickness: { min: null, max: null },
  Width: { min: null, max: null },
  Length: { min: null, max: null },
});
 const handleCheckboxChange=(title,option)=>{
  const newFilters={...selectedFilters};
  const currentOptions=newFilters[title]||[];


newFilters[title]=currentOptions.includes(option)
?currentOptions.filter(item=>item!==option):[...currentOptions,option];


setSelectedFilters(newFilters);
onFilterChange(newFilters);

 };

 const handleRangeChange = (title, min, max) => {
  const newRangeFilters = {
    ...rangeFilters,
    [title]: { min, max },
  };
  setRangeFilters(newRangeFilters);

  const updatedFilters = {
    ...selectedFilters,
    ...newRangeFilters, // merge range filters here
  };

  onFilterChange(updatedFilters);
};
const isHidden = (field) => hideFields.includes(field);
 
  return (
    <div className='w-full   flex flex-col gap-4'>
    {/* header part */}
    <div className='flex w-full  justify-between '>
<div className=' w-full flex gap-2 items-center '>
    {/* icon */}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-7L2.95 4h18.1L14 13v7zm2-7.7L16.95 6h-9.9zm0 0"/></svg>
    <span className='font-poppins font-semibold text-[#262626] text-left text-[1.25rem]'>Filter</span>
    {/* filter */}
</div>

<div className='w-full  flex   justify-end '>
{/* button */}
<button className='text-[#12396d] font-poppins cursor-pointer text-end text-sm font-semibold'
 onClick={() => {
  const cleared = {
    Grade: [],
    Thickness: { min: null, max: null },
    Width: { min: null, max: null },
    Length: { min: null, max: null },
  };
  setSelectedFilters({ Grade: [] });
  setRangeFilters({
    Thickness: { min: null, max: null },
    Width: { min: null, max: null },
    Length: { min: null, max: null },
  });
  onFilterChange(cleared);
}}
>Clear filters</button>
</div>
</div>
{/* filter dropdown */}
{/* <div className=' w-full h-full flex flex-col gap-4 relative  '> */}
{/* <div className='w-full h-full'>
<FilterDropdown
  title="Brand"
        options={["JSW Steel", "SAIL", "JSPL", "AMNS"]}
     
/>
</div> */}
<div>
<FilterDropdown
    title="Grade"
        options={["IS 2062:2011", "IS 3502:2009"]}
        selectedOptions={selectedFilters.Grade}
        onChange={handleCheckboxChange}
/>
</div>


{/* comon filter */}
<div className='flex flex-col gap-4 w-full  '>
 <div>
  {!isHidden("Thickness") &&(<CommonFilter 
     title="Thickness"
  minLabel="Min"
  maxLabel="Max"
  minOptions={["1.5", "1.6", "3.0","6.0","20.0","25.0"]}
  maxOptions={["1.5", "1.6", "3.0","6.0","20.0","25.0"]}
  onRangeChange={handleRangeChange}
  value={rangeFilters.Thickness}

  />
   )}
  </div>
 
 <div>
 {!isHidden("Width") && (
  <CommonFilter
     title="Width"
  minLabel="Min"
  maxLabel="Max"
  minOptions={["900.00", "1250.0","2000.0","2100.0"]}
  maxOptions={["900.00", "1250.0","2000.0","2100.0"]}
  onRangeChange={handleRangeChange}
  value={rangeFilters.Width}
  />
 )}
 
 </div>
 <div>
 { !isHidden("Length") &&(
  <CommonFilter
     title="Length"
 minLabel="Min"
  maxLabel="Max"
  minOptions={["500.0", "2500.0","12000.0"]}
  maxOptions={["500.0", "2500.0","12000.0"]}
  onRangeChange={handleRangeChange}
  value={rangeFilters.Length}
  />
 )}

 </div>
 
</div>
    </div>
  )
}

export default Filter