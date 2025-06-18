// ProductDetail.jsx
import { useNavigate, useParams } from "react-router-dom";
import cardData from "./data/hotrollcoils"; // move cardData to separate file if needed
import { ThicknessGrid,WidthGrid } from "./HelperComponent";
import { useEffect, useMemo, useState } from "react";
import { FaSquareWhatsapp } from "react-icons/fa6";
import hotrolledproductdata from "./data/hotrollcoildata"
import { Hotrolledinfo } from "./Hotrolledinfo";
import { Hotrollcoilinfo } from "./Hotrollcoilinfo";
import useFetchProducts from "../hooks/useFetchProducts";
import DeleteButton from "./Admin/DeleteButton";
const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE
import axios from "axios";
const HotCatCoilsDEl = () => {

const [selectedThickness,setSelectedThickness]=useState(null);
const [selectedWidth,setSelectedWidth]=useState(null);
  const [selectedLength,setSelectedLength]=useState(null);
  const[customLength,setcustomLength]=useState(null);
const[customNumber,setcustomNumber]=useState(null);
const [isMobileOpen, setIsMobileOpen] = useState(false);
const { id } = useParams();

const navigate=useNavigate();
const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
   

const { products, loading, error } = useFetchProducts();




      if (loading) return <div className="text-center text-3xl font-bold font-poppins pt-20">Loading...</div>;
      if (error) return <div className="text-center text-3xl font-bold font-poppins pt-20 text-red-600">Error loading products</div>;
      if (!products || products.length === 0) return <div className="text-center text-3xl font-bold font-poppins pt-20">No products found</div>;
    
      const product = products.find(p => p._id === id);
      if (!product) return <div className="text-center text-3xl font-bold font-poppins pt-20">Product not found</div>;
    

      console.log("fetch",product);
    

  
const handleDelete=async()=>{
  try{
await axios.delete(`${BASE_URL}/api/admin/product/deleteProduct/${id}`);
navigate('/mildStainless')
}
catch (err) {
  console.error("Failed to delete", err);
}
}
  return (
    <div className=" w-full px-5  mb-20 lg:px-20 z-10 pt-24  ">
     
     <div className="flex w-full  lg:gap-5 lg:justify-between  ">
     <div className="w-full  lg:px-0 lg:flex lg:gap-5">
      <div className=" lg:w-1/2  h-[520px]  lg:px-0 ">
        {/* img */}
        <img 
        className=" h-full object-cover rounded-lg" 
        src={`${BASE_URL}${product?.image}`}
         alt={product?.title} />
   

      </div>
      <div className="lg:w-4/3 pt-4 lg:pt-0 flex flex-col gap-2">
{/* detail */}
<div className="flex justify-between  items-center">
<h1 className="text-xl font-extrabold  sm:w-[420px] w-80 lg:w-full text-[#262626] font-poppins mb-2">{product.name}</h1>

{isAdmin&&(
        <div className='flex gap-2 '>
         <button  onClick={()=> navigate(`/editproduct/${id}`)} className='cursor-pointer bg-[#12396d] text-white p-2 rounded-full'>
         <svg  
          
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>
         
         </button>

         <DeleteButton 
          onConfirm={handleDelete} 

         />
          </div>
       )}  
</div>



{/* <div className="flex gap-2">
<span className="text-sm font-normal font-poppins text-[#262626]">Brand:</span> <span className="font-semibold text-sm font-poppins text-[#262626] ">{products.brand}</span>

</div> */}
         <div className="flex w-[100%] sm:w-full  justify-between pb-2 border-b-2 border-gray-200">
          <h3 className="font-semibold text-[#262626] font-poppins text-[1rem]">Select attributes</h3>
         <div className="flex   "
         onClick={()=>{
        //   setSelectedLength(null);
          setSelectedThickness(null)
          setSelectedWidth(null)
           setcustomLength(null)
          setcustomNumber(null)
         }}
         
         >
         <svg className="text-[#12396d]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0 7q-3.475 0-6.025-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21"/></svg>
         <h3 className="font-semibold  text-[1rem] text-[#12396d] cursor-pointer font-poppins">Reset Selection</h3>
         </div>
         </div>
     <div>
     
     <ThicknessGrid title="Thickness" values={product.thickness}
        selected={selectedThickness}
        onSelect={(value)=>{
          setSelectedThickness(value);
// setSelectedLength(null);
setSelectedWidth(null)
        }}
      />
       </div>
      

<WidthGrid title="Width" values={product.width}
  disable={!selectedThickness} showMessage={!selectedWidth} selected={selectedWidth} onSelect={(value)=>{setSelectedWidth(value);}}
/>
{/* <LengthGrid title="Length" values={lengthValues}
  disable={!selectedWidth} selected={selectedLength} onSelect={(value)=>setSelectedLength(value)}
/> */}


  <div className="flex  items-center gap-2 pt-2">
{/* <div className="bg-[#f2f6ff] rounded-sm font-poppins w-64 h-10 flex justify-center items-center"> */}
{/* <span className="flex gap-2">
<h6>Custom length (mm):</h6>
<input 
 value={customLength}
 onChange={(e) => setcustomLength(e.target.value)}
 type="text" className="outline-none w-20 h-6 p-2 rounded-sm border border-gray-300 bg-white"/>
</span> */}


      {/* </div> */}
      {/* <p className="text-[#262626] font-poppins">
      Enter a value between 2500 to 12000</p> */}
</div>

<div className="flex flex-col  sm:flex-row sm:items-center gap-2 pt-2 w-full">
  <div className="bg-[#f2f6ff] rounded-sm font-poppins w-[60%] sm:w-64 h-auto sm:h-16 flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 py-1">
    <label className="font-poppins text-[12px] font-semibold mb-1 sm:mb-0">
      Custom Weight (mm):
    </label>
    <input 
      type="text"
      value={customLength}
      onChange={(e) => {
        if (selectedWidth && !selectedLength) {
          const onlyNumsWithDecimal = e.target.value.replace(/[^0-9.]/g, "");
          setcustomLength(onlyNumsWithDecimal);
        }
      }}
      disabled={!selectedWidth || selectedLength}
      className={`outline-none w-full sm:w-24 h-16 sm:h-10 p-2 rounded-sm border text-sm
        ${
          !selectedWidth || selectedLength
            ? "bg-gray-400 text-gray-500 border-gray-500 cursor-not-allowed"
            : "bg-white text-black border-gray-300"
        }`}
    />
  </div>

  <p className="text-[#262626] font-poppins text-xs sm:text-sm font-normal">
    Enter a value custom length value
  </p>
</div>


<div className="pt-4">
  <p className="text-[#262626] font-poppins font-sm font-semibold">
    Specify quantity (In number of sheets)
  </p>
  <input 
    value={customNumber}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only digits and at most one dot
      if (/^\d*\.?\d*$/.test(value)) {
        setcustomNumber(value);
      }
    }}
    disabled={!(selectedThickness && selectedWidth && (selectedLength || customLength))} 
    type="text"
    className={`outline-none m-1 w-56 h-10 p-2 rounded-sm border 
      ${(selectedThickness && selectedWidth && (selectedLength || customLength))
        ? "bg-white border-gray-400"
        : "bg-gray-200 border-gray-300 cursor-not-allowed"
      }`}
    placeholder="Enter custom number"
  />
