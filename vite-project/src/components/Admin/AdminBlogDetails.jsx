import React from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import HelperTable from './HelperTable';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import useFetchBlog from '../../hooks/useFetchBlog';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;
const AdminBlogDetails = () => {
  const { blog, loading } = useFetchBlog();
  const navigate = useNavigate();

  const handleEdit = (id) => navigate(`/editblog/${id}`);
  
  const handleDelete=async(id)=>{
    try{
  await axios.delete(`${BASE_URL}/api/admin/deleteBlog/${id}`);
    }
    catch(err){
      console.error('Failed to delete',err);
    }
  }
  

 const isAdmin=sessionStorage.getItem("isAdmin")==="true"

 const transformedBlogData = blog.map((item) => {
    const firstContent = item.content?.[0];
    return {
      _id: item._id,
      type: firstContent?.type.slice(0,10) || 'N/A',
      category: firstContent?.text?.replace(/<[^>]+>/g, '').slice(0, 20) + '...',
      items: firstContent?.items[0] || [],
    };
  });


  return (
<div className='flex'>
{isAdmin&&(
    <AdminSidebar/>
)}
<div className="p-6 w-full">
    
<h1 className='font-bold mt-5 px-5 font-poppins text-lg'>All Blog ({blog.length})</h1>


<div className='w-full  p-5 mt-5  rounded-4xl  bg-white'>
<HelperTable
   title="All Blogs"
            columns={[
              { label: 'Title', key: 'type' },
              { label: 'Category', key: 'category' },
              { label: 'Tags', key: 'items' },
            ]}
            data={transformedBlogData}

isAdmin={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
/>
    </div>
</div>
</div>
   
  );
};

export default AdminBlogDetails;
