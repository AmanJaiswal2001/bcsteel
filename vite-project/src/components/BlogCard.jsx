import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetchBlog from '../hooks/useFetchBlog';
import Button from './Button';
const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE
export const BlogCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { blog, error, loading } = useFetchBlog([]);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };


  const navigate=useNavigate();
  useEffect(() => {
    // console.log('Fetched Blog Data:', blog);
  }, [blog]);

  const getTextFromHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return (
    <div className="w-full mx-auto px-10 py-0 pb-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Touching lives of over 44 million people in India
      </h1>

      {loading && <p className="text-center text-gray-500 mt-10">Loading blogs...</p>}
      {error && <p className="text-center text-red-500 mt-10">Failed to load blogs</p>}

      <div className="hidden sm:flex gap-4 h-96">
  {Array.isArray(blog) && blog.slice(0, 3).map((card, index) => (
    <Link
      to={`/blog/${card._id}`}
      key={card._id}
      className={`relative overflow-hidden rounded-lg transition-all duration-700 cursor-pointer ${
        activeIndex === index ? 'sm:w-2/3 w-full' : 'sm:w-1/2'
      }`}
      onMouseEnter={() => handleMouseEnter(index)}
    >
      <img
        src={`${BASE_URL}/uploads/${card.banerImage}`}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-700/40 to-transparent transition-opacity duration-500 ${
          activeIndex === index ? 'opacity-70' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-x-0 text-white p-6 transition-all duration-500 ${
          activeIndex === index ? 'bottom-0' : 'bottom-14'
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-2 transition-all duration-300 ${
            activeIndex === index ? 'translate-y-0' : 'translate-y-16'
          }`}
        >
          {card.content?.[0]?.type?.split(' ').slice(0, 10).join(' ') + '...'}
        </h2>
        <div
          className={`transition-all duration-700 overflow-hidden ${
            activeIndex === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-20'
          }`}
        >
          <p className="text-white text-opacity-90">
            {getTextFromHTML(card.content?.[0]?.text)
              .split(' ')
              .slice(0, 10)
              .join(' ') + '...'}
          </p>
          <span className="inline-block mt-4 font-bold text-orange-600 transition-colors">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>




      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
      {Array.isArray(blog) && (
  <div className="sm:hidden space-y-4">
    {blog.slice(0, 3).map((card, index) => (
      <Link key={card._id} to={`/blog/${card._id}`} className="block">
        <div className="relative h-64 overflow-hidden rounded-lg transition-all duration-700 cursor-pointer">
          <img
            src={`${BASE_URL}/uploads/${card.banerImage}`}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-700/40 to-transparent transition-opacity duration-500" />
          <div className="absolute inset-x-0 bottom-0 text-white p-4">
            <h2 className="text-xl font-bold mb-2">
              {(card.content?.[0]?.type || '').split(' ').slice(0, 10).join(' ') + '...'}
            </h2>
            <p className="text-sm text-white text-opacity-90">
              {(getTextFromHTML(card.content?.[0]?.text || '')).split(' ').slice(0, 10).join(' ') + '...'}
            </p>
            <span className="inline-block mt-2 text-sm font-bold text-orange-600">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
)}

      </div>

      <div onClick={() => navigate("/allblogs")} className='mt-20 border-2 cursor-pointer bg-[#12396d] border-[#2241a6] rounded-lg items-center m-auto w-[90%]  sm:w-[20%] flex justify-center'>
      
<Button 
    
onClick={() => navigate("/allblogs")}
 buttonName="View all"
 rounded="rounded-lg"
  text="text-[#2241a6]"   border=""
  width="sm:w-60 " />
</div>
    </div>
  );
};