</div>


<div className="   sm:flex items-center ">
<div className="sm:h-48  lg:w-80 w-52    sm:flex md:flex lg:flex flex-col gap-4  rounded-lg">
<h1 className="font-poppins font-bold text-lg pt-4">Send  all details on Whatsapp </h1>
{/* <a 
> */}
      
        {/* whatapps buttom*/}
       <button 
       className={`flex gap-2 mt-2 items-center justify-center p-2 rounded-lg w-full sm:w-64 transition-colors duration-200
  ${selectedThickness && selectedWidth && (selectedLength || customLength) || customNumber 
        ? 'bg-green-500 cursor-pointer' 
        : 'bg-gray-400 cursor-not-allowed'}`}
       onClick={() => {
      if (selectedThickness && selectedWidth && (selectedLength || customLength)  || customNumber)
      {
        window.open(
          `https://wa.me/918062960347?text=${encodeURIComponent(
            `Product: ${product.name}\nThickness: ${selectedThickness} mm\n Width: ${selectedWidth} mm  \n Weight: ${selectedLength || customLength}mm \nQuantity: ${customNumber} sheets`
          )}`,
          "_blank"
        );

        setSelectedThickness(null);
    setSelectedWidth(null);
     setSelectedLength(null);
    setcustomLength("");
    setcustomNumber("");
      } 
    }}
      disabled={!(selectedThickness && selectedWidth && (selectedLength || customLength) || customNumber)}    
    
    > <a  >
     <FaSquareWhatsapp
    className="w-6 h-6 sm:w-10 sm:h-10 text-white"
      />
        </a><span className='text-white font-poppins font-medium text-sm sm:text-base'>Enquire On Whatsapp</span>
