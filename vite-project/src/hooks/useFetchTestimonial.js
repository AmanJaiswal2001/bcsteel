import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL=import.meta.env.VITE_BACKEND_LIVE

const useFetchTestimonial=()=>{


    const[testimonial,setTestimonial]=useState([]);

    const [loading,setLoading]=useState(true);
    const[error,setError]=useState(null);

useEffect(()=>{
   const fetchTestimonial= async()=>{
    try{
        const res=await axios.get(`${BASE_URL}/api/admin/getAllTestimonial`);
        
        console.log(res.data);
        setTestimonial(res.data);
  
      }
      catch(err){
          console.error("Failed to fetch testimonial",err);
          setError(err);
      }
      finally{
        setLoading(false);
      }
   }

   fetchTestimonial();
   
    
},[]);

return {testimonial,loading,error};


}

export default useFetchTestimonial;