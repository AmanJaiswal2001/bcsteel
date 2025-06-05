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
      <div className="relative overflow-y-auto w-full mt-24 ">
        <h1 className="font-bold md:text-3xl sm:text-2xl text-xl text-[#262626] md:px-10">
          All Products
        </h1>

        {/* Filter Buttons */}
        <div className="flex gap-3 flex-wrap mt-4 md:px-10">
          {filterOptions.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilterType(value)}
              className={`px-4 py-2 rounded transition-all duration-200 ${
                filterType === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Add Product Button */}
        {isAdmin && (
          <div className="flex justify-end md:px-10 mt-5">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate('/addproduct')}
            >
              Add Product
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 px-5 md:px-10">
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
