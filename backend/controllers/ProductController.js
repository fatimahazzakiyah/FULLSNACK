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
        const query = "SELECT * FROM products WHERE id_product = ?";

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

    // Menambahkan data produk baru (Create/Store)
    async store(req, res) {
        const { nama, harga, stok } = req.body; // Mengambil data dari body request
        
        // Query untuk memasukkan data ke database
        const query = "INSERT INTO products (nama, harga, stok) VALUES (?, ?, ?)";
        
        db.query(query, [nama, harga, stok], (err, results) => {
            if (err) return res.status(500).json({ message: "Gagal simpan data", error: err });
            
            res.status(201).json({
                message: "Produk berhasil ditambahkan!",
                data: {
                    id: results.insertId,
                    nama,
                    harga,
                    stok
                }
            });
        });
    }
}

module.exports = new ProductController();