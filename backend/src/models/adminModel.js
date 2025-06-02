const mongoose =require('mongoose');


const adminSchema=new mongoose.Schema({

  FullName:{
    type:String,
    require:true,
  }, 
  
  userName:{
    type:String,
    reqired:true,
  },
  email:{
    type:String,
    unique:true,
    reqired:true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address!']
  },
  password:{
    type:String,
    required:true,
    minlength:[8,"Password should be at least 8 characters long!"],
validate:{
    validator:function(value){
        return /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value); // Ensuring password has at least 1 uppercase, 1 lowercase, and 1 number
            },
            message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!'
        } ,
       
  },
  isAdmin: {
    type: Boolean,
    default: true, // since this schema is only for admin, we default it to true
  }




},{timestamps:true});


module.exports =mongoose.model("admin",adminSchema);