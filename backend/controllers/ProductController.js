const db = require("../config/database");

class ProductController {
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
}
module.exports = new ProductController();
