const db = require("../config/database");

class ProductController {

  // GET semua produk
 // POST tambah produk
// POST tambah produk
// POST tambah produk
async store(req, res) {
  const { nama, harga, stok } = req.body;

  const query = `
    INSERT INTO products (nama, deskripsi, harga, stok, kategori)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [nama, "-", harga, stok, "Snack"], // ✅ isi default biar ga null
    (err, result) => {
      if (err) {
        console.log("ERROR DB:", err); // 👈 WAJIB
        return res.status(500).json({
          message: "Gagal menambahkan produk",
          error: err,
        });
      }

      res.status(201).json({
        message: "Produk berhasil ditambahkan!",
        data: result,
      });
    }
  );
}

  // GET detail produk
  async show(req, res) {
    const { id } = req.params;

    const query = "SELECT * FROM products WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }

      res.status(200).json(results[0]);
    });
  }

  // POST tambah produk
  async store(req, res) {
    const { nama_produk, harga, deskripsi, stok } = req.body;

    const query =
      "INSERT INTO products (nama_produk, harga, deskripsi, stok) VALUES (?, ?, ?, ?)";

    db.query(query, [nama_produk, harga, deskripsi, stok], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal menambahkan produk",
          error: err,
        });
      }

      res.status(201).json({
        message: "Produk berhasil ditambahkan!",
        data: {
          id: result.insertId,
          nama_produk,
          harga,
          deskripsi,
          stok,
        },
      });
    });
  }

  // DELETE produk
  async destroy(req, res) {
    const { id } = req.params;

    db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(200).json({ message: "Produk berhasil dihapus" });
    });
  }

  // UPDATE stok
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