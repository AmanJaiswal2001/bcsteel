import React, { useState } from 'react';

const DeleteButton = ({ onConfirm }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteClick = () => setShowPopup(true);

  const handleConfirm = () => {
    onConfirm(); // yeh delete logic chalega
    setShowPopup(false);
  };

  const handleCancel = () => setShowPopup(false);

  return (
    <div>
      <button
        className="cursor-pointer bg-red-700 text-white p-2 rounded-full"
        onClick={handleDeleteClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
          />
        </svg>
      </button>

      {showPopup && (
        <div className="absolute top-1/2 left-1/2 bg-black w-80 p-4 rounded z-10">
        <div className="bg-black p-6 rounded shadow-xl text-center">
            <p className="mb-4 text-lg text-white font-semibold">Are you sure?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
