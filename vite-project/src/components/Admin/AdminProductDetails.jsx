import React from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import HelperTable from './HelperTable';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;
const AllProductDetails = () => {
  const { products, loading } = useFetchProducts();
  const navigate = useNavigate();

  const handleEdit = (id) => navigate(`/editproduct/${id}`);
  
  const handleDelete=async(id)=>{
    try{
  await axios.delete(`${BASE_URL}/api/admin/product/deleteProduct/${id}`);
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
      <h1 className="text-lg font-bold mb-4">All Products ({products.length})</h1>

      <HelperTable
        title="All Products"
        columns={[
          { label: 'Product Name', key: 'name' },
          { label: 'Product Type', key: 'type' },
          { label: 'Created At', key: 'createdAt' },
        ]}
        data={products}
        isAdmin={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
</div>

   
  );
};

export default AllProductDetails;
