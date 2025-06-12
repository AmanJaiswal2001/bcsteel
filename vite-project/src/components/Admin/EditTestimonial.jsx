import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminSidebar from './AdminSidebar';

const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const EditTestimonial = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    picture: '',
    designation: '',
    rating: 0,
    description: '',
  });

  const [imageFile, setImageFile] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/getTestimonial/${id}`);
        const data = res?.data;
        setFormData({
          fullName: data?.author?.fullName || '',
          picture: data.author?.picture || '',
          designation: data.author?.designation || '',
          rating: data.rating || 0,
          description: data.description || '',
        });
        setExistingImage(data.author.picture || '');
        setLoading(false);
      } catch (err) {
        setError({ message: 'Failed to fetch testimonial data' });
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.rating) newErrors.rating = 'Rating is required';

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('designation', formData.designation);
    data.append('rating', formData.rating);
    data.append('description', formData.description);

    if (imageFile) data.append('file', imageFile);

    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/updateTestimonial/${id}`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setMessage(res.data.message || 'Testimonial updated successfully');
      toast.success('Testimonial updated successfully!');
      // navigate('/testimonials'); // Redirect after successful update
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating testimonial');
      toast.error(`Update failed. Please try again: ${err.response?.data?.error}`);
    }
  };

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <div className="flex h-screen overflow-y-hidden">
      <AdminSidebar />
      <div className="w-full mt-5 overflow-y-auto mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Edit Testimonial</h2>

        {error.message && <p className="text-red-600 mb-2">{error.message}</p>}
        {message && <p className="text-green-600 mb-2">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {error.fullName && <p className="text-red-500 text-sm">{error.fullName}</p>}
          </div>

          <div>
            <label className="block">Designation *</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {error.designation && <p className="text-red-500 text-sm">{error.designation}</p>}
          </div>

          <div>
            <label className="block">Rating *</label>
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
            {error.rating && <p className="text-red-500 text-sm">{error.rating}</p>}
          </div>

          <div>
            <label className="block">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            ></textarea>
            {error.description && <p className="text-red-500 text-sm">{error.description}</p>}
          </div>

          <div>
            <label className="block">Upload Picture (optional)</label>
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

          {existingImage && (
            <div className="mb-2">
              <p className="text-sm text-gray-500">Current Image:</p>
              <img
                src={`${BASE_URL}${existingImage}`}
                alt="Existing Product"
                className="w-32 h-auto border rounded"
              />
            </div>
          )}

          {imageFile && (
            <div className="mt-2">
              <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-32 h-32 object-cover" />
            </div>
          )}

          <div className="flex">
            <button
              type="submit"
              className="w-60 m-auto bg-black text-white py-2 rounded hover:bg-blue-700"
            >
              Update Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTestimonial;
