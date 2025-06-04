import {useEffect,useState} from 'react';

import axios from 'axios';



const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE


const useFetchBlog=()=>{


const [blog,setBlog]=useState([]);

const[loading,setLoading]=useState(true);
const [error,setError]=useState(null);


useEffect(()=>{
const fetchBlogs=async()=>{

    try{

        const res=await axios.get(`${BASE_URL}/api/admin/getAllBlog`);
        console.log(res.data);
        setBlog(res.data);
    }
    catch(err){
        console.error("Failed to fetch blogs",err);
        setError(err);
    } finally{
        setLoading(false);
    }
}

fetchBlogs();

},[]);

return {blog,loading,error};

}

export default useFetchBlog;



