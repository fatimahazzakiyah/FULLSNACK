const express = require("express");
const router = express.Router();

// --- IMPORT CONTROLLERS ---
const AuthController = require("../controllers/AuthController");
const ProductController = require("../controllers/ProductController");
const CartController = require("../controllers/CartController");

// --- IMPORT MIDDLEWARE ---
const { verifyToken, isAdmin, isUser } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// --- ROUTES AUTH (tidak perlu token) ---
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// --- ROUTES PRODUCTS ---
// Semua orang bisa lihat produk
router.get("/products", ProductController.index);

// Hanya ADMIN: tambah, hapus, update produk
// verifyToken → cek login dulu | isAdmin → cek role admin
router.post("/products", verifyToken, isAdmin, upload.single("image"), ProductController.store);
router.delete("/products/:id", verifyToken, isAdmin, ProductController.destroy);
router.put("/products/:id", verifyToken, isAdmin, ProductController.update);

// --- ROUTES CART ---
// Hanya USER LOGIN yang bisa akses keranjang
router.get("/cart", verifyToken, isUser, CartController.index);
router.post("/cart", verifyToken, isUser, CartController.store);
router.delete("/cart/:id", verifyToken, isUser, CartController.destroy);
router.post("/cart/checkout", verifyToken, isUser, CartController.checkout);

module.exports = router;