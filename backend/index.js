const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// KONEKSI DATABASE (Pakai Port 3307 sesuai XAMPP kamu)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_fullsnack",
});

db.connect((err) => {
  if (err) {
    console.error("Gagal konek database: " + err.stack);
    return;
  }
  console.log("Database Connected! ✅");
});

app.post("/api/products", (req, res) => {
  const { nama, harga, stok } = req.body; // Harus 'nama'
  const sql = "INSERT INTO products (nama, harga, stok) VALUES (?, ?, ?)";
  db.query(sql, [nama, harga, stok], (err, result) => {
    if (err) res.status(500).send(err);
    res.json({ message: "Produk berhasil ditambahkan" });
  });
});
// ROUTE UTAMA (Biar pas dibuka di browser nggak error)
app.get("/", (req, res) => {
  res.send("<h1>Backend FullSnack Jalan! </h1><p>API Produk ada di: /api/products</p>");
});

// GET: Ambil data (Nama kolom disesuaikan: 'nama')
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// DELETE: Hapus (Sesuai id_product)
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id_product = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Produk berhasil dihapus" });
  });
});

// UPDATE: Update stok
app.put("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const { stok } = req.body;
  db.query("UPDATE products SET stok = ? WHERE id_product = ?", [stok, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Stok berhasil diupdate" });
  });
});

// --- ROUTE ORDERS (RIWAYAT) ---

// GET: Ambil riwayat belanja berdasarkan ID User
// Ini yang bakal dipanggil oleh file Riwayat.jsx kamu
app.get("/api/orders/:userId", (req, res) => {
  const userId = req.params.userId;
  
  // Pastikan nama tabel 'orders' dan kolom 'user_id' sudah ada di phpMyAdmin
  const sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC";
  
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Gagal ambil riwayat:", err);
      return res.status(500).json({ error: "Gagal mengambil data riwayat" });
    }
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});