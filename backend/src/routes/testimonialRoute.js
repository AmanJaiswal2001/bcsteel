const express=require('express');
const router=express.Router();
const upload=require('../Middleware/upload')

const {createTestimonial, getAllTestimonials, getTestinomialById, updateTestimonial, deleteTestinomial} =require('../controllers/testimonialController');


router.post('/createTestimonial',upload.single('file'),createTestimonial);
router.get('/getAllTestimonial',getAllTestimonials);
router.get('/getTestimonial/:id', getTestinomialById);
router.put('/updateTestimonial/:id',upload.single('file'),updateTestimonial);
router.delete('/deleteTestimonial/:id',deleteTestinomial);


module.exports=router;