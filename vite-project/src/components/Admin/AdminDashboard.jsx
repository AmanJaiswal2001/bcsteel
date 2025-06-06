import React from 'react';
import { useNavigate } from 'react-router-dom';
import  AdminSidebar  from './AdminSidebar';
import useFetchBlog from '../../hooks/useFetchBlog';
import useFetchProducts from '../../hooks/useFetchProducts';
import HelperTable from './HelperTable';
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;
const AdminDashboard = () => {


  const { blog, loading: blogLoading, error: blogError } = useFetchBlog();
  const { products, loading: productLoading, error: productError } = useFetchProducts();

  
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/editproduct/${id}`);
  };
  const handleDelete=async(id)=>{
    try{
  await axios.delete(`${BASE_URL}/api/admin/product/deleteProduct/${id}`);
  // navigate('/mildStainless')
  }
  catch (err) {
    console.error("Failed to delete", err);
  }
  }


  const adminOptions = [
    { name: 'Product', onClick: () => navigate('/mildStainless') },
    { name: 'Blog', onClick: () => navigate('/addBlog') },
    { name: 'Testimonial', onClick: () => navigate('/testimonial') },
    // { name: 'Add Product', onClick: () => navigate('/addProduct') },
    // { name: 'All Blogs', onClick: () => navigate('/blogs') },
    // { name: 'Orders', onClick: () => navigate('/orders') },
  ];


  
  const handleBlogEdit = (id) => navigate(`/editblog/${id}`);
  
  const handleBlogDelete=async(id)=>{
    try{
  await axios.delete(`${BASE_URL}/api/admin/deleteBlog/${id}`);
    }
    catch(err){
      console.error('Failed to delete',err);
    }
  }


  const transformedBlogData = blog.slice(0, 5).map((item) => {
    const firstContent = item.content?.[0];
    return {
      _id: item._id,
      type: firstContent?.type.slice(0,10) || 'N/A',
      category: firstContent?.text?.replace(/<[^>]+>/g, '').slice(0, 20) + '...',
      items: firstContent?.items[0] || [],
    };
  });
  return (
    <div className="pt-0 flex bg-gray-100 h-screen ">
      {/* <h1 className="text-xl p-10 font-bold mb-4">Admin Dashboard</h1> */}
     <div className='h-96'>
     <AdminSidebar  />
     </div>



<div className='w-full px-4  overflow-y-auto '>

<div className=' p-5 rounded-sm  mt-0 '>
<h1 className='font-bold font-poppins text-lg'>All Product ({products.length})</h1>








</div>





<div className='w-full  p-5 -mt-2  rounded-4xl  bg-white'>
<HelperTable
  title="All Products"
  columns={[
    { label: 'Product Name', key: 'name' },
    { label: 'Product Type', key: 'type' },
    { label: 'Created At', key: 'createdAt' },


  ]}
  data={products.slice(0,5)}

  isAdmin={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
/>


<div className='flex mt-2 cursor-pointer'>
{products.length>5&&(
  <button
                onClick={() => navigate('/adminallproduct')}
                className="text-blue-600  cursor-pointer text-[12px] text-center m-auto  hover:text-blue-800"
              >
                View All
              </button>
)}
</div>

 
</div>

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
        onEdit={handleBlogEdit}
        onDelete={handleBlogDelete}
/>


<div className='flex mt-2 cursor-pointer'>
{blog.length>5&&(
  <button
                onClick={() => navigate('/adminallblog')}
                className="text-blue-600  cursor-pointer text-[12px] text-center m-auto  hover:text-blue-800"
              >
                View All
              </button>
)}
</div>
</div>
</div>

 




    </div>
  );
};

export default AdminDashboard;
