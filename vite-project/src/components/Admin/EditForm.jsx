import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
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

  const typeOptions = ['hotrolledcoil', 'coldrolledcoil'];

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
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate('/mildStainless'); // optional: redirect after save
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating product");
      toast.error(`Edit failed. Please try again: ${err.response?.data?.error}`);
    }
  };

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <div className="max-w-xl mt-20 mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

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
          <label className="block">Thickness (comma-separated)</label>
          <input
            type="text"
            name="thickness"
            value={formData.thickness}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Width (comma-separated)</label>
          <input
            type="text"
            name="width"
            value={formData.width}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Length (comma-separated)</label>
          <input
            type="text"
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Purchase Now Link</label>
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
        </div>


        <div>
          <label className="block">Phone No</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditForm;