</button>
      {/* </a> */}
</div>

      
        {/* whatapps buttom*/}
        <div className="   flex item-center ">
        <a href={`tel:${product.number}`} target="_blank">
        <div className=" bg-[#12396d] gap-4 items-center  flex h-14    p-2 rounded-lg w-full sm:w-36 transition-colors duration-200">
   
        <svg className="text-white" width="24" height="24" viewBox="0 0 24 24" fill="#12396d" xmlns="http://www.w3.org/2000/svg">
<path d="M14 6.34141C15.7048 6.94398 17.056 8.29517 17.6586 10M14.9655 3.5C17.5505 4.40178 19.5982 6.44948 20.5 9.03451M11.581 13.419C10.4831 12.3211 9.6162 11.0797 8.98026 9.75516C8.92556 9.64123 8.89821 9.58426 8.8772 9.51218C8.80252 9.25601 8.85616 8.94146 9.0115 8.72452C9.05521 8.66347 9.10744 8.61125 9.21189 8.5068C9.53133 8.18736 9.69105 8.02764 9.79547 7.86703C10.1893 7.26134 10.1893 6.4805 9.79547 5.87481C9.69104 5.7142 9.53133 5.55448 9.21189 5.23504L9.03383 5.05699C8.54825 4.5714 8.30546 4.32861 8.0447 4.19672C7.52611 3.93443 6.91369 3.93443 6.3951 4.19672C6.13434 4.32861 5.89155 4.57141 5.40597 5.05699L5.26193 5.20102C4.77801 5.68494 4.53605 5.92691 4.35126 6.25587C4.1462 6.6209 3.99876 7.18785 4.00001 7.60653C4.00113 7.98385 4.07432 8.24172 4.22071 8.75746C5.00738 11.5291 6.49168 14.1445 8.6736 16.3264C10.8555 18.5083 13.4709 19.9926 16.2425 20.7793C16.7583 20.9257 17.0162 20.9989 17.3935 21C17.8121 21.0012 18.3791 20.8538 18.7441 20.6487C19.0731 20.4639 19.3151 20.222 19.799 19.7381L19.943 19.594C20.4286 19.1084 20.6714 18.8657 20.8033 18.6049C21.0656 18.0863 21.0656 17.4739 20.8033 16.9553C20.6714 16.6945 20.4286 16.4518 19.943 15.9662L19.765 15.7881C19.4455 15.4687 19.2858 15.309 19.1252 15.2045C18.5195 14.8107 17.7387 14.8107 17.133 15.2045C16.9724 15.309 16.8126 15.4687 16.4932 15.7881C16.3888 15.8926 16.3365 15.9448 16.2755 15.9885C16.0585 16.1438 15.744 16.1975 15.4878 16.1228C15.4157 16.1018 15.3588 16.0744 15.2448 16.0197C13.9203 15.3838 12.6789 14.5169 11.581 13.419Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
   <span className="text-white font-lg text-center font-medium font-poppins">Call Now</span>

      </div> 
      </a>
      {/* </a> */}

</div>
</div>


