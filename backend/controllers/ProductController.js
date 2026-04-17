const db = require('../config/database');

class ProductController {
    async index(req, res) {
        const query = "SELECT * FROM products";

        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ message: "Gagal ambil data", error: err });

            res.json({
                message: "Menampilkan semua data produk",
                data: results
            });
        });
    }

    async show(req, res) {
        const { id } = req.params;
        const query = "SELECT * FROM products WHERE id = ?";

        db.query(query, [id], (err, results) => {
            if (err) return res.status(500).json({ message: "Gagal ambil detail", error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: "Produk tidak ditemukan" });
            }

            res.json({
                message: "Menampilkan detail produk",
                data: results[0]
            });
        });
    }
}

module.exports = new ProductController();