const db = require('../config/database'); 

const ProductController = {
    // Bagian Index yang dikerjakan Tiya
    async index(req, res) {
        const query = "SELECT * FROM products";
        
        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ 
                    message: "Gagal mengambil data produk", 
                    error: err 
                });
            }
            res.status(200).json({
                message: "Berhasil menampilkan semua data produk untuk katalog",
                data: results
            });
        });
    },

    async show(req, res) {
        res.send("Fungsi show belum diisi Revani");
    },

    async store(req, res) {
        res.send("Fungsi store belum diisi Revani");
    }
};

// GANTI BARIS INI: Harus sesuai nama object di atas
module.exports = ProductController;