const db = require("../config/database");

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