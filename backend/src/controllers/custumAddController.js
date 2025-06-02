const Product = require('../models/productModel');

// ✅ Add Thickness
const addThickness = async (req, res) => {
  try {
    const { id } = req.params;
    const { thickness = [] } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newValues = Array.isArray(thickness) ? thickness : [thickness];
    product.thickness = Array.from(new Set([...product.thickness, ...newValues]));

    await product.save();
    res.status(200).json({ message: "Thickness updated", product });
  } catch (err) {
    console.error("Add thickness error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Add Width
const addWidth = async (req, res) => {
  try {
    const { id } = req.params;
    const { width = [] } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newValues = Array.isArray(width) ? width : [width];
    product.width = Array.from(new Set([...product.width, ...newValues]));

    await product.save();
    res.status(200).json({ message: "Width updated", product });
  } catch (err) {
    console.error("Add width error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Add Length
const addLength = async (req, res) => {
  try {
    const { id } = req.params;
    const { length = [] } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newValues = Array.isArray(length) ? length : [length];
    product.length = Array.from(new Set([...product.length, ...newValues]));

    await product.save();
    res.status(200).json({ message: "Length updated", product });
  } catch (err) {
    console.error("Add length error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const deleteThickness = async (req, res) => {
  try {
    const { id } = req.params;
    const { thickness = [] } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const valuesToDelete = Array.isArray(thickness) ? thickness : [thickness];

    const notFound = valuesToDelete.filter(val => !product.thickness.includes(val));
    if (notFound.length > 0) {
      return res.status(400).json({ message: `Thickness value(s) not found: ${notFound.join(", ")}` });
    }

    product.thickness = product.thickness.filter(val => !valuesToDelete.includes(val));
    await product.save();

    res.status(200).json({ message: "Thickness deleted", deleted: valuesToDelete, product });
  } catch (err) {
    console.error("Delete thickness error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const deleteWidth = async (req, res) => {
  try {
    const { id } = req.params;
    const { width = [] } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const valuesToDelete = Array.isArray(width) ? width : [width];

    const notFound = valuesToDelete.filter(val => !product.width.includes(val));
    if (notFound.length > 0) {
      return res.status(400).json({ message: `Width value(s) not found: ${notFound.join(", ")}` });
    }

    product.width = product.width.filter(val => !valuesToDelete.includes(val));
    await product.save();

    res.status(200).json({ message: "Width deleted", deleted: valuesToDelete, product });
  } catch (err) {
    console.error("Delete width error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = {
  addThickness,
  addWidth,
  addLength,
  deleteThickness,deleteWidth
};
