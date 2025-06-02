import React from 'react'
const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE
const CardSheet = ({
  name, brand, thickness, width, purchaseNow, deliveryDays, image, length,  direction
}) => {
  return (
    <div
      data-theme="light"
      className={`card relative bg-base-100   w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] xl:max-w-[360px] h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1 `}
      >
      <figure className="w-full">
        <img className="w-full h-44 object-cover" src={`${BASE_URL}${image}`} alt="card" />
      </figure>

      <div className="card-body p-2">
        <h2 className="mt-2 font-poppins font-medium text-[1rem] h-12">{name}</h2>

        {/* <div className="flex gap-2 text-xs text-[#70737a]">
          <span className="font-normal">Brand:</span>
          <p className="font-semibold">{brand}</p>
        </div> */}

        <div className="flex gap-2 text-sm text-[#262626]">
          <span className="font-semibold">Thickness</span>
          <p className="font-medium"> {Math.min(...thickness)} mm - {Math.max(...thickness)} mm</p>
          </div>

        <div className="flex gap-2 text-sm text-[#262626]">
          <span className="font-semibold">Width</span>
          <p className="font-medium"> {Math.min(...width)} mm - {Math.max(...width)} mm</p>
          </div>

        {/* <div className="flex gap-2 text-sm text-[#262626]">
          <span className="font-semibold">Length</span>
          <p className="font-medium">{length}</p>
        </div> */}
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-[#f5f6fa] rounded-b-lg">
        <button className="w-full text-left p-2 text-[#12396d] font-poppins font-semibold text-sm">
        {purchaseNow}
        </button>
        <hr className="border-gray-300 mx-2" />
        <div className="flex items-center gap-1 px-2 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 20q-1.25 0-2.125-.875T4 17H1.5l.45-2h2.825q.425-.475 1-.737T7 14t1.225.263t1 .737H13.4l2.1-9H4.55l.1-.425q.15-.7.687-1.137T6.6 4H18l-.925 4H20l3 4l-1 5h-2q0 1.25-.875 2.125T17 20t-2.125-.875T14 17h-4q0 1.25-.875 2.125T7 20m8.925-7h4.825l.1-.525L19 10h-2.375zm-.475-6.825L15.5 6l-2.1 9l.05-.175l.85-3.65zM.5 13.325l.5-2h5.5l-.5 2zm2-3.65l.5-2h6.5l-.5 2zM7 18q.425 0 .713-.288T8 17t-.288-.712T7 16t-.712.288T6 17t.288.713T7 18m10 0q.425 0 .713-.288T18 17t-.288-.712T17 16t-.712.288T16 17t.288.713T17 18" />
          </svg>
          <span className="text-sm text-[#262626] font-medium font-poppins">{deliveryDays}</span>
        </div>
      </div>
    </div>
  );
};

export default CardSheet;
