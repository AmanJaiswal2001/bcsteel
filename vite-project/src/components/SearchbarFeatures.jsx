import React, { useState, useEffect } from 'react'

const SearchbarFeatures = ({ data ,defaultSearch=''}) => {
  const [search, setSearch] = useState(defaultSearch)
  const [filtered, setFiltered] = useState([])


  useEffect(() => {
    setSearch(defaultSearch)
  }, [defaultSearch])



  useEffect(() => {
    const term = search.toLowerCase().trim();
  
    const result = data.filter(item => {
      const title = item.title?.toLowerCase() || "";
  
      // Check if the search term is "hot rolled" or "cold rolled"
      if (term === "hot rolled") {
        return title.includes("hot rolled") && !title.includes("cold rolled");
      }
  
      // If searching specifically "cold rolled"
      if (term === "cold rolled") {
        return title.includes("cold rolled") && !title.includes("hot rolled");
      }
  
      // General search
      return title.includes(term);
    });
  
    console.log("Filtered Data:", result); // Debug log to check if it's filtering correctly
    setFiltered(result);
  }, [search, data]);
  
  return (
    <div className="w-full p-4">
      {/* Input */}
      {/* <input
        type="text"
        placeholder="Search by title, brand or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
      /> */}

      {/* Cards */}
     
      <div  data-theme="light"  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length ? filtered.map(item => (
          <div key={item.id} className="card hover:shadow-lg hover:bg-transparent  hover:-translate-y-1 transform transition  ease-in-out  duration-300   bg-base-100 h-[450px] w-72 ">
          <figure className='w-full object-fit '>
            <img src={item.image} alt={item.title} className="w-full  object-cover rounded h-44" />
            </figure>
            <div className="card-body m-0 p-0 -z-10  px-2">
            <h2 className="  mt-2 font-poppins font-medium h-12  text-[1rem]">{item.title}</h2>
            <div className='flex gap-2'>
            <span className='font-normal text-[12px] font-poppins text-[#70737a]'>Brand:</span>
            <p className=' font-poppins font-semibold text-[#70737a]  text-[12px]'> {item.brand}</p>
     
     </div>
     <div className='flex gap-2'>
      <span className='font-semibold text-sm font-poppins text-[#262626]'>Thickness</span>
      <p className=' font-medium text-sm font-poppins text-[#262626]'> {item.thickness}</p>
     
      </div>
      <div className='flex gap-2'>
      <span className='font-semibold text-sm font-poppins text-[#262626]'>Width </span>
      <p className=' font-medium text-sm font-poppins text-[#262626]'> {item.width}</p>
     
      </div>
      <div className='flex gap-2'>
      <span className='font-semibold text-sm font-poppins text-[#262626]'>Length</span>
      <p className=' font-medium text-sm font-poppins text-[#262626]'> {item.length}</p>
     
      </div>
      <div className='bg-[#f5f6fa]  h-20 rounded-b-lg w-full bottom-0 absolute left-0'>
      <div className="  w-52 m-0 p-0 text-left  h-10 ">
        <button className=" p-2 w-full m-0  text-[#12396d] text-left bg-bl-200 font-poppins cursor-pointer font-semibold  text-sm  ">{item.buttonName}</button>
      </div>
      <hr className='text-gray-300 mx-2 px-2'></hr>
      <div className='flex gap-1 px-2 pt-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 20q-1.25 0-2.125-.875T4 17H1.5l.45-2h2.825q.425-.475 1-.737T7 14t1.225.263t1 .737H13.4l2.1-9H4.55l.1-.425q.15-.7.687-1.137T6.6 4H18l-.925 4H20l3 4l-1 5h-2q0 1.25-.875 2.125T17 20t-2.125-.875T14 17h-4q0 1.25-.875 2.125T7 20m8.925-7h4.825l.1-.525L19 10h-2.375zm-.475-6.825L15.5 6l-2.1 9l.05-.175l.85-3.65zM.5 13.325l.5-2h5.5l-.5 2zm2-3.65l.5-2h6.5l-.5 2zM7 18q.425 0 .713-.288T8 17t-.288-.712T7 16t-.712.288T6 17t.288.713T7 18m10 0q.425 0 .713-.288T18 17t-.288-.712T17 16t-.712.288T16 17t.288.713T17 18"/></svg>
        <span className='font-poppins font-medium text-[#262626]   text-sm'>{item.delivery}  </span>
      </div>
      </div>   
      </div> </div>
        )) : (
          <p className="text-center text-gray-500 col-span-full">No matching products found.</p>
        )}
      </div>
    </div>
  )
}

export default SearchbarFeatures
