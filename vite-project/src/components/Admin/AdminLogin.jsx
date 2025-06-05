import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE
const AdminLogin = () => {

    const navigate=useNavigate();

  const [formData, setFormData] = useState(
    { email: '',
         password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/admin/auth/adminLogin`, formData);
      console.log('Login data:', res.data);
  
      // Store admin flag in localStorage
      if (res.data?.data?.isAdmin) {
        sessionStorage.setItem("isAdmin", "true"); // <-- changed to sessionStorage
        sessionStorage.setItem("adminName", res?.data?.data?.FullName);
        console.log("Set adminName:", sessionStorage.getItem("adminName"));

      } else {
        sessionStorage.setItem("isAdmin", "false");
      }
  
      // Navigate to dashboard
      navigate("/admindashboard");
  
      // Reset form
      setFormData({
        email: "",
        password: ""
      });
  
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert("Login failed.");
    }
  };
  

//   sessionStorage.setItem("isAdmin", "true");
// sessionStorage.setItem("adminName", response.data.data.FullName);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
