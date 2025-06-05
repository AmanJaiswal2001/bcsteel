import React from 'react';
import { useNavigate } from 'react-router-dom';
import  AdminSidebar  from './AdminSidebar';
import useFetchBlog from '../../hooks/useFetchBlog';
import useFetchProducts from '../../hooks/useFetchProducts';
import HelperTable from './HelperTable';

const AdminDashboard = () => {


  const { blog, loading: blogLoading, error: blogError } = useFetchBlog();
  const { products, loading: productLoading, error: productError } = useFetchProducts();

  
  const navigate = useNavigate();

  const adminOptions = [
    { name: 'Product', onClick: () => navigate('/mildStainless') },
    { name: 'Blog', onClick: () => navigate('/addBlog') },
    { name: 'Testimonial', onClick: () => navigate('/testimonial') },
    // { name: 'Add Product', onClick: () => navigate('/addProduct') },
    // { name: 'All Blogs', onClick: () => navigate('/blogs') },
    // { name: 'Orders', onClick: () => navigate('/orders') },
  ];

  return (
    <div className="pt-20 flex bg-gray-100 h-screen ">
      {/* <h1 className="text-xl p-10 font-bold mb-4">Admin Dashboard</h1> */}
     <div className='h-96'>
     <AdminSidebar  />
     </div>



<div className='w-full px-4  '>

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
/>

{/* <HelperTable
  title="All Blogs"
  columns={[
    { label: 'Title', key: 'title' },
    { label: 'Category', key: 'category' },
    { label: 'Created At', key: 'createdAt' },
  ]}
  data={blog}
/> */}
<div className='flex mt-2 cursor-pointer'>
{products.length>5&&(
  <button
                onClick={() => navigate('/mildStainless')}
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
