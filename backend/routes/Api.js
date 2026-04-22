const express = require("express");
const router = express.Router();

// Import Controllers
const AuthController = require("../controllers/AuthController");
const ProductController = require("../controllers/ProductController");
const CartController = require("../controllers/CartController");

// --- ROUTES AUTH ---
// Pastikan di AuthController.js fungsinya bukan 'static' atau panggil sesuai exportnya
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// --- ROUTES PRODUCTS ---
router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);

// --- ROUTES CART ---
router.get("/cart", CartController.index);
router.post("/cart", CartController.store);
router.delete("/cart/:id", CartController.destroy);

// --- ROUTE CHECKOUT ---
router.post("/checkout", CartController.checkout);

module.exports = router;
