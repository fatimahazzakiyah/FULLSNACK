const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const ProductController = require('../controllers/ProductController');
const CartController = require('../controllers/CartController');

// PRODUCTS
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);

// CART
router.post('/cart', CartController.store);

// Grouping Route Authentication
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;