const db = require("../config/database");

class ProductController {
  // 1. GET semua produk
  async index(req, res) {
    const query = "SELECT * FROM products";
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  }

  // 2. POST tambah produk (HANYA SATU FUNGSI STORE)
  async store(req, res) {
    const { nama_produk, harga, stok } = req.body;
    const image = req.file ? req.file.filename : null;

    const query = `
      INSERT INTO products (nama, harga, stok, image)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [nama_produk, harga, stok, image], (err, result) => {
      if (err) {
        console.log("ERROR DB:", err);
        return res.status(500).json({
          message: "Gagal menambahkan produk",
          error: err,
        });
      }

      res.status(201).json({
        message: "Produk berhasil ditambahkan!",
      });
    });
  }

  // 3. DELETE produk
  async destroy(req, res) {
    const { id } = req.params;
    db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Produk berhasil dihapus" });
    });
  }

  // 4. UPDATE stok
  async update(req, res) {
    const { id } = req.params;
    const { stok } = req.body;
    db.query(
      "UPDATE products SET stok = ? WHERE id = ?",
      [stok, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Stok berhasil diupdate" });
      }
    );
  }
}

module.exports = new ProductController();