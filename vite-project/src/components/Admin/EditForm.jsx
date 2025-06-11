import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminSidebar from './AdminSidebar';
const  BASE_URL=import.meta.env.VITE_BACKEND_LIVE
const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    thickness: '',
    width: '',
    length: '',
    purchaseNow: '',
    deliveryDays: '',
    number:''
  });

  const [imageFile, setImageFile] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [existingImage, setExistingImage] = useState('');

  const typeOptions = ['hotrolledcoil', 'coldrolledcoil','hotrolledsheet','coldrolledsheet'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/product/getProduct/${id}`);
       console.log(res.data);
        const data = res?.data?.product;

        setFormData({
          name: data.name || '',
          type: data.type || '',
          
          thickness: (data.thickness || []).join(','),
          width: (data.width || []).join(','),
          length: (data.length || []).join(','),
          purchaseNow: data.purchaseNow || '',
          deliveryDays: data.deliveryDays || '',
          number: data.number || '',
        });
        setExistingImage(data.image || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };


const newErrors={};

const validateForm=()=>{
  const numberPattern = /^(\d+(\.\d+)?)(\s*,\s*\d+(\.\d+)?)*$/;
  ; // Only digits, commas, spaces
    const phonePattern = /^\d{10}$/; // Exactly 10 digits
  

    if(!formData.name.trim()) newErrors.name="Name is required";
    if(!formData.type.trim())  newErrors.type="Type is required";
    if(!formData.thickness.trim()){
      newErrors.thickness="Thickness is required";
    }else if(
      !numberPattern.test(formData.thickness)
    ){
      newErrors.thickness="Only number and commans are allowed"
    }

    if(!formData.width.trim()){
      newErrors.width="Width is required";
    }
    else if(!numberPattern.test(formData.width)){
      newErrors.width="Only number and commans are allowed"
    }

    if(!formData.length.trim()){
      newErrors.length="Weight is required";
    }else if(!numberPattern.test(formData.length)){
      newErrors.length="Only number and commans are allowed"
    }

    if(!formData.number.trim()){
      newErrors.number="please must be 10 digits"
    }
    else if(!phonePattern.test(formData.number)){
      newErrors.number="Phone number must be exactly 10 digits";
    }

    if(!formData.deliveryDays.trim()) newErrors.deliveryDays="Delivery days required"

    setError(newErrors);

    return Object.keys(newErrors).length===0;

}


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) return;
    const data = new FormData();

    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("thickness", JSON.stringify(formData.thickness.split(',').map(Number)));
    data.append("width", JSON.stringify(formData.width.split(',').map(Number)));
    data.append("length", JSON.stringify(formData.length.split(',').map(Number)));
    data.append("purchaseNow", formData.purchaseNow);
    data.append("deliveryDays", formData.deliveryDays);
    data.append("number", formData.number);
    if (imageFile) data.append("file", imageFile);

    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/product/updateProduct/${id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(res.data.message || "Product updated successfully");
      toast.success('product edit successfully!');
      // navigate('/mildStainless'); // optional: redirect after save
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating product");
      toast.error(`Edit failed. Please try again: ${err.response?.data?.error}`);
    }
  };

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
<div className='flex h-screen overflow-y-hidden'>
<AdminSidebar/>
<div className="w-full mt-5 overflow-y-auto mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      {/* {error && <p className="text-red-600 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>} */}

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

          {error.type&&<p className="text-red-500 text-sm">{error.type}</p> }
        </div>

        <div>
          <label className="block">Image (optional)</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
            accept="image/*"
          />
       
          {existingImage && (
  <div className="mb-2">
    <p className="text-sm text-gray-500">Current Image:</p>
    <img
      src={`${BASE_URL}${existingImage}`}
      alt="Existing Product"
      className="w-32 h-auto border rounded"
    />
  </div>
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
          <label className="block">Bottom Card Text</label>
          <input
            type="text"
            name="purchaseNow"
            value={formData.purchaseNow}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
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
        <div className='flex'>
        <button
          type="submit"
          className="w-60 m-auto bg-black text-white py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
        </div>
       
      </form>
    </div>
</div>

   
  );
};

export default EditForm;
