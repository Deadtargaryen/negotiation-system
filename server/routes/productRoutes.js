const express = require('express');
const { createProduct, getAllProducts } = require('../controllers/productController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createProduct);  // Product creation
router.get('/', getAllProducts);  // Get all products

module.exports = router;
