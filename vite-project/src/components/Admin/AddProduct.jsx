import React, { useRef, useState } from 'react';
import axios from "axios";
const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    // image: '',
    thickness: '',
    width: '',
    length: '',
    purchaseNow: '',
    deliveryDays: '',
    number:''
  });

  const [error, setError] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const typeOptions = [
    'hotrolledsheet',
    'hotrolledcoil',
    'coldrolledsheet',
    'coldrolledcoil',
  ];

const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };
  const fileInputRef = useRef();
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };



  const validateForm=()=>{

const newErrors={};
const numberPattern = /^(\d+(\.\d+)?)(\s*,\s*\d+(\.\d+)?)*$/;
; // Only digits, commas, spaces
  const phonePattern = /^\d{10}$/; // Exactly 10 digits

if(!formData.name.trim()) newErrors.name="Name is required";
if(!formData.type.trim())  newErrors.type="Type is required";
if(!formData.thickness.trim())
{
  newErrors.thickness="Thickness is required";

}else if(
  !numberPattern.test(formData.thickness)
){
  newErrors.thickness="Only number and commans are allowed"
}
 
if(!formData.width.trim())
{
  newErrors.width="Width is required";
}
else if(!numberPattern.test(formData.width)){

  newErrors.width="Only number and commans are allowed"

}
 
if(!formData.length.trim())
  
  {
    newErrors.length="Weigth is required";
  }else if(!numberPattern.test(formData.length)){
newErrors.length="Only number and commans are allowed"
  }
  
if(!formData.number.trim()) 
{
newErrors.number="Please must be 10 digits"
}
else if(!phonePattern.test(formData.number)){
  newErrors.number="Phone number must be exactly 10 digits";
}
  
if(!formData.deliveryDays.trim()) newErrors.deliveryDays="Delivery days required";


setError(newErrors);
return Object.keys(newErrors).length===0;

  };







  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm())  return;
    const data = new FormData();

    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("thickness", JSON.stringify(formData.thickness.split(',').map(Number)));
    data.append("width", JSON.stringify(formData.width.split(',').map(Number)));
    data.append("length", JSON.stringify(formData.length.split(',').map(Number)));
    data.append("purchaseNow", formData.purchaseNow);
    data.append("deliveryDays", formData.deliveryDays);
    data.append("number", formData.number);
    if (imageFile) data.append("file", imageFile); // 👈 file key must match multer field name

    try {

      // if (!imageFile) {
      //   const response = await fetch("/1380.jpg"); // from public folder
      //   const blob = await response.blob();
      //   const file = new File([blob], "1380.jpg", { type: blob.type });
      //   data.append("file", file);
      // } else {
      //   data.append("file", imageFile);
      // }
      const res = await axios.post(`${BASE_URL}/api/admin/product/createProduct`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message);
      toast.success("product added successfully",res.data);
      navigate('/mildStainless')
      
    } catch (err) {
     let errorMsg = err.response?.data?.error ||  // ← this gets your validation message
    err.response?.data?.message ||
    err.message ||
    "Something went wrong";
      toast.error(`Error uploading:${errorMsg}`);
      setMessage(errorMsg); }
  };

  const isAdmin=sessionStorage.getItem('isAdmin')==='true'

  return (

    <div className='flex h-screen gap-5 bg-gray-100 overflow-y-hidden'>
{
  isAdmin&&(
    <AdminSidebar/> 
  )
}
<div className='w-full pt-5 mx-auto p-6 bg-gray-100  overflow-y-auto'>
<div className="w-[60%] mt-5 mx-auto p-6 bg-white  bg-white shadow rounded-2xl">
      <h2 className="text-xl font-poppins font-bold mb-4">Add Product</h2>
      {/* {error && <p className="text-red-600 mb-2">{error}</p>} */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {error.name&&<p className="text-red-500 text-sm">{error.name}</p>}
        </div>

        <div>
          <label className="block">Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Type</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {error.type && <p className="text-red-500 text-sm">{error.type}</p>}
            
        </div>

        <div>
        <label className="block mb-1">Image (optional)</label>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload  Image
          </button>
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {imageFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: <span className="font-medium">{imageFile.name}</span>
            </p>
          )}
</div>

        <div>
          <label className="block">Thickness (comma-separated)*</label>
          <input
            type="text"
            name="thickness"
            value={formData.thickness}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
           {error.thickness && <p className="text-red-500 text-sm">{error.thickness}</p>}
      
        </div>

        <div>
          <label className="block">Width (comma-separated)*</label>
          <input
            type="text"
            name="width"
            value={formData.width}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
            {error.width && <p className="text-red-500 text-sm">{error.width}</p>}
         
        </div>

        <div>
          <label className="block">Weight (comma-separated)*</label>
          <input
            type="text"
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
            {error.length && <p className="text-red-500 text-sm">{error.length}</p>}
         
        </div>

        <div>
          <label className="block">Bottom card</label>
          <input
            type="text"
            name="purchaseNow"
            value={formData.purchaseNow}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>


        <div>
          <label className="block">Phone No*</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {error.number&&<p className="text-red-500 text-sm">{error.number}</p>}
        </div>
        <div>
          <label className="block">Delivery Days *</label>
          <input
            type="text"
            name="deliveryDays"
            value={formData.deliveryDays}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
           {error.deliveryDays&&<p className="text-red-500 text-sm">{error.deliveryDays}</p>}
      
        </div>
<div className='flex'>
<button
          type="submit"
          className="w-80 m-auto bg-[#12396d] text-white font-poppins py-2 rounded hover:bg-blue-700"
        >
          Save Product
        </button>

</div>
      
      </form>
    </div>
</div>


    </div>
   
  );
};

export default AddProduct;
