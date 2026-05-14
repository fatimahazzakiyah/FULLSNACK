const db = require("../config/database");

// mengganti quantity menjadi jumlah seperti di db
const CartController = {
  // 1. TAMPILKAN KERANJANG (Penyebab halaman kosong tadi)
  index: (req, res) => {
    const query = `
            SELECT 
                cart.id_cart, 
                products.nama, 
                products.harga, 
                cart_items.jumlah 
            FROM cart 
            INNER JOIN cart_items 
              ON cart.id_cart = cart_items.id_cart
            INNER JOIN products 
              ON cart_items.id_product = products.id_product
        `;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Gagal ambil data keranjang:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },

  // 2. SIMPAN KE KERANJANG
  store: (req, res) => {
    const { id_product, jumlah } = req.body;

    // Cek produk dulu
    db.query(
      "SELECT * FROM products WHERE id_product = ?",
      [id_product],
      (err, results) => {
        if (err || results.length === 0)
          return res.status(404).json({ message: "Produk tidak ditemukan" });

        // Cek apakah sudah ada di cart (pake product_id sesuai struktur tabel kamu)
        db.query(
          "SELECT * FROM cart WHERE product_id = ?",
          [id_product],
          (err, cartItems) => {
            if (err) return res.status(500).json({ error: err.message });

            if (cartItems.length > 0) {
              // Update jumlah
              db.query(
                "UPDATE cart SET jumlah = jumlah + ? WHERE product_id = ?",
                [jumlah, id_product],
                (err) => {
                  if (err) return res.status(500).json({ error: err.message });
                  res.json({ message: "Jumlah snack bertambah! ✨" });
                },
              );
            } else {
              // Simpan baru (pakai product_id dan jumlah sesuai struktur tabel)
              db.query(
                "INSERT INTO cart (product_id, jumlah) VALUES (?, ?)",
                [id_product, jumlah],
                (err) => {
                  if (err) return res.status(500).json({ error: err.message });
                  res.json({ message: "Berhasil masuk keranjang!" });
                },
              );
            }
          },
        );
      },
    );
  },

  // 3. HAPUS ITEM (Pakai id_cart sesuai struktur)
  destroy: (req, res) => {
    db.query("DELETE FROM cart WHERE id_cart = ?", [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item dihapus!" });
    });
  },

  // 4. CHECKOUT
  checkout: (req, res) => {
    const { id_user, total_harga, alamat } = req.body;
    const queryOrder =
      "INSERT INTO orders (id_user, total_harga, alamat, status) VALUES (?, ?, ?, ?)";

    db.query(queryOrder, [id_user, total_harga, alamat, "pending"], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query("DELETE FROM cart", (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Checkout Berhasil! 🌸" });
      });
    });
  },
};

module.exports = CartController;
