const express =require('express');

const router=express.Router();

const {registerAdmin,loginAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin} =require('../controllers/adminAuthController');

router.post('/adminRegister',registerAdmin);
router.post('/adminlogin',loginAdmin);
router.get('/getAllAdmin',getAllAdmins);
router.get('/getAdmin/:id',getAdminById);
router.put('/adminUpdate/:id',updateAdmin);
router.delete('/adminDelete/:id',deleteAdmin);
module.exports = router;










// http://localhost:8000/api/admin/auth/adminRegister


// {
//     "FullName":"Dilip Singh",
//     "userName":"Dilip123",
//     "email":"dilip@gmail.com",
//     "password":"Dilip@123"
// }
