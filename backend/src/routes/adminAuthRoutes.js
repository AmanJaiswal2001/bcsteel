const express =require('express');

const router=express.Router();

const {registerAdmin,loginAdmin} =require('../controllers/adminAuthController');

router.post('/adminRegister',registerAdmin);
router.post('/adminlogin',loginAdmin);
module.exports = router;










// http://localhost:8000/api/admin/auth/adminRegister


// {
//     "FullName":"Dilip Singh",
//     "userName":"Dilip123",
//     "email":"dilip@gmail.com",
//     "password":"Dilip@123"
// }
