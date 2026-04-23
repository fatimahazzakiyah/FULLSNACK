const db = require("../config/database");

class ProductController {
<<<<<<< HEAD
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
=======
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
>>>>>>> dd897f0780b8f030b9a062b267745455f2febfbc
}

module.exports = new ProductController();