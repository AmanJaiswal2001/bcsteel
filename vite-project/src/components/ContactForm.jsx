import { useState } from 'react';
import { Send, ChevronDown } from 'lucide-react';
import axios from 'axios';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
   try{
const res=await axios.post('http://localhost:8000/api/contact', formData);


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
    alert("Failed to send message.");
  
    // Here you would typically send the data to your backend
  };
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
                required
              />
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
            </div>
            <div className="relative">
              <select
                name="inquiryType"
                className="w-full px-4 py-3 border outline-none font-poppins border-gray-300 rounded appearance-none"
                value={formData.inquiryType}
                onChange={handleChange}
              >
                <option value="" disabled selected>YOUR INQUIRY ABOUT</option>
                <option value="services">Services</option>
                <option value="pricing">Pricing</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={18} className="text-gray-500" />
              </div>
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
                required
              />
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
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="flex items-center justify-center bg-[#12396d] hover:bg-[#12396d] text-white font-medium px-6 py-3 rounded transition duration-300"
          >
            <span className="mr-2 font-poppins">SEND NOW</span>
            <Send size={16} />
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
          className="w-full h-full"
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
