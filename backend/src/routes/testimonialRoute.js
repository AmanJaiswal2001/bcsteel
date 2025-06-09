const express=require('express');
const router=express.Router();
const upload=require('../Middleware/upload')

const {createTestimonial, getAllTestimonials} =require('../controllers/testimonialController');


router.post('/createTestimonial',upload.single('file'),createTestimonial);
router.get('/getAll/Testimonial',getAllTestimonials);
router.get('/getAllTestimonialById',getAllTestimonials)

module.exports=router;