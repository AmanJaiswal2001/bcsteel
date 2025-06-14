import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import Card from '../Card';

const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const AllProduct = () => {
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile,setIsMobile]=useState(window.innerWidth <= 768);

  const filterOptions = [
    { label: 'All', value: '' },
    { label: 'Hot Rolled Sheet', value: 'hotrolledsheet' },
    { label: 'Cold Rolled Sheet', value: 'coldrolledsheet' },
    { label: 'Hot Rolled Coil', value: 'hotrolledcoil' },
    { label: 'Cold Rolled Coil', value: 'coldrolledcoil' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/product/getAllProduct`);
        const data = res.data.products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        console.log(data);
        setProducts(data);

        setFiltered(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (filterType) {
      const filteredData = products.filter((item) => item.type === filterType);
      setFiltered(filteredData);
    } else {
      setFiltered(products);
    }
  }, [filterType, products]);

  if (loading) return <div className="text-center mt-20 text-lg">Loading products...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">Error loading products.</div>;

  return (
    <div className="flex gap-0 h-screen overflow-y-hidden ">
      {isAdmin && <AdminSidebar />}
      <div className="relative overflow-y-auto w-full mt-10 ">
       
       <div className='flex justify-between px-5 sm:px-0 items-center'>
       
        <h1 className="font-bold md:text-3xl sm:text-2xl text-xl text-[#262626] md:px-10">
           Products({products.length})
        </h1>

        {isAdmin && (
          <div className="flex justify-end md:px-10 mt-0">
            <button
              className=" bg-black text-white  p-2 cursor-pointer rounded hover:bg-blue-700"
              onClick={() => navigate('/addproduct')}
            >
             {isMobile?<svg className='' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V20M20 12L4 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>:" Add Product"}

            </button>
          </div>
        )}
        </div>
        {/* Filter Buttons */}
        <div className="flex gap-3  flex-wrap mt-4 px-10">
          {filterOptions.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilterType(value)}
              className={`px-4 py-2 text-sm sm:text-lg rounded-full transition-all duration-200 ${
                filterType === value
                  ? 'bg-black text-white'
               : 'bg-[#12396d] text-white hover:bg-white hover:text-black hover:outline'
             }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Add Product Button */}
       

        {/* Products Grid */}
        <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 px-5 md:px-10">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-600 py-10 text-lg w-full col-span-full">
              No products found.
            </div>
          ) : (
            filtered.map((card) => (
              <Link
                key={card._id}
                to={`/coilproduct/${card._id}`}
                className="w-full flex justify-center"
              >
                <Card {...card} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
