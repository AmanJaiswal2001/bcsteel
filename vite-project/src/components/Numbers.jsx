import React from 'react';
import CountUp from 'react-countup';

const Numbers = () => {
  const stats = [
    { label: 'Locations', value: 13, deg: '+' },
    { label: 'Industries Helped', value: 120, deg: '' },
    { label: 'Projects Delivered', value: 200, deg: 'k' },
  ];

  return (
    <div className="w-full mx-auto mt-10 rounded-lg">
      <div className="relative w-full h-96">
      <div
    className="absolute inset-0 bg-[url('/skyline.jpg')] bg-cover bg-center bg-fixed z-0"
    aria-hidden="true"
  ></div>
        <div className="flex w-full absolute top-[32%] left-auto z-20 flex-col lg:flex-row flex-wrap justify-center items-center gap-10">
          {/* Main Card with Hover Effect */}
          <div className="h-40 w-full sm:w-[410px] bg-[#12396d] rounded-2xl relative 
            transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90 hover:bg-blue-900">
            <div className="flex justify-between items-center p-5">
              <div className="text-white">
                <p className="text-6xl font-bold font-poppins">
                  <CountUp end={500} duration={3} separator="," />K+
                </p>
                <p className="text-sm font-poppins font-normal">Tones Of Steel Delivered</p>
              </div>
              <div className="h-20 w-20 rounded-full bg-white flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
                  />
                </svg>
              </div>
            </div>
            {/* <p className="text-white text-sm px-5">Projects Delivered</p> */}
          </div>

          {/* Stats Cards with Hover Effects */}
          <div className="flex flex-wrap cursor-pointer justify-center gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="w-72 h-40 bg-white cursor-pointer rounded-2xl flex flex-col justify-center items-center text-6xl font-bold font-poppins 
                  transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#12396d]  hover:opacity-95  hover:text-white "
              >
                <div>
                  <CountUp end={stat.value} duration={5} />
                  <span className='hover:text-white'>{stat.deg}</span>
                  <p className="mt-1  hover:text-white text-center text-sm font-normal">
                  {stat.label}
                </p>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
