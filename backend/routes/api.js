const express = require("express");
const router = express.Router();

// Import Controllers
const AuthController = require("../controllers/AuthController");
const ProductController = require("../controllers/ProductController");
const CartController = require("../controllers/CartController");

// Import Middleware
const { isAdmin } = require("../middleware/authMiddleware");

// --- ROUTES AUTH ---
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// --- ROUTES PRODUCTS ---
router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);

// Proteksi admin (biar ga sembarang orang bisa nambah produk)
router.post("/products", ProductController.store);

// --- ROUTES CART ---
// router.get("/cart", CartController.index);
router.post("/cart", CartController.store);
// router.delete("/cart/:id", CartController.destroy);
router.delete("/products/:id", ProductController.destroy);
router.put("/products/:id", ProductController.update);
// --- ROUTE CHECKOUT ---
// router.post("/checkout", CartController.checkout);

module.exports = router;