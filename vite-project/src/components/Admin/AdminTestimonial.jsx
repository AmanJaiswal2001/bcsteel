import axios from 'axios';
import React, { useState } from 'react';

const AdminTestimonial = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    picture: '',
    designation: '',
    rating: 0,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      picture: e.target.files[0],
    }));
  };

  const handleRatingClick = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('designation', formData.designation);
    data.append('rating', formData.rating);
    data.append('description', formData.description);
    if (formData.picture) data.append('picture', formData.picture);

    try {
      await axios.post('http://localhost:5000/api/admin/createTestimonial', data);
      console.log('Submitted:', Object.fromEntries(data.entries()));
      alert('Testimonial submitted!');
    } catch (error) {
      console.error('Error submitting testimonial:', error.response?.data || error.message);
    }
  };

  return (
    <div className='mt-20'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='fullName' className='block mb-1 font-medium'>
            Full Name
          </label>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            className='w-full p-2 border rounded'
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor='designation' className='block mb-1 font-medium'>
            Designation
          </label>
          <input
            type='text'
            name='designation'
            value={formData.designation}
            className='w-full p-2 border rounded'
            onChange={handleChange}
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Rating</label>
          <div className='flex space-x-1'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingClick(star)}
                className={`cursor-pointer text-2xl ${
                  formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor='description' className='block mb-1 font-medium'>
            Description
          </label>
          <textarea
            name='description'
            id='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          ></textarea>
        </div>

        <div>
  <label className="block font-medium mb-1">Upload Picture *</label>
  <button
    type="button"
    onClick={() => document.getElementById('picture').click()}
    className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Upload Picture
  </button>
  <input
    type="file"
    id="picture"
    name="picture"
    accept="image/*"
    className="hidden"
    onChange={handleFileChange}
  />
 
</div>


        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2'
        >
          Submit Testimonial
        </button>
      </form>
    </div>
  );
};

export default AdminTestimonial;
