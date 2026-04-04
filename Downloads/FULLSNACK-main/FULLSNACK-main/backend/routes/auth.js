const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Auth route working");
});

router.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    res.json({
        message: "Register berhasil"
    });

});

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    res.json({
        message: "Login berhasil"
    });

});

module.exports = router;