const db = require("../config/database");

class CartController {
  // --- FITUR TAMBAH (VALIDASI STOK CEK) ---
  async store(req, res) {
    const { id_product, quantity } = req.body;
    const qty = parseInt(quantity) || 1;

    if (!id_product) {
      return res.status(400).json({ message: "Product ID harus diisi!" });
    }

    const checkQuery =
      "SELECT nama_produk, harga, stok FROM products WHERE id = ?";
    db.query(checkQuery, [id_product], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Produk tidak ditemukan!" });

      const produk = results[0];
      // VALIDASI: Cek apakah permintaan melebihi stok di database
      if (qty > produk.stok) {
        return res.status(400).json({
          message: `Stok tidak cukup! ${produk.nama_produk} sisa ${produk.stok}`,
        });
      }

      const insertQuery =
        "INSERT INTO cart (product_id, quantity) VALUES (?, ?)";
      db.query(insertQuery, [id_product, qty], (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Gagal tambah ke cart", error: err.message });
        res
          .status(201)
          .json({
            message: `Berhasil tambah ${produk.nama_produk} ke keranjang!`,
          });
      });
    });
  }

  // --- FITUR CHECKOUT (VALIDASI POTONG STOK) ---
  async checkout(req, res) {
    const getCartQuery = "SELECT product_id, quantity FROM cart";

    db.query(getCartQuery, (err, items) => {
      if (err)
        return res.status(500).json({ message: "Gagal ambil data keranjang" });
      if (items.length === 0)
        return res.status(400).json({ message: "Keranjang kosong!" });

      // Proses potong stok: Tugas Arra Pertemuan 5
      items.forEach((item) => {
        const updateStokQuery =
          "UPDATE products SET stok = stok - ? WHERE id = ?";
        db.query(updateStokQuery, [item.quantity, item.product_id], (err) => {
          if (err) console.error("Gagal potong stok ID:", item.product_id);
        });
      });

      // Kosongkan keranjang setelah stok berhasil dipotong
      db.query("DELETE FROM cart", (err) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Gagal mengosongkan keranjang" });
        res
          .status(200)
          .json({
            message: "Checkout Berhasil! Stok database telah diperbarui.",
          });
      });
    });
  }

  // --- FITUR HAPUS (MAULIDYA) ---
  async destroy(req, res) {
    const { id } = req.params;
    db.query("DELETE FROM cart WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Gagal hapus item" });
      res.status(200).json({ message: "Item berhasil dihapus!" });
    });
  }

  // --- FITUR TAMPILAN KERANJANG & JOIN ---
  async index(req, res) {
    const query = `
      SELECT cart.id, products.nama_produk, products.harga, cart.quantity 
      FROM cart 
      JOIN products ON cart.product_id = products.id`;
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  }
}

module.exports = new CartController();
