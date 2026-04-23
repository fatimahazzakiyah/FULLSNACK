const db = require("../config/database");

class ProductController {
  async index(req, res) {
    db.query("SELECT * FROM products", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  }

  async show(req, res) {
    const { id } = req.params;
    db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Snack tidak ditemukan" });
      res.status(200).json(results[0]);
    });
  }

  async store(req, res) {
    const { nama, harga, stok } = req.body;

    const query = "INSERT INTO products (nama, harga, stok) VALUES (?, ?, ?)";

    db.query(query, [nama, harga, stok], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: "Produk berhasil ditambahkan!",
        data: {
          id: result.insertId,
          nama,
          harga,
          stok,
        },
      });
    });
  }
}

module.exports = new ProductController();