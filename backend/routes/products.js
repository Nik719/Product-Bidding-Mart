const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Define routes
router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);

module.exports = router;
