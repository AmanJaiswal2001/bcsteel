import axios from 'axios';
import React, { useState } from 'react';
const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;
import toast from 'react-hot-toast';
import AdminSidebar from './AdminSidebar';

const AdminTestimonial = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    rating: 0,
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading,setLoading]=useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleRatingClick = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  // Simplified Validation
  const validateForm = () => {
    let formErrors = {};

    if (!formData.fullName) formErrors.fullName = "Full Name is required";

    if (!formData.designation || formData.designation.length < 1 || formData.designation.length > 50) {
      formErrors.designation = "Designation must be between 1 and 20 characters";
    }

    if (!formData.description || formData.description.length < 1 || formData.description.length > 140) {
      formErrors.description = "Description must be between 1 and 100 characters";
    }

    if (!formData.rating) formErrors.rating = "Rating is required";

    return Object.keys(formErrors).length === 0 ? true : formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm();
    if (validation !== true) {
      setErrors(validation);
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('designation', formData.designation);
    data.append('rating', formData.rating);
    data.append('description', formData.description);
    if (imageFile) data.append('file', imageFile); // 👈 file key must match multer field name

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/createTestimonial`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Submitted:', res.data);
      toast.success('Testimonial added successfully!');
      setFormData({
        fullName: '',
        designation: '',
        rating: 0,
        description: '',
      });
      setImageFile(null); // Clear the image file
      setErrors({});
    } catch (error) {
      console.error('Error submitting testimonial:', error.response?.data || error.message);
      toast.error('Upload failed. Please try again.');
    }
    finally{
      setLoading(false)
    }
  };

  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  return (
    <div className="flex gap-5">
      {isAdmin && <AdminSidebar />}
      <div className="w-full p-5">
      <h1 className="text-3xl font-bold mb-6">Add Testimonial</h1>
   
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="designation" className="block mb-1 font-medium">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
            {errors.designation && <p className="text-red-500">{errors.designation}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className={`cursor-pointer text-2xl ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            {errors.rating && <p className="text-red-500">{errors.rating}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
            {errors.description && <p className="text-red-500">{errors.description}</p>}
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
              name="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
<div className='flex justify-center'>
<button type="submit"
           className="bg-black  m-auto text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
           disabled={loading}>
            {loading?(
          <span className="flex items-center">
      <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg> Adding...
      </span>
        ):(
          <span className=' font-poppins'>  Add Testimonial</span>
        )}
          </button>
</div>
         
        </form>
      </div>
    </div>
  );
};

export default AdminTestimonial;
