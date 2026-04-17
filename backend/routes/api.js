const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const ProductController = require('../controllers/ProductController');

router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);

// Grouping Route Authentication
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;