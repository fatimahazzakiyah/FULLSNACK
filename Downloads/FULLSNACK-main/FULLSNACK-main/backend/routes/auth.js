const express = require("express");
const router = express.Router();
const db = require("../db");

// REGISTER
router.post("/register", (req, res) => {
    const { name, email, password, role } = req.body;

    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, password, role || "user"], (err, result) => {
        if (err) {
            return res.json({ message: "Register gagal" });
        }
        res.json({ message: "Register berhasil" });
    });
});

// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, results) => {
        if (err) return res.json({ message: "Server error" });

        if (results.length > 0) {
            const user = results[0];

            res.json({
                message: "Login berhasil",
                role: user.role
            });
        } else {
            res.json({ message: "Login gagal" });
        }
    });
});

module.exports = router;

//update by arra///