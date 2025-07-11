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
const [loading,setLoading]=useState("");
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

  const removeItem = (blockIndex, itemIndex) => {
    const updated = [...formData.content];
    updated[blockIndex].items.splice(itemIndex, 1);
    setFormData({ ...formData, content: updated });
  };
  

  const validateContent = () => {
    const errors = {};
    formData.content.forEach((block, index) => {

      const blockErrors={};

      if (!block.type.trim()) {
        blockErrors.type = 'Title is required.';
      }else{
        const wordCount = block.type.trim().length>1&&block.type.trim().length<50;
      if (!wordCount ) {
        blockErrors.type = 'Title should not exceed 50 character.';
      
      }
      }
      if (!block.text || block.text.trim() === '<p></p>') {
        blockErrors.text = 'Text content is required.';
      }
      const nonEmptyTags = block.items.filter(tag => tag.trim() !== '');
  const hasEmptyTag = block.items.some(tag => tag.trim() === '');
  const hasLongTag = block.items.some(tag => tag.length > 20);

  if (nonEmptyTags.length === 0) {
    blockErrors.items = 'At least one tag is required.';
  } else if (hasEmptyTag) {
    blockErrors.items = 'Please fill all tags.';
  } else if (hasLongTag) {
    blockErrors.items = 'Tags must be max 20 characters.';
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
      // toast.error('Please fix the errors before submitting.');
      return;
    }
setLoading(true)
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
    finally{
      setLoading(false);
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
              placeholder="Type (max 50 character)"
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
    <div key={iIndex} className="flex items-center gap-2">
      <input
        type="text"
        placeholder={`Tag ${iIndex + 1}`}
        className="w-full border p-2 rounded"
        value={item}
        maxLength={10}
        onChange={(e) => handleItemChange(cIndex, iIndex, e.target.value)}
      />
      {block.items.length > 1 && (
        <button
          type="button"
          onClick={() => removeItem(cIndex, iIndex)}
          className="text-red-500 text-sm"
        >
          Remove
        </button>
      )}
    </div>
  ))}
  {validationErrors[cIndex]?.items && (
    <p className="text-red-500 text-sm mt-1">{validationErrors[cIndex].items}</p>
  )}
  <button
    type="button"
    onClick={() => addItem(cIndex)}
    className="text-blue-500 font-poppins text-sm"
  >
    + Add Tag
  </button>
</div>

          </div>
        ))}
<div className='flex'>
<button
          type="submit"
          className="bg-[#12396d] m-auto w-80 cursor-pointer text-lg font-poppins text-white px-6 py-4 rounded"
        disabled={loading}
        >
        {loading?(
          <span className="flex items-center">
      <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg> Adding...
      </span>
        ):(
          <span className=' font-poppins'>  Add Blog</span>
        )}
        
        </button>
</div>
       
      </form>
    </div>
</div>

   
  );
};

export default AddBlog;
