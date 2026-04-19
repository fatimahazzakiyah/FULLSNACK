const db = require("../config/database");

class CartController {
    async store(req, res) {
        const { id_product } = req.body;

        if (!id_product) {
            return res.status(400).json({
                message: "Product ID harus diisi!"
            });
        }

        // isi default biar aman
        const id_user = 1; // sementara hardcode dulu
        const status = "aktif";

        const query = `
            INSERT INTO cart (id_cart, id_user, status)
            VALUES (?, ?, ?)
        `;

        db.query(query, [id_product, id_user, status], (err, result) => {
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

    async destroy(req, res) {
        const { id } = req.params; // Mengambil ID dari URL rute

        const query = "DELETE FROM cart WHERE id_cart = ?";

        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Gagal hapus item dari keranjang",
                    error: err
                });
            }

            // Cek apakah ada baris yang benar-benar terhapus
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Item tidak ditemukan!"
                });
            }

            res.status(200).json({
                message: "Item berhasil dihapus dari keranjang!"
            });
        });
    }
}

module.exports = new CartController();