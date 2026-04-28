const express = require("express");
const router = express.Router();

// Import Controllers
const AuthController = require("../controllers/AuthController");
const ProductController = require("../controllers/ProductController");
const CartController = require("../controllers/CartController");

// Import Middleware
const { isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// --- ROUTES AUTH ---
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// --- ROUTES PRODUCTS ---
router.get("/products", ProductController.index);

// FIXED UPLOAD ROUTE
router.post("/products", (req, res) => {
  upload.single("photo")(req, res, function (err) {
    if (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }
    ProductController.store(req, res);
  });
});

// --- ROUTES CART ---
router.post("/cart", CartController.store);

// --- DELETE & UPDATE
router.delete("/products/:id", ProductController.destroy);
router.put("/products/:id", ProductController.update);

module.exports = router;