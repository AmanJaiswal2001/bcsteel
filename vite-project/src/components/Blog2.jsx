import React from 'react'


// blogData.ts
// blogData.ts
export const smoothSurfaceBlogContent = [
    {
      type: "paragraph",
      text: "Cold rolling is a metalworking process where metal is passed through rollers at room temperature to reduce thickness and improve surface finish."
    },
    {
      type: "paragraph",
      text: "Unlike hot rolling, cold rolling enhances the mechanical properties and dimensional accuracy of the material. It is mainly used to produce steel sheets and strips with a superior surface quality and tighter tolerances."
    },
    {
      type: "heading",
      text: "Key Advantages of Cold Rolling"
    },
    {
      type: "list",
      items: [
        "Produces a smoother and shinier surface finish.",
        "Increases tensile strength and hardness through strain hardening.",
        "Ensures tighter dimensional tolerances.",
        "Improves surface flatness and straightness.",
        "Suitable for applications requiring aesthetic appeal and precise fit."
      ]
    },
    {
      type: "heading",
      text: "Common Applications"
    },
    {
      type: "list",
      items: [
        "Appliances and white goods",
        "Automotive body panels",
        "Metal furniture",
        "Electrical enclosures",
        "Precision instruments"
      ]
    },
    {
      type: "paragraph",
      text: "Cold rolled steel is preferred where appearance and precision are crucial. It is often further processed (e.g., annealed, coated) depending on the end-use."
    }
  ];
  
  


const Blog2 = () => {

    return (
        <div>
            <div className="  w-full mb-20  pt-20 sm:pt-0">
            <div className="w-full relative">
            <img className='w-full h-[500px] object-cover' src=  "/blog2.jpg.png" />
    <div className='flex items-center justify-center'>
    {/* <p className='absolute text-white top-[50%] text-center font-extrabold flex items-center md:text-9xl  m-auto font-poppins'>About Us</p> */}
    <p className='absolute text-white top-[60%] sm:left-20 left-0 px-5  font-extrabold flex text-3xl  md:text-4xl  m-auto font-poppins'>SMOOTH SURFACE</p>
     <p className='absolute sm:w-[60%] w-full px-5 text-white top-[70%] sm:left-20 left-0  font-semibold flex  text-xl md:text-2xl  m-auto font-poppins'>Cold rolling in performed to produce sheets & strips with smooth surfaces, having a better surface finish with accurate dimensions.</p>
   
    </div>
               </div>
    
    
               <div className="w-full sm:px-20 px-5 mx-auto  py-10 font-poppins text-[#262626]">
               {smoothSurfaceBlogContent.map((block, idx) => {
  if (block.type === "heading") {
    return <h3 key={idx} className="sm:text-3xl  text-lg  pt-0 font-poppins font-semibold mb-2 ">{block.text}</h3>;
  } else if (block.type === "paragraph") {
    return <p key={idx} className=" text-lg leading-relaxed">{block.text}</p>;
  } else if (block.type === "list") {
    return (
      <ul key={idx} className="list-disc ml-6 mb-2 text-sm text-gray-700 space-y-1">
        {block.items.map((item, i) => (
          <li className='font-poppins' key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
})}
    </div>
    
     
    
     
    
    {/* section 3 */}
    
    
    
    
    </div>
        </div>
      )
 
}

export default Blog2