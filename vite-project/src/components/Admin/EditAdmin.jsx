import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: '',
    email: '',
    userName: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/auth/getAdmin/${id}`);
        const user = res.data.data;
        setFormData({
          FullName: user.FullName || '',
          email: user.email || '',
          userName: user.userName || '',
        });
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.FullName.trim()) {
      newErrors.FullName = 'Full name is required';
    }
    if (!formData.userName.trim()) {
      newErrors.userName = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w.%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = 'Email must be a valid Gmail address';
    }
   setErrors(newErrors);
   return Object.keys(newErrors).length===0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()) return;

    try {
      await axios.put(`${BASE_URL}/api/admin/auth/adminUpdate/${id}`, formData);
      alert('User updated successfully!');
      navigate('/adminalluser');
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Update failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  const isAdmin=sessionStorage.getItem('isAdmin')==='true'

  return (
    <div className='flex h-screen gap-5 bg-gray-100 overflow-y-hidden'>
 {isAdmin&&(
    <AdminSidebar/>
 )}
    <div className="p-6 w-full max-w-lg  h-full mx-auto m-10 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
          {errors.FullName && <p className="text-red-600 text-sm">{errors.FullName}</p>}
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
          {errors.userName && <p className="text-red-600 text-sm">{errors.userName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className="bg-black cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditAdmin;
