const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../middleware/authMiddleware");

const AuthController = {
  // --- REGISTER ---
  register: async (req, res) => {
    try {
   
      const { username, email, password } = req.body;

  
      console.log("Data masuk:", req.body);

      if (!username || !email || !password) {
        return res.status(400).json({ message: "Semua kolom wajib diisi!" });
      }

      const checkQuery = "SELECT * FROM users WHERE email = ?";
      db.query(checkQuery, [email.trim()], async (err, results) => {
        if (err)
          return res.status(500).json({ error: "Gagal mengecek database" });

        if (results.length > 0) {
          return res.status(400).json({ message: "Email sudah terdaftar!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery =
          "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";

        db.query(
          insertQuery,
          [username, email.trim(), hashedPassword, "user"],
          (err, result) => {
            if (err) {
              console.error("Error saat simpan:", err);
              return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
              message: "Registrasi berhasil!",
              userId: result.insertId,
            });
          },
        );
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  // --- LOGIN ---
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email dan password wajib diisi!" });
      }

      const query = "SELECT * FROM users WHERE email = ?";
      db.query(query, [email.trim()], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length === 0) {
          return res
            .status(401)
            .json({ message: "Email atau Password salah! ❌" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Email atau Password salah! ❌" });
        }

        const token = jwt.sign(
          {
            id: user.id_user, // Sesuai kolom di image_2602e0.png
            username: user.username,
            email: user.email,
            role: user.role,
          },
          SECRET_KEY,
          { expiresIn: "8h" },
        );

        res.status(200).json({
          message: `Selamat datang kembali, ${user.username}! 🌸`,
          token: token,
          user: {
            id: user.id_user,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan sistem." });
    }
  },
};

module.exports = AuthController;
