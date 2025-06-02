
import {useEffect,useState} from 'react';

import axios from 'axios';



const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE


 const useSingleBlog=(id)=>{

    const [blog,setBlog]=useState(null);
    
    const[loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    
    
    useEffect(()=>{
        if(!id) return;
    
    const fetchBlog=async()=>{
        try{
    
            const res=await axios.get(`${BASE_URL}/api/admin/getBlogById/${id}`);
            console.log(res.data);
            setBlog(res.data);
        }
        catch(err){
            console.error("Error fetching single blog",err);
            setError(err);
        }finally{
            setLoading(false);
        }
    }
    
    
    fetchBlog();
    
    },[id]);
    
    return {blog,loading,error};
    
    }

    export default useSingleBlog;