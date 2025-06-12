import React from 'react';

import HelperTable from './HelperTable';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import useFetchTestimonial from '../../hooks/useFetchTestimonial';
const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;
const AdminTestimonialDetail = () => {
  const { testimonial, loading } = useFetchTestimonial();
  const navigate = useNavigate();

  const handleEdit = (id) => navigate(`/edittestimonial/${id}`);
  
  const handleDelete=async(id)=>{
    try{
  await axios.delete(`${BASE_URL}/api/admin/deleteTestimonial/${id}`);
  // navigate('/mildStainless')
  }
  catch (err) {
    console.error("Failed to delete", err);
  }
  }

 const isAdmin=sessionStorage.getItem("isAdmin")==="true"

  return (
<div className='flex'>
{isAdmin&&(
    <AdminSidebar/>
)}
<div className="p-6 w-full">
      <h1 className="text-lg font-bold mb-4">All Testimonial ({testimonial.length})</h1>

      <HelperTable
        // title="All Products"
        columns={[
              { label: 'Name', key: 'author.fullName' },
              { label: 'Description', key: 'description' }
              // { label: 'Tags', key: 'items' },
            ]}
        data={testimonial}
        isAdmin={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
</div>

   
  );
};

export default AdminTestimonialDetail;
