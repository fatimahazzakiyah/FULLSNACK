const db = require("../config/database");
HEAD
class CartController {
    async store(req, res) {
        const { product_id } = req.body;

        if (!product_id) {
            return res.status(400).json({
                message: "Product ID harus diisi!"
            });
        }

        // isi default biar aman
        const id_user = 1; // sementara hardcode dulu
        const status = "aktif";

        const query = `
            INSERT INTO cart (product_id, id_user, status)
            VALUES (?, ?, ?)
        `;

        db.query(query, [product_id, id_user, status], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Gagal tambah ke cart",
                    error: err
                });
            }

            res.status(201).json({
                message: "Berhasil tambah ke cart!"
            });
        });
    }
}

module.exports = new CartController();
const CartController = {
  index: (req, res) => {
    // Query ini menggabungkan tabel cart dan products berdasarkan ID
    const query = `
            SELECT 
                cart.id AS cart_id, 
                products.nama_produk, 
                products.harga, 
                cart.quantity 
            FROM cart 
            INNER JOIN products ON cart.product_id = products.id
        `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error Query Cart:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Data Keranjang dikirim ke Frontend:", results);
      res.json(results);
    });
  },

  store: (req, res) => {
    const { product_id, quantity } = req.body;

    // Cek dulu apakah barang ada di tabel products
    db.query(
      "SELECT * FROM products WHERE id = ?",
      [product_id],
      (err, product) => {
        if (product.length === 0)
          return res.status(404).json({ message: "Produk tidak ditemukan" });

        const checkQuery = "SELECT * FROM cart WHERE product_id = ?";
        db.query(checkQuery, [product_id], (err, results) => {
          if (results.length > 0) {
            db.query(
              "UPDATE cart SET quantity = quantity + ? WHERE product_id = ?",
              [quantity, product_id],
              (err) => {
                res.json({ message: "Jumlah snack bertambah! ✨" });
              },
            );
          } else {
            db.query(
              "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
              [product_id, quantity],
              (err) => {
                res.json({ message: "Berhasil masuk keranjang!" });
              },
            );
          }
        });
      },
    );
  },

  destroy: (req, res) => {
    db.query("DELETE FROM cart WHERE id = ?", [req.params.id], (err) => {
      res.json({ message: "Item dihapus!" });
    });
  },

  checkout: (req, res) => {
    db.query("DELETE FROM cart", (err) => {
      res.json({ message: "Checkout Berhasil!" });
    });
  },
};

module.exports = CartController;
dd897f0780b8f030b9a062b267745455f2febfbc
