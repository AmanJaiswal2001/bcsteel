import React from 'react';

export const AdminSidebar = ({ options = [] }) => {
  return (
    <div className=" h-80 flex flex-col mt-10 justify-center gap-6 p-6">
      {options.map((option, index) => (
        <div
          key={index}
          className="relative bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 w-72"
        >
          <div className="text-center">
            <button
              onClick={option.onClick}
              className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-50 hover:shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              {option.name}
            </button>
          </div>

          {/* Decorative blurred elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white bg-opacity-5 rounded-full blur-lg"></div>
        </div>
      ))}
    </div>
  );
};
