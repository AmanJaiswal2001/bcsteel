const { json } = require("body-parser");
const Blog=require("../models/blogModel");

const fs=require('fs');
const path=require('path');
const createBlog=async(req,res)=>{

try{
    const { content } = req.body;

    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      return res.status(400).json({ message: "Invalid JSON in content field" });
    }
    const banerImage = req.files['banerImage'] ? req.files['banerImage'][0].filename : "/uploads/dummyproduct.jpg";
    const sideImage = req.files['sideImage'] ? req.files['sideImage'][0].filename : null;


    if(!content) return res.status(400).json({message:"All field are required"});


    const newBlog=new Blog({
        content: parsedContent,banerImage,sideImage
    });

    const savedBlog=await newBlog.save();

    res.status(201).json(savedBlog);

}catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Server error" });
  }

}


const getAllBlogs=async(req,res)=>{
    try{

const blogs=await Blog.find();
res.status(200).json(blogs);

    }
    catch(err){
        console.error("Error fetching blogs",err);
        res.status(500).json({message:"server error"});

    }
}


const getBlogById=async (req,res)=>{
    try{

        const {id}=req.params
const blog=await Blog.findById(id);
if(!blog) return res.status(404).json({message:"Blogs not found"});


res.json(blog);
    }
    catch(err){
        console.error("Error fetching blog",err);
        res.status(500).json({message:"Server error"});

    }
}


const updateBlog = async (req, res) => {
    try {
      const { content } = req.body;
      let parsedContent;
  
      if (content) {
        try {
          parsedContent = JSON.parse(content);
        } catch (e) {
          return res.status(400).json({ message: "Invalid JSON in content field" });
        }
      }
  
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
  
      let updateData = {};
      if (parsedContent) updateData.content = parsedContent;
  
      if (req.files?.banerImage) {
        if (blog.banerImage) {
          const oldBannerPath = path.join(process.cwd(), "uploads", blog.banerImage);
          if (fs.existsSync(oldBannerPath)) {
            fs.unlinkSync(oldBannerPath);
            console.log(`Deleted old banner image: ${blog.banerImage}`);
          }
        }
        updateData.banerImage = req.files.banerImage[0].filename;
      }
  
      if (req.files?.sideImage) {
        if (blog.sideImage) {
          const oldSidePath = path.join(process.cwd(), "uploads", blog.sideImage);
          if (fs.existsSync(oldSidePath)) {
            fs.unlinkSync(oldSidePath);
            console.log(`Deleted old side image: ${blog.sideImage}`);
          }
        }
        updateData.sideImage = req.files.sideImage[0].filename;
      }
  
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
      res.json(updatedBlog);
  
    } catch (err) {
      console.error("Error updating blog:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
const deleteBlog=async (req,res)=>{
    try{

const deleteBlog=await Blog.findByIdAndDelete(req.params.id);

if(!deleteBlog)return res.status(404).json({message:"Blog not found"});

res.json({message:"Blog delete successfully"});

    }
    catch (err){
        console.error("Error deleting blog:", err);
        res.status(500).json({ message: "Server error" });
     
    }
};




module.exports = { createBlog ,getAllBlogs,getBlogById,updateBlog,deleteBlog};