const db = require("../config/database");

const CartController = {
  index: (req, res) => {
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
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  store: (req, res) => {
    const { product_id, quantity } = req.body;
    db.query("SELECT * FROM products WHERE id = ?", [product_id], (err, product) => {
      if (product.length === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });

      db.query("SELECT * FROM cart WHERE product_id = ?", [product_id], (err, results) => {
        if (results.length > 0) {
          db.query("UPDATE cart SET quantity = quantity + ? WHERE product_id = ?", [quantity, product_id], (err) => {
            res.json({ message: "Jumlah snack bertambah! ✨" });
          });
        } else {
          db.query("INSERT INTO cart (product_id, quantity) VALUES (?, ?)", [product_id, quantity], (err) => {
            res.json({ message: "Berhasil masuk keranjang!" });
          });
        }
      });
    });
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