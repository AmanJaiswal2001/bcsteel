import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const CreateAdmin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: '',
    email: '',
    userName: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const generateUsername = (name) => {
    const clean = name.trim().toLowerCase().replace(/\s+/g, '');
    return clean + Math.floor(1000 + Math.random() * 9000);
  };

  const validate = () => {
    const newErrors = {};
  
    if (!formData.FullName.trim()) newErrors.FullName = 'Please enter full name';
  
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
  
    if (!formData.password) {
      newErrors.password = 'Please enter password';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      newErrors.password = 'Must contain uppercase, lowercase, and number';
    }
  
    return newErrors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    if (name === 'FullName') {
      updated.userName = generateUsername(value);
    }

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/admin/auth/adminRegister`, formData);
    //   alert('Admin created successfully!');
      navigate('/adminalluser');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create admin');
    }
  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isAdmin=sessionStorage.getItem('isAdmin')==='true'

  return (

    <div className='flex h-screen gap-5 bg-gray-100 overflow-y-hidden'>
 
 
 {isAdmin&&(
    <AdminSidebar/>
 )}
  <div className="p-6 w-full max-w-lg mx-auto mt-10 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Create Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

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

        <div>
          <label className="block text-sm font-medium">Username (auto)</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            disabled
            className="mt-1 w-full p-2 border rounded bg-gray-100 text-gray-500"
          />
        </div>

       
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded pr-10"
          />
           <span
            onClick={togglePasswordVisibility}
            className="absolute top-2.5 right-3 cursor-pointer"
          >
            {showPassword ? (
              // Eye slash (hide)
             
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 text-gray-600" fill="currentColor">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
              </svg>
            ) : (
              // Eye (show)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-5 h-5 text-gray-600" fill="currentColor">
                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
              </svg>
            )}
          </span>
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="bg-black cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Admin
        </button>
      </form>
    </div>
    </div>
  
  );
};

export default CreateAdmin;
