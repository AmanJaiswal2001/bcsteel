const express = require("express");
const upload = require("../Middleware/upload");  // multer middleware
const { createBlog, getAllBlogs, getBlogById,  updateBlog, deleteBlog, } = require("../controllers/blogController");

const router = express.Router();

// Agar sirf ek file upload karni ho:
// router.post("/createBlog", upload.single("banerImage"), createBlog);

// Lekin agar tum dono images (banerImage aur sideImage) upload karna chahte ho:
router.post(
  "/createBlog",
  upload.fields([
    { name: "banerImage", maxCount: 1 },
    { name: "sideImage", maxCount: 1 }
  ]),
  createBlog
);

router.get('/getAllBlog',getAllBlogs);
router.get('/getBlogById/:id', getBlogById);

router.put(
    "/updateBlog/:id",
    upload.fields([
      { name: "banerImage", maxCount: 1 },
      { name: "sideImage", maxCount: 1 }
    ]),
    updateBlog
  );
  
  // DELETE
  router.delete('/deleteBlog/:id', deleteBlog);
  

module.exports = router;
