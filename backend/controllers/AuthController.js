const db = require("../config/database");

const AuthController = {
  // Fungsi Registrasi Permanen ke Database
  register: (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Semua kolom wajib diisi! ❌" });
    }

    // Cek apakah email sudah ada
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        return res.status(400).json({ message: "Email sudah terdaftar! 📧" });
      }

      // Masukkan data baru (Kolom role kita isi 'user' secara default)
      const insertQuery =
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(
        insertQuery,
        [username, email, password, "user"],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          res.status(201).json({
            message: "Registrasi berhasil dan tersimpan di database! ✨",
            userId: result.insertId,
          });
        },
      );
    });
  },

  // Fungsi Login
  login: (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Email atau Password salah! ❌" });
      }

      const user = results[0];
      res.status(200).json({
        message: `Selamat datang kembali, ${user.username}! 👋`,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role, // Kita kirim role-nya juga ke frontend
        },
      });
    });
  },
};

module.exports = AuthController;
