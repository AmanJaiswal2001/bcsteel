import React, { useState,useEffect } from 'react'
import Card from './Card';
import CardSheet from './CardSheet';
import Button from './Button';

const cardData = [
    {
      title: "Jindal Stainless Steel HRAP 310S N1 Finish Sheets",
      brand: "SONATEK",
      thickness: "5-25mm",
      width: "1250-1500mm",
      buttonName: "Purchase now",
      delivery: "Delivery in 2-5 days",
      image: "ezgif.com-gif-maker__32_.webp",   
       length:"2500-6000mm"
    },
    {
      title: "Jindal Stainless Steel HRAP 310S N1 Finish Sheets",
      brand: " SONATEK",
      thickness: "0.5-5mm",
      width: "1250-1500mm",
      buttonName: "Purchase now",
      delivery: "Delivery in 3-5 days",
      image: "ezgif.com-gif-maker__32_.webp",  
          length:"2500-3000mm"
    },
    // {
    //   title: "SAIL Steel Cold Plates",
    //   brand: "Brand: SAIL",
    //   thickness: "2-40mm",
    //   width: "1200-2500mm",
    //   buttonName: "Get Quote",
    //   delivery: "Delivery in 4-6 days",
    //   image: "https://images.ctfassets.net/o0otttl8ele8/5gsbSO1xNf1sDaht3NQeBD/c0e7e976bfec022a4e5cb865fadae500/cr-steel-advantages-min.jpg?fit=fill&w=280&h=153&fm=webp",
    // },
    //  {
    //   title: "Essar Cold Rolled Sheets",
    //   brand: "Brand: Essar Steel",
    //   thickness: "1.2-16mm",
    //   width: "800-2200mm",
    //   buttonName: "Buy Now",
    //   delivery: "Delivery in 5-8 days",
    //   image: "https://images.ctfassets.net/o0otttl8ele8/3HILc9ZoCKpUsn6crHWRSA/f25ae168abf380cf756b19a6e22caefa/ezgif.com-gif-maker__35_.webp?fit=fill&w=280&h=153&fm=webp",
    //  },
    //  {
    //   title: "Jindal Cold Galvanized Coils",
    //   brand: "Brand: Jindal Steel",
    //   thickness: "0.4-2mm",
    //   width: "700-1800mm",
    //   buttonName: "Purchase",
    //   delivery: "Delivery in 2-4 days",
    //   image: "https://images.ctfassets.net/o0otttl8ele8/3HILc9ZoCKpUsn6crHWRSA/f25ae168abf380cf756b19a6e22caefa/ezgif.com-gif-maker__35_.webp?fit=fill&w=280&h=153&fm=webp",
    //  },
  ];
  

const Sheets300 = ({type}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3; 
  

    const filteredCards = cardData.filter((card) => {
        if (type === "hot") {
          return card.title.toLowerCase().includes("hot");
        } else if (type === "cold") {
          return card.title.toLowerCase().includes("cold");
        }
        return true; // fallback for all
      });
    
      // Reset index when type changes
      useEffect(() => {
        setCurrentIndex(0);
      }, [type]);

    const nextSlide = () => {
        if (currentIndex + visibleCards < cardData.length) {
          setCurrentIndex(currentIndex + 1);
        }
      };
    
      const prevSlide = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };
    return (
        <div className="relative max-w-full mx-auto ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10  ">
       
        {filteredCards.slice(currentIndex, currentIndex + visibleCards).map((card, index) => (
            <div className=' w-full flex justify-center gap-0'>
            <CardSheet key={index} {...card} />
            </div>
          ))}
         </div>
         

         {filteredCards.length>visibleCards&&(
          <button
             className={`absolute -left-10 h-9 w-9 top-[40%] hidden bg-[#e6f0ff] lg:flex items-center justify-center bg-opacity-50 cursor-pointer text-[#12396d] p-1 rounded-lg hover:bg-[#d7e7f16 ${currentIndex===0?"hidden":"block"}`}
             onClick={prevSlide}
            disabled={currentIndex === 0}
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m3.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675T.825 12t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"/></svg>
    
          </button>
    
         )}
        
          {/* Next Button */}
          {filteredCards.length>visibleCards&&(
            <button
            className={`absolute -right-10  h-9 w-9 top-[40%] hidden bg-[#e6f0ff] lg:flex items-center justify-center bg-opacity-50 cursor-pointer text-[#12396d] p-1 rounded-lg hover:bg-[#d7e7ff] ${currentIndex + visibleCards >= filteredCards.length ?"hidden":"block"}`}
            onClick={nextSlide}
            disabled={currentIndex + visibleCards >= cardData.length}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"/></svg>    
           
        
          </button>
          )}
     

          <div className='lg:mt-20 mt-10 mb-5 flex justify-center'>
<Button
 buttonName="View all"
 rounded="rounded-lg"
  text="text-[#12396d]"  bgColor="bg-white hover:bg-[#cae0fe]" border="border-2 border-[#2241a6]"
  width="w-60" />
</div>
        </div>
      
  )
}

export default Sheets300