</div>

     
</div>

      
     </div>
     
     
     <div className="w-3/4 hidden md:block h-full border border-[#e6e6e6] rounded-lg mt-10 p-4">
     <h4 className="text-[18px] font-bold font-poppins border-b-2 text-[#262626] pb-4 border-b-gray-100">Overview</h4>
     <p className="text-[1rem] pt-2 font-semibold text-[#262626] wrap-normal font-poppins">Product information</p>
     <p className="text-sm font-poppins font-normal pt-2 text-[#262626]">{hotrolledproductdata.description}</p>

<ul className="border-b-2 border-b-gray-200 pb-4 pl-4 pt-4 list-disc ">
   {hotrolledproductdata.features.map((product,index)=>(
  <li className="list-disc font-normal pl-0 text-sm" key={index}>
    {product}
  </li>
  ))}
</ul>

<div>
  <p className="text-[1rem] font-semibold pt-2 wrap-normal font-poppins">
  Item details</p>
<div className="flex gap-10 pt-3">
<div>
<p className="text-[#70737a] font-medium font-poppins text-[0.875rem]">Brand name <p className="font-bold text-[.875rem] font-poppins text-black">{hotrolledproductdata.brand}</p></p>
</div>
<div>
<p className="text-[#70737a] font-medium font-poppins text-[0.875rem]">Sheet weight <p className="font-bold text-[.875rem] font-poppins text-black">{hotrolledproductdata.sheetWeight}</p></p>
</div>
</div>

<div className="border-b border-b-gray-200 pb-4 pt-3">
<p className="text-[#70737a] font-medium font-poppins text-[0.875rem]">Supply condition<p className="font-bold text-[.875rem] font-poppins text-black">{hotrolledproductdata.supplyCondition.join(", ")}</p></p>
</div>

<div>
<p className="  font-poppins text-[0.875rem] font-bold pt-3">Packaging<p className="font-normal text-[.875rem]  font-poppins text-black">{hotrolledproductdata. packaging}</p></p>
</div>




</div>



     </div>
    
     <div className="block md:hidden border-b-4 px-4 mt-4  border-[#f1f1f1]">
        <button
          className="w-full text-left flex justify-between items-center py-4"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <h4 className="text-[16px] font-normal font-poppins text-[#262626]">
            Overview
          </h4>
          <span className="text-xl">{isMobileOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"/></svg>}</span>
        </button>

        {isMobileOpen && (
          <div className="transition-all duration-300 ease-in-out">
            <p className="text-[1rem] pt-2 border-t-2 border-[#f1f1f1] font-semibold text-[#262626] font-poppins">
              Product information
            </p>
            <p className="text-sm font-poppins font-normal pt-2 text-[#262626]">
              {hotrolledproductdata.description}
            </p>

            <ul className="border-b-2 border-[#f1f1f1] pb-2 pl-4 pt-4 list-disc">
              {hotrolledproductdata.features.map((product, index) => (
                <li className="font-normal text-sm" key={index}>
                  {product}
                </li>
              ))}
            </ul>

            <div>
              <p className="text-[1rem] font-semibold pt-2 font-poppins">
                Item details
              </p>
              <div className="flex flex-col gap-4 pt-3">
                <div>
                  <p className="text-[#70737a] font-medium text-[0.875rem]">
                    Brand name
                  </p>
                  <p className="font-bold text-[.875rem] text-black">
                    {hotrolledproductdata.brand}
                  </p>
                </div>
                <div>
                  <p className="text-[#70737a] font-medium text-[0.875rem]">
                    Sheet weight
                  </p>
                  <p className="font-bold text-[.875rem] text-black">
                    {hotrolledproductdata.sheetWeight}
                  </p>
                </div>
              </div>

              <div className="border-b-2 border-[#f1f1f1] pb-4 pt-3">
                <p className="text-[#70737a] font-medium text-[0.875rem]">
                  Supply condition
                </p>
                <p className="font-bold text-[.875rem] text-black">
                  {hotrolledproductdata.supplyCondition.join(", ")}
                </p>
              </div>

              <div className="pt-3">
                <p className="text-[0.875rem] font-bold">Packaging</p>
                <p className="font-normal text-[.875rem] mb-4 text-black">
                  {hotrolledproductdata.packaging}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

     
     <Hotrollcoilinfo/>
     
    
    </div>
  );
};

export default HotCatCoilsDEl;
