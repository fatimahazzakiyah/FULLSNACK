const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const ProductController = require("../controllers/ProductController");
const CartController = require("../controllers/CartController");

// PRODUCTS
router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
router.post("/products", ProductController.store);

// CART
router.post("/cart", CartController.store);
router.get("/cart/summary", CartController.getSummary);
router.delete("/cart/:id", CartController.destroy);
router.get("/cart", CartController.index);

// Grouping Route Authentication
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

//checkout
router.post("/checkout", CartController.checkout);

module.exports = router;
