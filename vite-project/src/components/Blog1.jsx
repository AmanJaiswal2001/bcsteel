import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import useSingleBlog from '../hooks/useSingleBlog';
import DeleteButton from './Admin/DeleteButton';
import axios from 'axios';
import { motion } from 'framer-motion';
const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const Blog1 = () => {
  const { id } = useParams();
  const { blog, loading, error } = useSingleBlog(id);

  const getTextFromHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };
  const navigate=useNavigate();
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
     

const handleDelete=async()=>{
  try{
await axios.delete(`${BASE_URL}/api/admin/deleteBlog/${id}`);
  }
  catch(err){
    console.error('Failed to delete',err);
  }
}





  useEffect(() => {
    console.log('Fetched single Blog Data:', blog);
  }, [blog]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blog.</p>;

  return (
    <div className=" w-full mx-auto">
     <div className='w-full relative'>
     <img
        src={`${BASE_URL}/uploads/${blog.banerImage}`}
        alt="baner image"
        className="w-full h-[500px] object-cover   mb-6"
      />
    
<div className='absolute bottom-10 left-0 w-full '>
<div className='bg-black/60  py-5 w-full '>
  
{
        blog.content.map((item)=>(
<div>
<p className='sm:text-5xl break-words font-poppins text-white font-bold sm:px-20 px-5 text-xl   '>{item.type.split(' ')
    .slice(0, 30).join(' ') + '...'}</p>
</div>
        ))
      }
</div>
   </div>
    
     </div>
    

    
{isAdmin&&(
        <div className='flex gap-2 justify-end px-5 '>
         <button  onClick={()=> navigate(`/editblog/${id}`)} className='cursor-pointer bg-[#12396d] text-white p-2 rounded-full'>
         <svg  
          
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>
         
         </button>
       
         <DeleteButton
          onConfirm={handleDelete} 

         />
       
         </div>
)}


<div className={`sm:flex sm:flex-row flex-col-reverse flex  mb-20 gap-10 w-full px-5 sm:px-20 ${!blog.sideImage ? 'justify-center' : ''}`}>

<div className={`flex flex-col  sm:pt-10  ${!blog.sideImage?'w-full':'sm:w-1/2 w-full'}`}>


{blog.content?.map((block, index) => {
              const cleanHTML = DOMPurify.sanitize(block.text || '');
        // ✅ Fallback for unknown types — render rich HTML
        return (
          <div
             key={index}
             className="mb-4 px-2 w-full  text-lg font-poppins  text-base text-gray-800  leading-relaxed
        [&_h1]:font-bold [&_h1]:text-base [&_h2]:text-base [&_h3]:text-base [&_h4]:text-base [&_h5]:text-base [&_h6]:text-base
         [&_h2]:font-normal [&_h3]:font-normal [&_h4]:font-normal [&_h5]:font-normal [&_h6]:font-normal
        [&_p]:text-base [&_p]:mb-2
        [&_ul]:list-disc [&_ul]:ml-5 [&_li]:my-1
        [&_ol]:list-decimal [&_ol]:ml-5
        [&_strong]:font-bold [&_b]:font-bold
        [&_em]:italic [&_i]:italic
        [&_u]:underline
        [&_*]:text-gray-800 [&_*]:font-normal"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />
        );
      })}


      {
        blog.content.map((item)=>(
<div>
<p className='text-lg font-poppins  font-medium'>{item.items}</p>
</div>
        ))
      }
</div>

<motion.div className='sm:w-1/2  whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}'>
{blog.sideImage && (
        <img
          src={
            blog.sideImage.startsWith('http')
              ? blog.sideImage
              : `${BASE_URL}/uploads/${blog.sideImage}`
          }
          alt="Side"
          className="w-full h-96 object-cover rounded mt-10 transition-transform duration-500 ease-in-out hover:scale-110"
        />
      )}
</motion.div>

</div>



      {/* Side Image */}
     
    </div>
  );
};


export default Blog1;
