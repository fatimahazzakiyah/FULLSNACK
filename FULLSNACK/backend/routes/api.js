const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Grouping Route Authentication
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;