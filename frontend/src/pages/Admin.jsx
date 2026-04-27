import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ nama_produk: "", harga: "", stok: "" });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // ⭐ TAMBAHAN

  // 🌸 STYLE (Pink Pastel Theme)
  const inputStyle = {
    margin: "5px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ffb6c1",
    outline: "none",
  };

  const buttonPrimary = {
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ffb6c1",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const buttonDanger = {
    ...buttonPrimary,
    backgroundColor: "#ff6b81",
  };

  const buttonUpdate = {
    ...buttonPrimary,
    backgroundColor: "#ffaec9",
  };

  // ⭐ HANDLE FILE
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // 1. FUNGSI AMBIL DATA
  const fetchProducts = () => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Gagal ambil data:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. FUNGSI TAMBAH PRODUK
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_produk", form.nama_produk);
    formData.append("harga", form.harga);
    formData.append("stok", form.stok);
    formData.append("deskripsi", "-");
    formData.append("image", file);

    axios.post("http://localhost:3000/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        alert("Produk berhasil ditambah!");
        setForm({ nama_produk: "", harga: "", stok: "" });
        setFile(null);
        setFileName("");
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal tambah produk!");
      });
  };

  // 3. DELETE
  const handleDelete = (id) => {
    if (window.confirm("Yakin mau hapus produk ini?")) {
      api.delete(`/products/${id}`)
        .then(() => {
          alert("Produk berhasil dihapus!");
          fetchProducts();
        })
        .catch(() => alert("Gagal hapus!"));
    }
  };

  // 4. UPDATE STOK
  const handleUpdateStock = (id, stokBaru) => {
    api.put(`/products/${id}`, { stok: Number(stokBaru) })
      .then(() => {
        alert("Stok diperbarui! ✅");
        fetchProducts();
      })
      .catch(() => alert("Gagal update stok!"));
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#ff69b4", textAlign: "center" }}>Admin Dashboard ⚙️</h1>

      {/* FORM */}
      <div style={{ backgroundColor: "#fff5f7", padding: "20px", borderRadius: "15px", marginBottom: "30px" }}>
        <h3 style={{ color: "#ff69b4", marginTop: "0" }}>Tambah Menu Baru</h3>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>

          <input 
            style={inputStyle}
            placeholder="Nama Produk"
            value={form.nama_produk}
            onChange={(e) => setForm({ ...form, nama_produk: e.target.value })}
            required
          />

          <input
            style={inputStyle}
            placeholder="Harga"
            type="number"
            value={form.harga}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
            required
          />

          <input
            style={inputStyle}
            placeholder="Stok"
            type="number"
            value={form.stok}
            onChange={(e) => setForm({ ...form, stok: e.target.value })}
            required
          />

          {/* ⭐ BUTTON UPLOAD CANTIK */}
          <label style={{
            ...buttonPrimary,
            padding: "10px 15px",
          }}>
            Upload Gambar
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          {/* ⭐ NAMA FILE */}
          <span style={{ fontSize: "12px", color: "#999" }}>
            {fileName || "Belum pilih file"}
          </span>

          <button style={buttonPrimary} type="submit">
            Tambah Produk
          </button>

        </form>
      </div>

      {/* TABEL */}
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "10px", overflow: "hidden" }}>
        <thead style={{ backgroundColor: "#ffe4ec", color: "#ff69b4" }}>
          <tr>
            <th style={{ padding: "15px" }}>Gambar</th>
            <th style={{ padding: "15px" }}>Nama Produk</th>
            <th style={{ padding: "15px" }}>Harga</th>
            <th style={{ padding: "15px" }}>Stok</th>
            <th style={{ padding: "15px" }}>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id_product}>
              <td style={{ padding: "10px" }}>
                {p.image && (
                  <img
                    src={`http://localhost:3000/uploads/${p.image}`}
                    alt={p.nama}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />
                )}
              </td>

              <td>{p.nama}</td>
              <td>Rp {p.harga}</td>

              <td>
                <input
                  type="number"
                  defaultValue={p.stok}
                  onChange={(e) => (p.stok_input = e.target.value)}
                  style={{ width: "60px" }}
                />
              </td>

              <td>
                <button
                  style={buttonUpdate}
                  onClick={() => handleUpdateStock(p.id_product, p.stok_input || p.stok)}
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