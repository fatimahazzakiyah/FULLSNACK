const db = require("../config/database");

class ProductController {
  // 1. Menampilkan semua data
  async index(req, res) {
        const query = "SELECT * FROM products"; // Pastikan narik semua kolom (id, nama_produk, harga, stok, deskripsi)
        
        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ 
                    message: "Gagal mengambil data produk", 
                    error: err 
                });
            }
            
            // Respon JSON sesuai standar Pertemuan 4
            res.status(200).json({
                message: "Berhasil menampilkan semua data produk untuk katalog",
                data: results
            });
        });
    }

  // 2. Menampilkan detail satu produk
  async show(req, res) {
        const { id } = req.params; // Mengambil ID dari URL (misal: /api/products/1)
        const query = "SELECT * FROM products WHERE id_product = ?";

        db.query(query, [id], (err, results) => {
            // 1. Cek jika terjadi error pada koneksi/query database
            if (err) {
                return res.status(500).json({ 
                    message: "Internal Server Error", 
                    error: err 
                });
            }

            // 2. Cek apakah ID produk ditemukan 
            if (results.length === 0) {
                return res.status(404).json({ 
                    message: "Produk tidak ditemukan, periksa kembali ID anda" 
                });
            }

            // 3. Jika ketemu, kirim data produk pertama (index 0)
            res.status(200).json({
                message: "Berhasil mengambil detail produk",
                data: results[0]
            });
        });
    }

    async store(req, res) {
        res.send("Fungsi store belum diisi Revani");
    }
}

module.exports = new ProductController();