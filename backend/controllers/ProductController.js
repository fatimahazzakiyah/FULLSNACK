const db = require("../config/database");

class ProductController {
  // 1. Menampilkan semua produk untuk Katalog
  async index(req, res) {
    const query = "SELECT * FROM products";

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal mengambil data produk",
          error: err.message,
        });
      }

      // Langsung kirim results agar Aura bisa langsung map/looping
      res.status(200).json(results); 
    });
  }

  // 2. Menampilkan detail satu produk (Penyebab Undefined)
  async show(req, res) {
    const { id } = req.params;
    const query = "SELECT * FROM products WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Produk tidak ditemukan",
        });
      }

      // PERBAIKAN: Langsung kirim objek produknya (results[0])
      // Jadi Aura cukup panggil data.nama_produk, bukan data.data.nama_produk
      res.status(200).json(results[0]); 
    });
  }

  // 3. Tambah Produk Baru
  async store(req, res) {
    const { nama_produk, harga, stok, deskripsi } = req.body;
    const query = "INSERT INTO products (nama_produk, harga, stok, deskripsi) VALUES (?, ?, ?, ?)";

    db.query(query, [nama_produk, harga, stok, deskripsi], (err, results) => {
      if (err) return res.status(500).json({ message: "Gagal tambah produk", error: err.message });
      
      res.status(201).json({
        message: "Produk baru berhasil ditambah!",
        id: results.insertId,
      });
    });
  }
}

module.exports = new ProductController();