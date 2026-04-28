const express = require("express");
const router = express.Router();

// --- IMPORT CONTROLLERS ---
const AuthController = require("../controllers/AuthController");
const ProductController = require("../controllers/ProductController");
const CartController = require("../controllers/CartController");

// --- IMPORT MIDDLEWARE ---
const { isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// --- ROUTES AUTH ---
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// --- ROUTES PRODUCTS ---
router.get("/products", ProductController.index);
router.post("/products", upload.single("image"), ProductController.store);
router.delete("/products/:id", ProductController.destroy);
router.put("/products/:id", ProductController.update);

// --- ROUTES CART (Ini yang tadi bikin 'Cannot GET') ---
router.get("/cart", CartController.index);
router.post("/cart", CartController.store);
router.delete("/cart/:id", CartController.destroy);
router.post("/cart/checkout", CartController.checkout);

module.exports = router;
