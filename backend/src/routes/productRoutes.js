
const express=require('express');
const { createProduct, getAllProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/ProductController');
const upload = require('../Middleware/upload');

const router=express.Router();


router.post('/createProduct',upload.single('file'),createProduct);
router.get('/getAllProduct',getAllProduct);
router.get('/getProduct/:id',getProductById);
router.put('/updateProduct/:id', upload.single("file"),updateProduct);
router.delete('/deleteProduct/:id',deleteProduct);



module.exports=router;