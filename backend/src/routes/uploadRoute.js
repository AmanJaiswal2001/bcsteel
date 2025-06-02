// routes/uploadRoute.js
const express = require("express");
const upload = require("../Middleware/upload");
const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");
  res.status(200).json({ filePath: req.file.path });
});

module.exports = router;
