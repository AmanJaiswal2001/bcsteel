import React from 'react'
import useFetchUser from '../../hooks/useFetchUser'
import AdminSidebar from './AdminSidebar';
import HelperTable from './HelperTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;
const UserDetails = () => {
 
 const {user,loading,error}=useFetchUser([]);
 
 console.log("Fetched User:", user); 
 const navigate = useNavigate();


 const handleEdit = (id) => navigate(`/editUser/${id}`);
  
 const handleDelete=async(id)=>{
   try{
 await axios.delete(`${BASE_URL}/api/admin/auth/adminDelete/${id}`);
   }
   catch(err){
     console.error('Failed to delete',err);
   }
 }
 
 


 const isAdmin=sessionStorage.getItem("isAdmin")==="true"
 if (loading) return <p className="p-6">Loading users...</p>;
 if (error) return <p className="p-6 text-red-500">Failed to load users.</p>;

    return (
    <div className='flex h-screen'>
    {isAdmin&&(
        <AdminSidebar/>
    )}
    <div className="p-6 w-full">
      <div className='flex justify-between'>
      <h1 className='font-bold mt-0 px-5 font-poppins text-lg'>All User ({user.length})</h1>
    
    <button className='bg-black text-white p-3 cursor-pointer rounded-md' onClick={()=> navigate('/createadmin')}>
        Create Admin
    </button>
      </div>  
   
    
    <div className="w-full p-5 mt-5 rounded-4xl bg-white">
  <HelperTable
    columns={[
      { label: 'Name', key: 'FullName' },
      { label: 'Email', key: 'email' },
      { label: 'CreatedAt', key: 'createdAt' },
    ]}
    data={Array.isArray(user) ? user : user?.data || []}
    isAdmin={true}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
</div>

    </div>
    </div>
  )
}

export default UserDetails