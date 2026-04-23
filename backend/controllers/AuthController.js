<<<<<<< HEAD
// Data user sementara (Array) - Wajib ada di paling atas
let users = [];

class AuthController {
    static register(req, res) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Data tidak lengkap" });
        }
        users.push({ username, email, password });
        res.status(201).json({ message: "Berhasil Register", user: { username, email } });
    }

    static login(req, res) {
        const { email, password } = req.body;
        
        const userFound = users.find(u => u.email === email && u.password === password);

        if (userFound) {
            return res.status(200).json({
                message: "Login Berhasil!",
                user: { username: userFound.username, email: userFound.email }
            });
        }

        res.status(401).json({ message: "Email atau Password salah!" });
    }
}
=======
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
>>>>>>> dd897f0780b8f030b9a062b267745455f2febfbc

module.exports = AuthController;