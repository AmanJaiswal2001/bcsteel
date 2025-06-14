import React, { useEffect, useState } from 'react';
import useFetchBlog from '../hooks/useFetchBlog';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './Admin/AdminSidebar';

const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const AllBlog = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeKeyword, setActiveKeyword] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { blog, loading, error } = useFetchBlog([]);
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const getTextFromHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const keywordMap = {};
  blog.forEach((item) => {
    item.content[0]?.items?.forEach((keyword) => {
      if (!keywordMap[keyword]) keywordMap[keyword] = [];
      keywordMap[keyword].push(item);
    });
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const uniqueKeywords = Object.entries(keywordMap);
  const filteredBlogs = activeKeyword ? keywordMap[activeKeyword] : blog;

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {isAdmin && <AdminSidebar />}
      
      <div className={`flex-1 flex flex-col ${isAdmin ? '' : 'mt-10'} overflow-hidden`}>
        {/* Scrollable content wrapper */}
        <div className="flex-1 overflow-y-auto px-5 sm:p-10 sm:px-20 pt-10">
          <div className="flex justify-between items-center w-full">
            <h1 className="sm:text-4xl text-2xl font-bold">Blogs({blog.length})</h1>
            {isAdmin && (
              <button
                className="bg-black text-white p-2 rounded"
                onClick={() => navigate('/addBlog')}
              >
                {isMobile ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M20 12L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  "Add Blog"
                )}
              </button>
            )}
          </div>

          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">Failed to load blogs</p>}

          {/* Keywords */}
          <div className="flex flex-wrap justify-center mt-5">
            <button
              onClick={() => setActiveKeyword(null)}
              className={`text-sm px-4 py-2 m-2 rounded-full font-medium ${
                activeKeyword === null
                  ? 'bg-black text-white'
                  : 'bg-[#12396d] text-white hover:bg-white hover:text-black hover:outline'
              }`}
            >
              See All
            </button>

            {uniqueKeywords.map(([word, posts], i) => (
              <button
                key={i}
                onClick={() => setActiveKeyword(activeKeyword === word ? null : word)}
                className={`text-sm px-10 py-2 m-2 rounded-full font-medium ${
                  activeKeyword === word
                    ? 'bg-black text-white'
                    : 'bg-[#12396d] text-white hover:bg-white hover:text-black hover:outline'
                }`}
              >
                {word} {posts.length > 1 && `(${posts.length})`}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 grid-cols-1 mt-10 mb-10 gap-10">
            {filteredBlogs.map((card, index) => (
              <Link
                to={`/blog/${card._id}`}
                key={card._id}
                className="relative px-5 overflow-hidden h-96 rounded-lg transition-all duration-700 cursor-pointer"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <img
                  src={
                    card.banerImage?.startsWith('/uploads/')
                      ? `${BASE_URL}${card.banerImage}`
                      : `${BASE_URL}/uploads/${card.banerImage}`
                  }
                  alt="Banner"
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
                    className={`text-3xl font-bold break-words mb-2 transition-all duration-300 ${
                      activeIndex === index ? 'translate-y-0' : 'translate-y-16'
                    }`}
                  >
                    {card.content[0]?.type.split(' ').slice(0, 10).join(' ')}
                  </h2>
                  <div
                    className={`transition-all duration-700 overflow-hidden ${
                      activeIndex === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-20'
                    }`}
                  >
                    <p className="text-white text-opacity-90">
                      {getTextFromHTML(card.content[0]?.text).substring(0, 150) + '...'}
                    </p>
                    <span className="inline-block mt-4 font-bold text-orange-600 transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlog;
