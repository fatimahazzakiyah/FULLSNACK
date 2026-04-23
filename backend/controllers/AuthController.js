const db = require("../config/database");
const bcrypt = require("bcrypt");

const AuthController = {
  // REGISTER
  register: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Semua kolom wajib diisi! ❌" });
    }

    // Cek email
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        return res.status(400).json({ message: "Email sudah terdaftar! 📧" });
      }

      // 🔥 TAMBAHAN: HASH PASSWORD
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery =
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";

      db.query(
        insertQuery,
        [username, email, hashedPassword, "user"], // ✅ pakai hash
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          res.status(201).json({
            message: "Registrasi berhasil dan tersimpan di database! ✨",
            userId: result.insertId,
          });
        }
      );
    });
  },

  // LOGIN
  login: (req, res) => {
    const { email, password } = req.body;

    // 🔥 UBAH: ambil berdasarkan email saja
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Email atau Password salah! ❌" });
      }

      const user = results[0];

      // 🔥 TAMBAHAN: compare bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Email atau Password salah! ❌" });
      }

      res.status(200).json({
        message: `Selamat datang kembali, ${user.username}! 👋`,
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