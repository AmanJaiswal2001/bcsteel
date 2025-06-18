const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const registerAdmin = async (req, res) => {
  const { FullName, userName, email, password } = req.body;

  // Validate required fields
  if (!FullName || !userName || !email || !password) {
    return res.status(400).json({
      message: "Missing required fields: FullName, userName, email, and password are all required.",
    });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists." });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      FullName,
      userName,
      email,
      password:hashedPassword,
      isAdmin: true,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      data: {
        _id: admin._id,
        FullName: admin.FullName,
        userName: admin.userName,
        email: admin.email,
        isAdmin: admin.isAdmin,
      },
    }); } catch (err) {
    res.status(500).json({ message: "Error creating admin", error: err.message });
  }
};


const loginAdmin=async (req,res)=>{

   const { email,password}=req.body;

   if(!email||!password){
    return res.status(400).json({message:"Email and password both required"});
   }

  try{
const user=await Admin.findOne({email});
if(!user){
    return res.status(401).json({message:"Invalid email or password"});
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(401).json({ message: "Invalid email or password" });
}
res.status(200).json({
  message: "Login successfully",
  data: {
    _id: user._id,
    FullName: user.FullName,
    userName: user.userName,
    email: user.email,
    isAdmin: user.isAdmin,
  },
});
}
  
  catch(err){
    res.status(500).json({message:"server error",error:err.message});

  };


}

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // password hide
    res.status(200).json({ data: admins });
  } catch (err) {
    res.status(500).json({ message: "Error fetching admins", error: err.message });
  }
};


const getAdminById=async (req,res)=>{
  const {id}=req.params;
  try{ 
    const admin=await Admin.findById(id).select("-password")
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ data: admin });
  }catch (err) {
    res.status(500).json({ message: "Error fetching admin", error: err.message });
  }
}

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { FullName, userName, email, password } = req.body;

  try {
    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (FullName) admin.FullName = FullName;
    if (userName) admin.userName = userName;
    if (email) admin.email = email;
    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();

    res.status(200).json({ message: "Admin updated", data: admin });
  } catch (err) {
    res.status(500).json({ message: "Error updating admin", error: err.message });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting admin", error: err.message });
  }
};







module.exports = { registerAdmin,loginAdmin ,getAllAdmins,getAdminById,updateAdmin,deleteAdmin};
