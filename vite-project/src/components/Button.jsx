import React from 'react'

const Button = ({buttonName,   onClick}) => {
  return (
    <div className="bg-[#12396d] w-[90%] sm:w-[30%] md:w-[40%] h-14  rounded-2xl cursor-pointer flex items-center justify-center text-white group overflow-hidden mx-auto sm:mx-0">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"/></svg>
        <button 
         onClick={onClick}
         className="font-medium text-[16px] sm:text-[18px]  font-poppins group-hover:translate-x-1 group-hover:opacity-100 duration-300 relative z-10">{buttonName}</button>

   </div>
  )
}

{/* <div className="bg-[#12396d] w-[95%] sm:w-[60%] md:w-[40%] h-14 mt-6 rounded-2xl cursor-pointer flex items-center justify-center text-white group overflow-hidden mx-auto sm:mx-0">
          <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
            />
          </svg>
          <button className="font-medium text-[16px] sm:text-[18px] font-poppins group-hover:translate-x-1 group-hover:opacity-100 duration-300 relative z-10">
            Know His Story
          </button>
        </div> */}

export default Button

