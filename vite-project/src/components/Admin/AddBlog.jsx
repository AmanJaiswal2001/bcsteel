import React, { useState } from 'react';
import axios from 'axios';
import TipTapEditor from './TipTapEditor';
import toast from 'react-hot-toast';
import AdminSidebar from './AdminSidebar';

const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const AddBlog = () => {
  const [formData, setFormData] = useState({
    content: [{ type: '', text: '', items: [''] }],
  });

  const [imageFile, setImageFile] = useState({
    banerImage: null,
    sideImage: null,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleContentChange = (index, field, value) => {
    const updated = [...formData.content];
    updated[index][field] = value;
    setFormData({ ...formData, content: updated });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImageFile((prev) => ({
      ...prev,
      [name]: files[0] || null,
    }));
  };

  const handleItemChange = (cIndex, iIndex, value) => {
    const updated = [...formData.content];
    updated[cIndex].items[iIndex] = value;
    setFormData({ ...formData, content: updated });
  };

  const addItem = (index) => {
    const updated = [...formData.content];
    updated[index].items.push('');
    setFormData({ ...formData, content: updated });
  };

  const validateContent = () => {
    const errors = {};
    formData.content.forEach((block, index) => {

      const blockErrors={};

      if (!block.type.trim()) {
        blockErrors.type = 'Title is required.';
      }else{
        const wordCount = block.type.trim().split(/\s+/).length;
      if (wordCount > 30) {
        blockErrors.type = 'Title should not exceed 30 words.';
      
      }
      }
      if (!block.text || block.text.trim() === '<p></p>') {
        blockErrors.text = 'Text content is required.';
      }
      const nonEmptyTags = block.items.filter(tag => tag.trim() !== '');
      if (nonEmptyTags.length === 0) {
        blockErrors.items = 'At least one tag is required.';
      }
      if (Object.keys(blockErrors).length > 0) {
        errors[index] = blockErrors;
      }
    });

    if(!imageFile.banerImage){
      errors.banerImage="Banner image is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateContent();
    if (!isValid) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    try {
      const data = new FormData();
      if (imageFile.banerImage) data.append('banerImage', imageFile.banerImage);
      if (imageFile.sideImage) data.append('sideImage', imageFile.sideImage);
      data.append('content', JSON.stringify(formData.content));

      await axios.post(`${BASE_URL}/api/admin/createBlog`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Blog added successfully!');
      setFormData({ content: [{ type: '', text: '', items: [''] }] });
      setImageFile({ banerImage: null, sideImage: null });
      setValidationErrors({});
    } catch (error) {
      console.error(error);
      toast.error('Upload failed. Please try again.');
    }
  };


  const isAdmin=sessionStorage.getItem('isAdmin')==='true'

  return (

<div className='flex gap-2 h-screen overflow-y-hidden bg-gray-100'>

{isAdmin&&(
  <AdminSidebar/>
)}

<div className="w-full  mx-auto p-6 overflow-y-auto bg-white">
      <h1 className="text-3xl font-bold mb-6">Upload Blog Content</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
       {/* Banner Image Upload */}
<div>
  <label className="block font-medium mb-1">Banner Image *</label>
  <button
    type="button"
    onClick={() => document.getElementById('banerImage').click()}
    className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Upload Banner Image
  </button>
  <input
    type="file"
    id="banerImage"
    name="banerImage"
    accept="image/*"
    className="hidden"
    onChange={handleFileChange}
    // required
  />
  {imageFile.banerImage && (
    <p className="text-sm mt-1 text-gray-600">{imageFile.banerImage.name}</p>
  )}
  {validationErrors.banerImage&&(
    <p className="text-red-500 text-sm mt-1">{validationErrors.banerImage}</p>
 
  )}
</div>

{/* Side Image Upload */}
<div>
  <label className="block font-medium mb-1">Side Image</label>
  <button
    type="button"
    onClick={() => document.getElementById('sideImage').click()}
    className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Upload Side Image
  </button>
  <input
    type="file"
    id="sideImage"
    name="sideImage"
    accept="image/*"
    className="hidden"
    onChange={handleFileChange}
  />
  {imageFile.sideImage && (
    <p className="text-sm mt-1 text-gray-600">{imageFile.sideImage.name}</p>
  )}
</div>


        {formData.content.map((block, cIndex) => (
          <div key={cIndex} className="border p-4 rounded bg-gray-50 space-y-4">
            <h1 className='font-poppins text-lg font-semibold'>Title*</h1>
            <input
              type="text"
              placeholder="Type (max 30 words)"
              className="w-full p-2 border rounded"
              value={block.type}
              onChange={(e) => handleContentChange(cIndex, 'type', e.target.value)}
              // required
            />
            {validationErrors[cIndex]?.type && (
      <p className="text-red-500 text-sm mt-1">{validationErrors[cIndex].type}</p>
    )}
            

            <div>
              <label className="block font-semibold mb-1 font-poppins">Text (Rich Editor)*</label>
              <TipTapEditor
                value={block.text}
                onChange={(val) => handleContentChange(cIndex, 'text', val)}
              />
               {validationErrors[cIndex]?.text && (
        <p className="text-red-500 text-sm mt-1">{validationErrors[cIndex].text}</p>
      )}
            </div>

            <div className="space-y-2">
              <label className="block font-semibold font-poppins">Tags*</label>
              {block.items.map((item, iIndex) => (
                <input
                  key={iIndex}
                  type="text"
                  placeholder={`tags ${iIndex + 1}`}
                  className="w-full border p-2 rounded"
                  value={item}
                  onChange={(e) => handleItemChange(cIndex, iIndex, e.target.value)}
                  // required
                />
              ))}
              {validationErrors[cIndex]?.items && (
        <p className="text-red-500 text-sm mt-1">{validationErrors[cIndex].items}</p>
      )}
              <button
                type="button"
                onClick={() => addItem(cIndex)}
                className="text-blue-500 font-poppins text-sm"
              >
                + Add Item
              </button>
            </div>
          </div>
        ))}
<div className='flex'>
<button
          type="submit"
          className="bg-[#12396d] m-auto w-80 cursor-pointer text-lg font-poppins text-white px-6 py-4 rounded"
        >
          Submit
        </button>
</div>
       
      </form>
    </div>
</div>

   
  );
};

export default AddBlog;
