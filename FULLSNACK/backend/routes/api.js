const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const ProductController = require("../controllers/ProductController");

router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
router.post("/products", ProductController.store);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.destroy); // <--- INI YANG TADI KURANG, RA!

// Grouping Route Authentication
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
