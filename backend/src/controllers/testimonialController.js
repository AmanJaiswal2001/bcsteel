// const testimonialModel = require('../models/testimonialModel.js');
const Testinomial=require('../models/testimonialModel.js');
const fs = require('fs');
const path = require('path');
const createTestimonial=async (req,res)=>{
try{
   
const {
    fullName,designation,rating,description}=req.body;

    if (!fullName || !designation || !rating || !description) {
        return res.status(400).json({ message: "Please provide required fields" });
      }
      const picturePath = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.jpg";

const newTestimonial=new  Testinomial({

    author:{
        fullName,
        picture:picturePath,
        designation
    },
    rating,
    description

});
await newTestimonial.save();

res.status(201).json({
    message: "Testimonial created successfully",
    testimonial: newTestimonial
  });

} catch (err) {
  console.error("Create testimonial error", err);
  res.status(500).json({ message: "Server error", error: err.message });
}

} ;

const getAllTestimonials = async (req, res) => {
    try {
      const testimonials = await Testinomial.find().sort({ createdAt: -1 });
      res.status(200).json(testimonials);
    } catch (err) {
      console.error("Get all testimonials error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  const getTestinomialById=async(req,res)=>{
    try{

        const testimonial=await Testinomial.findById(req.params.id);

        if(!testimonial){
          return   res.status(404).json({message:"Testinomail not found"});
        }
        res.status(200).json(testimonial);

    }
    catch(err){
        console.log("Get testinomial by Id error", err);
        res.status(500).json({message:"Server Error",error:err.message});

    }
  };


//   update tetimonial..

const updateTestimonial=async (req,res)=>{
    try{
        const {
            fullName,designation,rating,description}=req.body;
            const existingTestinomial=await Testinomial.findById(req.params.id);
            if(!existingTestinomial){
                return res.status(404).json({message:"Testinomial not found"});
            }
            const updateData = {};
            if(fullName||designation){
                updateData.author={};
                if(fullName) updateData.author.fullName=fullName;
                if(designation) updateData.author.designation=designation;
            }

            if(rating!==undefined) updateData.rating=rating;
            if(description) updateData.description=description;
           
            
            if(req.file){
                updateData.author=updateData.author||{};

                const oldImagePath=existingTestinomial.author.picture;
                if(oldImagePath&&oldImagePath!=="/uploads/default.jpg"){
                    const fullOldImagePath=path.join(process.cwd(),oldImagePath);
                    try {
                        fs.unlinkSync(fullOldImagePath);
                        console.log(fullOldImagePath);
                      } catch (err) {
                        console.warn("Failed to delete old image:", err.message);
                      }
                    
                }
                updateData.author.picture = `/uploads/${req.file.filename}`;
   
            }

            const updatedTestimonial=await Testinomial.findByIdAndUpdate(
                req.params.id,
                updateData,
                {new:true,runValidators:true}
            );
            res.status(200).json({
                message:"Testimonial updated successfully",
                testimonial:updatedTestimonial
            });
        }
    catch (err) {
        console.error("Update testimonial error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
      }
}

//   delete testinomial

const deleteTestinomial=async (req,res)=>{
    try{

        const deleteTestinomial=await Testinomial.findByIdAndDelete(req.params.id);
        if(!deleteTestinomial){
            return res.status(404).json({message:"Testinomail is not found"});
        }
        res.status(200).json({message:"Testimonial deleted successfully"});

    } catch (err) {
        console.error("Delete testimonial error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
      }
}



module.exports = { createTestimonial,getAllTestimonials,getTestinomialById, updateTestimonial,deleteTestinomial };
