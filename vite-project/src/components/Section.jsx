import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import CardContainer from './CardContainer';
import ColdContainer from './ColdContainer';
import SheetCard from './SheetCard';
import ColdSheetCard from './ColdSheetCard';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFetchProducts from '../hooks/useFetchProducts';

const Section = () => {
  const [activeType, setActiveType] = useState("hot");
  const [activeProduct, setActiveProduct] = useState('coil');
  // const [product,setProduct]=useState([]);
  const navigate = useNavigate();

  // Get admin status
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';


  const { products, loading, error } = useFetchProducts();


  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading products...</div>;
  }
  
  if (error) {
    return <div className="text-center mt-20 text-red-600">Error loading products.</div>;
  }
  const filterProducts = Array.isArray(products)
  ? products.filter((product) => {
      if (activeProduct === 'coil' && activeType === 'hot') return product.type === 'hotrolledcoil';
      if (activeProduct === 'coil' && activeType === 'cold') return product.type === 'coldrolledcoil';
      if (activeProduct === 'sheet' && activeType === 'hot') return product.type === 'hotrolledsheet';
      if (activeProduct === 'sheet' && activeType === 'cold') return product.type === 'coldrolledsheet';
      return false;
    })
  : [];

// fetch the data

// const fetchProducts=async()=>{

//   try{
// const res=await axios.get('http://localhost:8000/api/admin/product/getAllProduct');
// console.log(res.data);
// setProduct(res.data.product);
//   }
//   catch(err){
//     console.error("Failed to fetch products:", err);

//   }
// }

// useEffect(()=>{
//   fetchProducts();
// },[])


  return (
    <div className='relative h-auto w-full mt-24 mb-20'>
      <h1 className='font-bold md:text-3xl sm:text-2xl text-xl text-[#262626] leading-6 font-poppins w-96 md:px-10 sm:px-10 px-5'>Mild Steel</h1>

      <div className='flex gap-10 md:w-[80%] w-full md:mt-5 mt-0 rounded-lg md:mx-10'>
        <div className='w-2/6 h-screen hidden lg:block'>
          <Sidebar
            activeType={activeType}
            setActiveType={setActiveType}
            items={[
              { type: 'hot', label: 'Hot Rolled', link: '/mildStainless' },
              { type: 'cold', label: 'Cold Rolled', link: '/mildStainless' },
            ]}
          />
        </div>

        <div className='w-full mt-2'>
          <div className='flex mt-3 gap-10 lg:px-12 sm:px-10'>
            {/* Mobile Sidebar */}
            <div className="lg:hidden px-5">
              <div className="flex gap-4 mt-0">
                <button onClick={() => setActiveType("hot")} className={`text-left font-poppins text-sm font-normal ${activeType === "hot" ? 'border-b-2 border-black text-black font-bold' : "text-[#70737a]"}`}>Hot Rolled</button>
                <button onClick={() => setActiveType("cold")} className={`text-left font-poppins px-4 py-2 text-sm font-normal ${activeType === "cold" ? 'border-b-2 border-black text-black font-bold' : "text-[#70737a]"}`}>Cold Rolled</button>
              </div>
            </div>

            {/* Product Type Toggle */}
            <button className={`font-semibold hidden lg:block pt-1 font-poppins text-xl ${activeProduct === 'coil' ? 'border-b-2 border-black text-black font-bold' : 'text-gray-600'}`} onClick={() => setActiveProduct('coil')}>Coils</button>
            <button className={`font-semibold hidden lg:block font-poppins text-xl ${activeProduct === 'sheet' ? 'border-b-2 border-black text-black font-bold' : 'text-gray-600'}`} onClick={() => setActiveProduct('sheet')}>Sheets</button>
          </div>

          <div className='w-full border-t border-t-gray-300'>
            {/* Mobile Product Buttons */}
            <div className='flex sm:gap-10 px-5 gap-5 mt-5 lg:hidden sm:mx-10 lg:mx-0'>
              <button className={`font-normal cursor-pointer text-sm sm:w-20 w-16 p-2 font-poppins rounded-sm ${activeProduct === 'coil' ? 'border border-[#a0ceff] bg-[#e6f0ff] text-[#12396d]' : 'text-[rgb(38,38,38)] border border-[#b1b8c9]'}`} onClick={() => setActiveProduct('coil')}>Coils</button>
              <button className={`font-normal cursor-pointer text-sm sm:w-20 w-16 p-2 font-poppins rounded-sm ${activeProduct === 'sheet' ? 'border border-[#a0ceff] bg-[#e6f0ff] text-[#12396d]' : 'text-[rgb(38,38,38)] border border-[#b1b8c9]'}`} onClick={() => setActiveProduct('sheet')}>Sheets</button>
            </div>

            {/* ✅ Add Product button only for admin */}
            {isAdmin && (
              <div className="flex justify-end mb-3 px-5">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => navigate('/addproduct')}
                >
                  Add Product
                </button>
              </div>
            )}

            {/* Cards */}
            {filterProducts.length === 0 ? (
  <div className="text-center text-gray-600 py-10 text-lg">No products found.</div>
) : (
  activeProduct === 'coil'
    ? activeType === 'hot'
      ? <CardContainer data={filterProducts} type={activeType} />
      : <ColdContainer data={filterProducts} type={activeType} />
    : activeType === 'hot'
      ? <SheetCard data={filterProducts} type={activeType} />
      : <ColdSheetCard data={filterProducts} type={activeType} />
)}
  </div>
        </div>
      </div>
    </div>
  )
}

export default Section;
