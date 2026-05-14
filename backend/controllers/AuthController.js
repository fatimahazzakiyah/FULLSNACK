const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../middleware/authMiddleware");

const AuthController = {
  // REGISTER
  register: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Semua kolom wajib diisi!" });
    }

    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        return res.status(400).json({ message: "Email sudah terdaftar!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery =
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";

      db.query(
        insertQuery,
        [username, email, hashedPassword, "user"],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          res.status(201).json({
            message: "Registrasi berhasil dan tersimpan di database!",
            userId: result.insertId,
          });
        }
      );
    });
  },

  // LOGIN — sekarang generate JWT token ✅
  login: (req, res) => {
    const { email, password } = req.body;

    // VALIDASI INPUT KOSONG
    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi!",
      });
    }

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(401).json({ message: "Email atau Password salah!" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Email atau Password salah!" });
      }

      // ✅ BUAT TOKEN JWT
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        SECRET_KEY,
        { expiresIn: "8h" }
      );

      res.status(200).json({
        message: `Selamat datang kembali, ${user.username}!`,
        token: token, // ✅ token dikirim ke frontend
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    });
  },
};

module.exports = AuthController;