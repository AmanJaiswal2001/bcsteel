import React from 'react'


// blogData.ts
// blogData.ts
export const basicallySteelBlogContent = [
    
    {
        desc:"Steel Description"
    },
    
    {
      type: "paragraph",
      text: "Steel is an alloy primarily composed of iron and a small percentage of carbon, which enhances its strength and fracture resistance."
    },
    {
      type: "paragraph",
      text: "It is one of the most widely used engineering and construction materials, known for its durability, versatility, and recyclability. From skyscrapers to kitchen utensils, steel plays a vital role in our everyday lives."
    },
    {
      type: "heading",
      text: "Why Steel Matters"
    },
    {
      type: "list",
      items: [
        "Extremely strong yet flexible — suitable for structural frameworks.",
        "Highly recyclable and eco-friendly with minimal degradation.",
        "Offers excellent resistance to wear, fatigue, and impact.",
        "Can be alloyed with other elements (like chromium, nickel) to enhance corrosion resistance and hardness."
      ]
    },
    {
      type: "heading",
      text: "Types of Steel"
    },
    {
      type: "list",
      items: [
        "Carbon Steel – Commonly used in construction and pipelines.",
        "Alloy Steel – Enhanced with elements like manganese or nickel.",
        "Stainless Steel – Contains chromium for rust resistance.",
        "Tool Steel – Used for cutting tools due to high hardness."
      ]
    },
    {
      type: "heading",
      text: "Applications of Steel"
    },
    {
      type: "list",
      items: [
        "Construction of bridges, buildings, and industrial structures",
        "Automobile frames and components",
        "Household appliances and furniture",
        "Pipelines, tools, and heavy machinery",
        "Railways and infrastructure"
      ]
    },
    {
      type: "paragraph",
      text: "Steel’s adaptability, combined with its strength and affordability, makes it the backbone of modern infrastructure and industry."
    }
  ];
   
  


const Blog3 = () => {

    return (
        <div>
            <div className="  w-full mb-20  pt-20 sm:pt-0">
            <div className="w-full relative">
            <img className='w-full h-[500px] object-cover' src="/blog3.jpg" />
    <div className='flex w-full '>
    <p className='absolute text-white top-[60%] sm:left-20  left-0 px-5 font-extrabold flex  md:text-4xl  m-auto font-poppins'>Steel Description</p>
     <p className='absolute sm:w-[60%] px-5 text-white top-[70%] sm:left-20 left-0  font-semibold flex  text-xl md:text-2xl  m-auto font-poppins'>Steel is an alloy primarily composed of iron and a small percentage of carbon, which enhances its strength and fracture resistance.</p>
    </div>
               </div>
    
    
               <div className="w-full sm:px-20 px-5  mx-auto  py-10 font-poppins text-[#262626]">
               { basicallySteelBlogContent.map((block, idx) => {
  if (block.type === "heading") {
    return <h3 key={idx} className="sm:text-3xl text-lg font-poppins font-semibold mb-2 ">{block.text}</h3>;
  } else if (block.type === "paragraph") {
    return <p key={idx} className=" text-lg leading-relaxed">{block.text}</p>;
  } else if (block.type === "list") {
    return (
      <ul key={idx} className="list-disc ml-6 mb-2 text-sm text-gray-700 space-y-1">
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
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

export default Blog3