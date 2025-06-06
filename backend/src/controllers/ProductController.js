const Product=require("../models/productModel");

const fs=require('fs');
const path=require('path');


const createProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      thickness,
      width,
      length,
      purchaseNow,
      deliveryDays,
      number,
    } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Please provide required fields" });
    }

    const existing = await Product.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Product with same name and type already exists" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "/uploads/1748501381055-307691695.jpg";

    const product = new Product({
      name,
      type,
      image: imagePath,
      thickness: JSON.parse(thickness || '[]'),
      width: JSON.parse(width || '[]'),
      length: JSON.parse(length || '[]'),
      purchaseNow,
      deliveryDays,
      number
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (err) {
    console.error("Create product error", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



const getAllProduct=async(req,res)=>{
    try{
      console.log('Backend: getAllProduct route hit');  // <-- yeh line add karo


        const products=await Product.find();
        res.status(200).json({success:true,products});


    }
    catch(err){
        console.error("Get all products error",err);
        res.status(500).json({message:"Server error",error:err.message});  
      }
}


const getProductById=async(req,res)=>{

  try{

   const {id}=req.params;
   
   const product =await Product.findById(id);

   if(!product){
    return res.status(400).json({success:false,message:"Product not found"});
   }
   res.status(200).json({success:true,product});
  }
  catch (err){
    console.error("Get product by ID error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}



const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updateData = {
      ...req.body,
    };

    // Handle image update and delete old image
    if (req.file) {
      if (existingProduct.image) {
        const oldImagePath = path.join(process.cwd(), existingProduct.image.replace(/^\/+/, ''));
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.log('Failed to delete old image', err.message);
          } else {
            console.log("Old image deleted successfully");
          }
        });
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // Parse arrays if needed
    if (updateData.thickness) updateData.thickness = JSON.parse(updateData.thickness);
    if (updateData.width) updateData.width = JSON.parse(updateData.width);
    if (updateData.length) updateData.length = JSON.parse(updateData.length);

    // ✅ Run validation during update
    const updated = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // 👈 ensures schema validation
    });

    res.status(200).json({ success: true, product: updated });

  } catch (err) {
    console.error("Update product error", err);
    res.status(500).json({
      message: "Server error",
      error: err.errors?.number?.message || err.message, // return number field error if exists
    });
  }
};


const deleteProduct=async(req,res)=>{
    try{
const {id}=req.params;
const deleted= await Product.findByIdAndDelete(id);
if(!deleted){
    return res.status(404).json({message:"Product not found"});
}

res.status(200).json({success:true,message:"Product deleted"});
    }
    catch(err){
        console.log("Deleted product error",err);
        res.status(500).json({message:"Server error",error:err.message});

    }
}

module.exports={createProduct,getAllProduct,updateProduct,deleteProduct,getProductById};

