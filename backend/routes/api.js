const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const ProductController = require('../controllers/ProductController');
const CartController = require('../controllers/CartController'); // ⬅️ pindahin ke atas

// Product Routes
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);

// Cart Route
router.get('/cart', CartController.getCart); // ⬅️ cukup sekali
router.put('/cart/:id', CartController.updateQty);

// Auth Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;