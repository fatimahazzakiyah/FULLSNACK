import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    stok: "",
  });

  // 🌸 STYLE
  const inputStyle = {
    margin: "5px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  };

  const buttonPrimary = {
    padding: "8px 12px",
    margin: "5px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ffb6c1",
    color: "white",
    cursor: "pointer",
  };

  const buttonDanger = {
    ...buttonPrimary,
    backgroundColor: "#ff6b81",
  };

  const buttonUpdate = {
    ...buttonPrimary,
    backgroundColor: "#ffaec9",
  };

  const fetchProducts = () => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/products", form)
      .then(() => {
        alert("Produk berhasil ditambah!");
        setForm({ nama: "", harga: "", stok: "" });
        fetchProducts();
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        alert("Gagal tambah produk");
      });
  };

  const handleDelete = (id) => {
    api.delete(`/products/${id}`)
      .then(() => fetchProducts())
      .catch(() => alert("Gagal hapus"));
  };

  const handleUpdateStock = (id, stokBaru) => {
    api.put(`/products/${id}`, { stok: stokBaru })
      .then(() => {
        alert("Stok berhasil diupdate!");
        fetchProducts();
      })
      .catch(() => alert("Gagal update stok"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#ff69b4" }}>Admin Dashboard 🌸</h1>

      {/* FORM TAMBAH */}
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          placeholder="Nama Produk"
          value={form.nama}
          onChange={(e) =>
            setForm({ ...form, nama: e.target.value })
          }
        />

        <input
          style={inputStyle}
          placeholder="Harga"
          type="number"
          value={form.harga}
          onChange={(e) =>
            setForm({ ...form, harga: e.target.value })
          }
        />

        <input
          style={inputStyle}
          placeholder="Stok"
          type="number"
          value={form.stok}
          onChange={(e) =>
            setForm({ ...form, stok: e.target.value })
          }
        />

        <button style={buttonPrimary} type="submit">
          Tambah Produk
        </button>
      </form>

      {/* TABEL */}
      <table
        border="1"
        style={{
          marginTop: "20px",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ backgroundColor: "#ffe4ec" }}>
          <tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id_product}>
              <td>{p.nama}</td>
              <td>Rp {p.harga}</td>

              {/* STOK EDIT */}
              <td>
                <input
                  type="number"
                  defaultValue={p.stok}
                  onChange={(e) => {
                    p.stok = e.target.value;
                  }}
                  style={{ width: "60px", padding: "5px" }}
                />
              </td>

              <td>
                <button
                  style={buttonUpdate}
                  onClick={() =>
                    handleUpdateStock(p.id_product, p.stok)
                  }
                >
                  Update
                </button>

                <button
                  style={buttonDanger}
                  onClick={() => handleDelete(p.id_product)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}