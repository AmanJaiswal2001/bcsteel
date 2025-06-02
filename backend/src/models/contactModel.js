const mongoose=require('mongoose');


const contactSchema=new mongoose.Schema({

name:{
    type:String,
    require:true,
},

address:{
    type:String,
    require:true,
},
phone:{
    type:Number,
    
},
email:{
    type:String,
    require:true,
},
message:{
    type:String,
   
},

inquiryType:{
    type:String,
    require:true,
    enum: [
      'services',
      'pricing',
      'consultation',
      'other'
  ],

   
   
},


},{timestamps:true})




module.exports=mongoose.model('contact',contactSchema);