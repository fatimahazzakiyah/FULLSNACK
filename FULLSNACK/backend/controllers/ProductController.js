const db = require("../config/database");

class ProductController {
  // 1. Menampilkan semua data
  async index(req, res) {
    const query = "SELECT * FROM products";
    db.query(query, (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Gagal ambil data", error: err });
      res.json({
        message: "Menampilkan semua data produk",
        data: results,
      });
    });
  }

  // 2. Menampilkan detail satu produk
  async show(req, res) {
    const { id } = req.params;
    const query = "SELECT * FROM products WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Gagal ambil detail", error: err });
      if (results.length === 0) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }
      res.json({
        message: "Menampilkan detail produk",
        data: results[0],
      });
    });
  }

  // 3. Menambahkan data produk baru
  async store(req, res) {
    const { nama_produk, harga, stok, deskripsi } = req.body;
    const query =
      "INSERT INTO products (nama_produk, harga, stok, deskripsi) VALUES (?, ?, ?, ?)";
    db.query(query, [nama_produk, harga, stok, deskripsi], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Gagal simpan data", error: err });
      res.status(201).json({
        message: "Produk berhasil ditambahkan!",
        data: { id: results.insertId, nama_produk, harga, stok, deskripsi },
      });
    });
  }

  // 4. Update Data Produk
  async update(req, res) {
    const { id } = req.params;
    const { nama_produk, harga, stok, deskripsi } = req.body;
    const query =
      "UPDATE products SET nama_produk = ?, harga = ?, stok = ?, deskripsi = ? WHERE id = ?";

    db.query(
      query,
      [nama_produk, harga, stok, deskripsi, id],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Gagal update data", error: err });
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Produk tidak ditemukan" });
        }
        res.json({ message: "Produk berhasil diupdate!" });
      },
    );
  }

  // 5. Hapus Data Produk
  async destroy(req, res) {
    const { id } = req.params;
    const query = "DELETE FROM products WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Gagal hapus data", error: err });
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }
      res.json({ message: "Produk berhasil dihapus!" });
    });
  }
}

module.exports = new ProductController();
