const express = require('express');
const router = express.Router();
const {
  addThickness,
  addWidth,
  addLength,
  deleteThickness,
  deleteWidth
} = require('../controllers/custumAddController');

router.put('/addThickness/:id', addThickness);
router.put('/addWidth/:id', addWidth);
router.put('/addLength/:id', addLength);
router.delete('/deleteThickness/:id',deleteThickness);
router.delete('/deleteWidth/:id',deleteWidth);

module.exports = router;
