import React, { useState,useEffect } from 'react'
import Card from './Card';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';


const CardContainer = ({data = [],type}) => {
    
  const [slideDirection, setSlideDirection] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3; 
  
    const navigate = useNavigate();
    // const filteredCards = cardData.filter((card) => {
    //     if (type === "hot") {
    //       return card.title.toLowerCase().includes("hot");
    //     } else if (type === "cold") {
    //       return card.title.toLowerCase().includes("cold");
    //     }
    //     return true; // fallback for all
    //   });
    
      // Reset index when type changes
    
    const filteredCards=data.filter((card)=>{
return card.type?.toLowerCase().includes(type);
    })
    
      useEffect(() => {
        setCurrentIndex(0);
      }, [type]);

    const nextSlide = () => {
        if (currentIndex + visibleCards < filteredCards.length) {
          setSlideDirection("right");
          setCurrentIndex(currentIndex + 1);
        }
      };
    
      const prevSlide = () => {
        if (currentIndex > 0) {
          setSlideDirection("left");
          setCurrentIndex(currentIndex - 1);
        }
      };
    return (
        <div className="relative max-w-full mx-auto   ">
        <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 transition-transform duration-200 ease-in-out ">
       
        {filteredCards.slice(currentIndex, currentIndex + visibleCards).map((card, index) => (
            <Link key={card._id || indexindex} to={`/coilproduct/${card._id || index}`}
             className='w-full flex justify-center gap-0 '>
            <Card  {...card} direction={slideDirection} />
            </Link>
          ))}
         </div>
         {
          filteredCards.length>visibleCards&&(
            <button
            className={`absolute -left-10 h-9 w-9 top-[40%] hidden bg-[#e6f0ff] lg:flex items-center justify-center bg-opacity-50 cursor-pointer text-[#2241a6] p-1 rounded-lg hover:bg-[#d7e7ff] ${currentIndex===0?"hidden":"block"}`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
             <svg className='text-center font-normal' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m3.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675T.825 12t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"/></svg>
    
          </button>
    
          )
         }
       
          {/* Next Button */}
        {filteredCards.length>visibleCards&&(
          <button
            className={`absolute -right-10  h-9 w-9 top-[40%] hidden bg-[#e6f0ff] lg:flex items-center justify-center bg-opacity-50 cursor-pointer text-[#2241a6] p-1 rounded-lg hover:bg-[#d7e7ff] ${currentIndex + visibleCards >= filteredCards.length ?"hidden":"block"}`}
            onClick={nextSlide}
            disabled={currentIndex + visibleCards >= filteredCards.length}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"/></svg>    
           
        
          </button>
        )}
         
<div className='mt-20  border-2 cursor-pointer bg-[#12396d] border-[#2241a6] rounded-lg items-center m-auto w-[90%]  sm:w-[30%] flex justify-center'>
<Button

onClick={() => navigate("/hotRolled/coils")}
 buttonName="View all"
 rounded="rounded-lg"
  text="text-[#2241a6]"  bgColor="bg-white hover:bg-[#cae0fe]" border="border-2 border-[#2241a6]"
  width="w-60 " />
</div>
         
        </div>
      
  )
}

export default CardContainer