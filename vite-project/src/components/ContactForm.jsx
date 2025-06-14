
import { useState } from 'react';
import { Send, ChevronDown } from 'lucide-react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;
const  ContactForm=()=> {

  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    // website: '',
    phone: '',
    address: '',
    email: '',
    inquiryType: '',
    message: ''
  });
  const [error,setError]=useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const validation=()=>{
    const contactError={}

    if(!formData.name.trim())  contactError.name='Name is required'
    if(!/^\d{10}$/.test(formData.phone.trim())) {
      contactError.phone="Number is 10 digit required"
    }
    if(!formData.address.trim()) {
      contactError.address="Address is required"
    } 
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      contactError.email="Email must be required"
    }
    if(!formData.inquiryType) contactError.inquiryType="Please select a inquiry type"
  


  setError(contactError);
  return Object.keys(contactError).length===0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validation()) return;

    setLoading(true);
   
   try{
const res=await axios.post(`${BASE_URL}/api/contact`, formData);


    console.log('Form submitted:', res.data);
    alert("Message sent successfully!");
    setFormData({
      name: '',
      phone: '',
      address: '',
      email: '',
      inquiryType: '',
      message: ''
    });
   }

   catch (error) {
    console.error('Error:', error.response?.data || error.message);
    // alert("Failed to send message.");
   }
    finally {
      setLoading(false); 
    }
    // Here you would typically send the data to your backend
  
}

  return (
    <div className="flex md:flex-row flex-col bg-white rounded-lg lg:w-[80%] mt-20 mb-20 m-auto h-full shadow-md overflow-hidden">
      {/* Left side - Form */}
      <div className="md:w-2/3 w-full p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-poppins text-gray-900 mb-2">
            We Are Happy to Discuss &<br />
            Answer <span className="text-[#12396d] font-poppins">Any Questions You Have!</span>
          </h1>
          <p className="text-gray-600 font-poppins">Fill all information details to consult with us to get services from us</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME*"
                className="w-full px-4 py-3 border outline-none font-poppins border-gray-300 rounded"
                value={formData.name}
                onChange={handleChange}
                // required
              />
              {error.name &&<p className="text-red-500 text-sm">{error.name}</p>}
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="ADDRESS"
                className="w-full px-4 py-3 outline-none border font-poppins border-gray-300 rounded"
                value={formData.address}
                onChange={handleChange}
              />
              {error.address&&<p className="text-red-500 text-sm">{error.address}</p>}
            </div>
            {/* <div>
              <input
                type="text"
                name="website"
                placeholder="WEB SITE"
                className="w-full px-4 py-3 border font-poppins border-gray-300 rounded"
                value={formData.website}
                onChange={handleChange}
              />
            </div> */}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="YOUR PHONE"
                className="w-full px-4 py-3 border outline-none font-poppins border-gray-300 rounded"
                value={formData.phone}
                onChange={handleChange}
              />
              {error.phone&&<p className="text-red-500 text-sm">{error.phone}</p>}
            </div>
            <div className="relative">
              <select
                name="inquiryType"
                className="w-full px-4 py-3 border outline-none font-poppins border-gray-300 rounded appearance-none"
                value={formData.inquiryType}
                onChange={handleChange}
              >
                <option value="" disabled selected>YOUR INQUIRY ABOUT</option>
                <option value="product availability">Product Availability</option>
                <option value="delivery location">Delivery Location</option>
                <option value="delivery timeline">Delivery Timeline</option>
                <option value="project consultation">Project Consultation</option>
                <option value="parternship">Parternship</option>
                <option value="something else">Something Else</option>
         
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={18} className="text-gray-500" />
              </div>
              {error.inquiryType&&<p className="text-red-500 text-sm">{error.inquiryType}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="EMAIL*"
                className="w-full px-4 py-3 outline-none border font-poppins border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
                           />
              {error.email&&<p className="text-red-500 text-sm">{error.email}</p>}
            </div>
           
          </div>
          
          <div className="mb-6">
            <textarea
              name="message"
              placeholder="WRITE HERE*"
              rows="6"
              className="w-full px-4 font-poppins py-3 outline-none border border-gray-300 rounded resize-none"
              value={formData.message}
              onChange={handleChange}
              // required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="flex items-center cursor-pointer justify-center bg-[#12396d] hover:bg-[#12396d] text-white font-medium px-6 py-3 rounded transition duration-300"
         
            disabled={loading} >
          {loading ? (
    <span className="flex items-center">
      <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      Sending...
    </span>
  ) : (
    <>
      <span className="mr-2 font-poppins">SEND NOW</span>
      <Send size={16} />
    </>
  )}
          </button>
        </form>
      </div>
      
      {/* Right side - Image */}
      <div 
      className="relative sm:w-[45%]  lg:min-h-[269px] md:min-h-[269px] xl:min-h-[269px] sm:min-h-[269px] m-[20px_0_20px_3%] overflow-hidden float-left shadow-lg border-[5px] border-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full sm:h-[720px]  mt-5 rounded-b-xl relative transition-transform duration-300">
        <img 
          src="contact.png" 
          alt="Digital Marketing Tools by Experts"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div 
        className={`absolute w-full h-full  bg-white opacity-60  text-center text-gray-900 pt-4 transition-all duration-700 top-[5px] ${
          isHovered ? 'right-0' : 'right-[600px] left-auto'
        }`}
      >
        <div className="text-2xl font-medium"></div>
        <p className="text-base mt-2">
         
        </p>
        
       
      </div>
    </div>
 
    </div>
  );
}

export default  ContactForm;
