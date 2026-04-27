const express = require("express");
const router = express.Router();

// Import Controllers
const AuthController = require("../controllers/AuthController");
const ProductController = require("../controllers/ProductController");
const CartController = require("../controllers/CartController");

// Import Middleware
const { isAdmin } = require("../middleware/authMiddleware");

// MULTER CONFIG
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// --- ROUTES AUTH ---
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// --- ROUTES PRODUCTS ---
router.get("/products", ProductController.index);

// FIXED UPLOAD ROUTE
router.post("/products", upload.single("image"), ProductController.store);

// --- ROUTES CART ---
router.post("/cart", CartController.store);

// --- DELETE & UPDATE
router.delete("/products/:id", ProductController.destroy);
router.put("/products/:id", ProductController.update);

module.exports = router;