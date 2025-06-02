import React, { useEffect } from 'react'
import ArticleCard from './ArticleCard'
import { Link } from 'react-router-dom'
import Button from './Button'
import useFetchBlog from '../hooks/useFetchBlog'







const Blog = () => {
  const {blog,error,loading}=useFetchBlog();
  
  
  
useEffect(() => {
  console.log('Fetched Blog Data:', blog);
}, [blog]);
  return (
    <div className='h-full w-full mt-10   '>
    <h1 className='font-bold lg:text-3xl  text-2xl w-[80%] lg:px-10 sm:px-10 px-5 py-5 font-poppins text-[#262626] '>Browse articles & blogs</h1>
   
   
   <div className='flex gap-20  lg:px-10 sm:px-10 px-5 w-full flex-row  lg:overflow-hidden overflow-x-scroll'>
   <Link>
   <ArticleCard 
   
   image="/crc.webp" 
   buttonName="Article" 
   description="Steel fabrication for infrastucture"
   buttonNavigate="Read now"
    />
   </Link>
  
   <Link>
   <ArticleCard  
    image="/hrs.webp"   
    buttonName="Article" description="The advantages of PEB structures for industrial applications"
   buttonNavigate="Read now"
    />
   </Link>
   <Link>
   <ArticleCard 
   image="/hrc1.webp"     
   buttonName="Article" description="Steel's role in disaster-resilient prefabricated buildings"
   buttonNavigate="Read now"
    />
   </Link>
   </div>
<div className='mt-5 w-[100%]  m-auto px-10 flex justify-center'>
   <Button
 buttonName="View all"
 rounded="rounded-lg"
  text="text-[#2241a6]"  bgColor="bg-white hover:bg-[#cae0fe]" border="border-2 border-[#2241a6]"
  width="lg:w-40  w-full" />
</div>
  
   </div>
  )
}

export default Blog