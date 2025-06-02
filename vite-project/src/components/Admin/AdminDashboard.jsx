import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const navigate=useNavigate();
  return (
    <div className='h-screen m-20 '>AdminDashboard
<div className='flex gap-20'>
<buttom  onClick={()=> navigate('/mildStainless')} className="bg-orange-400 h-10 text-center w-40  cursor-pointer" > Product</buttom>
    <buttom onClick={()=> navigate('/addBlog')} className="bg-orange-400 h-10 text-center w-40 cursor-pointer"> Blog</buttom>
    <buttom className="bg-orange-400 h-10 text-center w-40 cursor-pointer"> Testimonial</buttom>
</div>
  
    </div>
  )
}

export default AdminDashboard