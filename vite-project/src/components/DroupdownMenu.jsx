import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const submenuMapping = {
  "Hot Rolled": [
    { label: "Hot Rolled Sheet", path: "/hotRolled/sheet" },
    { label: "Hot Rolled Coils", path: "/hotRolled/coils" },
  ],
  "Cold Rolled": [
    { label: "Cold Rolled Sheet", path: "/coldRolled/sheet" },
    { label: "Cold Rolled Coils", path: "/coldRolled/coils" },
  ],

  "All Product": [
    { label: "See All", path: "/mildStainless" },
    // { label: "Stainless Steel", path: "/stainless" },
  ],
};
const  DropdownMenu = ({menuItems=[],buttonName}) => {
  const [open, setOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(null);


  return (
    <div className="relative group  "

   
    onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => {
    setOpen(false);
    setSubMenu(null);
  }}  >
      {/* Main Dropdown Button */}

      
      <button
  onClick={() => setOpen(!open)}
  className=" relative font-medium font-poppins text-[16px] rounded flex items-center gap-2 cursor-pointer transition-colors"
>
  {buttonName}
  <svg
    className={`transform transition-transform duration-300 ${
      open ? "rotate-180" : "rotate-0"
    }`}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"
    />
  </svg>
</button>


      {/* Main Dropdown Menu */}
     

{/* <div className=" left-0 mt-2 w-40 bg-white border rounded shadow-lg z-50" */}

          
{open && (

  
       
        <ul className=" absolute  space-y-2 pt-0  left-0 mt-0  bg-black/40   rounded shadow-lg z-50 ">
          {menuItems.map((item) => (
           <>
            <li className=" hover:bg-black relative group " key={item}
            
            >
              <button
                onClick={() => setSubMenu(subMenu === item ? null : item) 
                  
               }
               onMouseEnter={() => setSubMenu(item)} // Open submenu on hover
                onMouseLeave={() => setSubMenu(null)}
                className="w-56  flex justify-between text-left px-4 py-2 hover:bg-black hover:text-[#12396d] cursor-pointer"
              >
              
               <span className=" text-white  font-medium font-poppins">{item}</span> 
                <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"/></svg>
              </button>
          

              {/* Submenu */}
              {/* <div className="relative"> */}
              {submenuMapping[item] && subMenu === item &&  (
                <ul className=" absolute space-y-2 pt-0  top-0 left-full w-56 bg-black/40  shadow-lg z-50"
                 onMouseEnter={() => setSubMenu(item)} // Open submenu on hover
              onMouseLeave={() => setSubMenu(null)} // Close submenu when mouse leaves item
            
                >
                
                {submenuMapping[item].map((subItem) => (
                    <li key={subItem.label} className="hover:bg-black text-white font-medium font-poppins">
                      <Link
                        to={subItem.path}
                        className="block px-4 py-1 hover:bg-black cursor-pointer"
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            
            </>
          ))}
        </ul>
    
      )}
    </div>
  );
};

export default DropdownMenu;

// export const DropdownMenu1=({menuItems=[],buttonName})=>{
//     const [open, setOpen] = useState(false);
//     const [subMenu, setSubMenu] = useState(false);
  
  
  
//     return (
//         <div className="relative inline-block   "
//         // onMouseEnter={() => setOpen(true)}
//         //       onMouseLeave={() => {
//         //         setOpen(false);
//         //         setSubMenu(null);
//         //       }}
//             >
//               {/* Main Dropdown Button */}
        
              
//               <button onClick={() => setOpen(!open)} className="px-4  py-[0.45rem]  rounded flex cursor-pointer hover:text-blue-700">
//                 {buttonName}{" "} {open ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"/></svg>}
//               </button>
        
//               {/* Main Dropdown Menu */}
//               {open && (
        
//         <nav className="bg-red-400 ">
        
//                 <ul className="absolute left-0  w-64 bg-white border rounded shadow-lg">
//                   {menuItems.map((item) => (
//                     <li key={item}
//                     //  onMouseEnter={() => setSubMenu(item)}
//                     //   onMouseLeave={() => setSubMenu(null)}
                  
//                     >
//                       <button
//                         onClick={() => setSubMenu(subMenu === item ? null : item) 
                          
//                        }
//                     //    onMouseEnter={() => setOpen(true)}
//                     //    onMouseLeave={() => setOpen(false)}
//                         className="w-full flex justify-between text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       >
                      
//                         {item} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"/></svg>
//                       </button>
                    
        
//                       {/* Submenu */}
//                       {subMenu === "Hot rolled sheets" && (
//                         <ul className="absolute left-64 top-0 mt-2 w-40 bg-white border rounded shadow-lg">
                        
//                         {["Hot Rolls Sheet","Cold Rolled","Wire Rods","Coated","Colour coated"].map((item)=>
//                         (
//                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >{item}</li>
//                         ))
//                         }
        
                        
                       
                       
//                         </ul>
//                       )}
//                       {subMenu === "Hot rolled coils" && (
//                         <ul className="absolute left-64 top-10 mt-2 w-40 bg-white border rounded shadow-lg">
//                         {["Hot Rolls Sheet","Cold Rolled","Wire Rods","Coated","Colour coated"].map((item)=>
//                         (
//                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >{item}</li>
//                         ))
//                         }
                       
//                         </ul>
//                       )}
//                       {subMenu ===  "Could rolled sheets" && (
//                         <ul className="absolute left-64 top-20 mt-2 w-40 bg-white border rounded shadow-lg">
//                         {["Hot Rolls Sheet","Cold Rolled","Wire Rods","Coated","Colour coated"].map((item)=>
//                         (
//                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >{item}</li>
//                         ))
//                         }
                       
//                         </ul>
//                       )}
//                       {subMenu ===  "Cold rolled coils" && (
//                         <ul className="absolute left-64 top-40 mt-2 w-40 bg-white border rounded shadow-lg">
//                         {["Hot Rolls Sheet","Cold Rolled","Wire Rods","Coated","Colour coated"].map((item)=>
//                         (
//                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >{item}</li>
//                         ))
//                         }
                       
//                         </ul>
//                       )}
        
//                       {subMenu ===  "Colour Coated" && (
//                         <ul className="absolute left-64 top-0 mt-2 w-40 bg-white border rounded shadow-lg">
//                         {["Hot Rolls Sheet","Cold Rolled","Wire Rods","Coated","Colour coated"].map((item)=>
//                         (
//                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >{item}</li>
//                         ))
//                         }
                       
//                         </ul>
//                       )}
//                     </li>
//                   ))}
                  
//                 </ul>
//                 </nav>
//               )}
//             </div>
//     );
//   };

  export const DropdownMenu2=({buttonName})=>{
    const [open, setOpen] = useState(false);
   return(
   <div className=" relative group   "
      onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => {
    setOpen(false);
    // setSubMenu(null);
       }}     >  
    <button
  onClick={() => setOpen(!open)}
  className="py-[0.45rem] relative font-medium font-poppins text-[16px] rounded flex items-center gap-1 cursor-pointer transition-colors"
>
  {buttonName}
  <svg
    className={`transform transition-transform duration-300 ${
      open ? "rotate-180" : "rotate-0"
    }`}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"
    />
  </svg>
</button>
    
          {/* Main Dropdown Menu */}
          {open && (
    
 
    
              
 
    <ul className="absolute z-40 pb-4 flex flex-col gap-5 p-5 text-[16px] right-0.5 bg-black/40 rounded-2xl shadow-lg" 
    >
      <li>
      <div className="flex gap-5">
      <div>
      <a href="tel:+919891998846" target="_blank">
      <svg className=" rounded-full text-white p-1 h-10 w-10 border " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.95 21q-3.125 0-6.187-1.35T8.2 15.8t-3.85-5.55T3 4.05V3h5.9l.925 5.025l-2.85 2.875q.55.975 1.225 1.85t1.45 1.625q.725.725 1.588 1.388T13.1 17l2.9-2.9l5 1.025V21z"/></svg>
</a>
      </div>
      <div>
      <p className="font-semibold text-white  text-[16px] font-poppins">Call us</p>
      <a href="tel:+919891998846" className="flex gap-2 items-center">
            
            <span className="text-white   text-md font-bold">+91-9891998846</span>
          </a>
     <p className="font-normal text-white text-[16px] font-poppins">Mon-Fri 10 am to 7 pm </p>
      </div>
  
      </div>

      </li>
      <li>
      <div className="flex gap-5">
      <div>
      <a href="mailto:sonateksteels@gmail.com" target="_blank">
      <svg className=" text-white  rounded-full p-2 h-10 w-10 border " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/></svg></a>
      </div>
      <div>
      <p className="font-semibold text-white  text-[16px] font-poppins">Write to us</p>
      <a href="mailto:sonateksteels@gmail.com" className="flex gap-2 items-center">
           
            <span className="text-white  text-md font-bold">sonateksteels@gmail.com</span>
          </a>
      </div>
  
      </div>

      </li>

      <li>
      <div className="flex items-center justify-center">
      <a href="mailto:sonateksteels@gmail.com" target="_blank">
      <button className="w-40 h-14 font-poppins hover:bg-black border border-white  font-medium text-white  cursor-pointer  rounded-lg ">
        Help & support
      </button>
  </a>
      </div>

      </li>
    </ul>
   
 
    
            
         
          )}
        </div>
   )

  };
  

