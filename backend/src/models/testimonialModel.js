const mongoose=require('mongoose');


const testimonialSchema=new mongoose.Schema({
    author:{
        fullName:{
            type:String,
            required:true,
        },
        picture:{
            type:String,
        },
        designation:{
            type:String,
            required:true,
        },
    },
        rating:{
            type:Number,
            required:true,
            min:0,
            max:5,
        },
        description:{
            type:String,
            required:true,
        },

        // adminId:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'admin',
        //     required:true,
        // }

    },

    {timestamps:true});

module.exports=mongoose.model('testimonial',testimonialSchema);