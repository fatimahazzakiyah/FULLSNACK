const db = require('../config/database');

exports.getCart = (req, res) => {
    const query = `
        SELECT 
            cart_items.id_cart_item, -- 🔥 WAJIB ADA
            cart_items.id_product,
            cart_items.jumlah,
            products.nama,
            products.harga
        FROM cart_items
        JOIN products ON cart_items.id_product = products.id_product
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("ERROR SQL:", err);
            return res.status(500).json({
                message: "Gagal mengambil data cart",
                error: err.message
            });
        }

        res.json(results);
    });
};

exports.deleteCart = (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM cart_items WHERE id_cart_item = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Gagal hapus data" });
        }

        res.json({ message: "Berhasil dihapus" });
    });
};
// JATAH TUGAS TIYA: Update Jumlah Barang
exports.updateQty = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const query = `UPDATE cart_items SET jumlah = ? WHERE id_cart_item = ?`;
    
    db.query(query, [quantity, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Berhasil update!" });
    });
};
exports.deleteCart = (req, res) => {
    res.json({ message: "Fungsi delete" });
};
