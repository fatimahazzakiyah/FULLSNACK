const db = require("../config/database");

class ProductController {
  // 1. Menampilkan semua data
  async index(req, res) {
    // Ambil SEMUA kolom agar index.html bisa baca id, nama_produk, dll.
    const query = "SELECT * FROM products";

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal mengambil data produk",
          error: err,
        });
      }

      res.status(200).json({
        message: "Berhasil menampilkan semua data produk untuk katalog",
        data: results,
      });
    });
  }

  // 2. Menampilkan detail satu produk
  async show(req, res) {
    const { id } = req.params;
    // PERBAIKAN: Gunakan 'id', bukan 'id_product' sesuai database kamu
    const query = "SELECT * FROM products WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: err,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Produk tidak ditemukan, periksa kembali ID anda",
        });
      }

      res.status(200).json({
        message: "Berhasil mengambil detail produk",
        data: results[0],
      });
    });
  }

  async store(req, res) {
    const { nama_produk, harga, stok, deskripsi } = req.body;
    const query =
      "INSERT INTO products (nama_produk, harga, stok, deskripsi) VALUES (?, ?, ?, ?)";

    db.query(query, [nama_produk, harga, stok, deskripsi], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Gagal tambah produk", error: err });
      res
        .status(201)
        .json({
          message: "Produk baru berhasil ditambah!",
          id: results.insertId,
        });
    });
  }
}

module.exports = new ProductController();
