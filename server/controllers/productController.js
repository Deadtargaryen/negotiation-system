const Product = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newProduct = new Product({ name, price, createdBy: req.userId });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};
