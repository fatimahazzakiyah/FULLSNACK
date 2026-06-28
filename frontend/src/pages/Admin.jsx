import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

export default function Admin() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ nama: "", harga: "", stok: "" });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNamaError, setIsNamaError] = useState(false);
  const [isHargaError, setIsHargaError] = useState(false);
  const [isStokError, setIsStokError] = useState(false);
  const [stokInput, setStokInput] = useState({});

  const buttonPrimary = {
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ffb6c1",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  };

  const buttonDanger = { ...buttonPrimary, backgroundColor: "#ff6b81" };
  const buttonUpdate = { ...buttonPrimary, backgroundColor: "#ffaec9" };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await api.get("/products");
      setProducts(response.data);
      const initialStok = {};
      response.data.forEach((p) => {
        initialStok[p.id_product] = p.stok;
      });
      setStokInput(initialStok);
    } catch (error) {
      console.error("Gagal ambil data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsNamaError(false);
    setIsHargaError(false);
    setIsStokError(false);

    let hasError = false;
    if (form.nama.trim() === "") {
      setIsNamaError(true);
      hasError = true;
    }
    if (form.harga === "") {
      setIsHargaError(true);
      hasError = true;
    }
    if (form.stok === "") {
      setIsStokError(true);
      hasError = true;
    }
    if (hasError) return;

    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("harga", form.harga);
    formData.append("stok", form.stok);
    formData.append("deskripsi", "-");
    if (file) formData.append("image", file);

    api
      .post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Produk berhasil ditambahkan.");
        setForm({ nama: "", harga: "", stok: "" });
        setFile(null);
        setFileName("");
        fetchProducts();
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Gagal menambahkan produk.");
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
    api
      .delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Produk berhasil dihapus.");
        fetchProducts();
      })
      .catch(() => alert("Gagal menghapus produk."));
  };

  const handleUpdateStock = (id) => {
    const stokBaru = stokInput[id];
    if (stokBaru === undefined || stokBaru === "") {
      alert("Stok tidak boleh kosong.");
      return;
    }
    api
      .put(
        `/products/${id}`,
        { stok: Number(stokBaru) },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        alert("Stok berhasil diperbarui.");
        fetchProducts();
      })
      .catch(() => alert("Gagal memperbarui stok."));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh" }}>
      <nav className="navbar">
        <h2>FullSnack - Admin</h2>
        <div className="navbar-links">
          <span className="nav-greeting">Halo, {user?.nama}</span>
          <button className="nav-btn-danger" onClick={handleLogout}>
            Keluar
          </button>
        </div>
      </nav>

      <div style={{ padding: "30px" }}>
        <h1
          style={{
            color: "#ff69b4",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Dashboard Admin
        </h1>

        {/* FORM TAMBAH PRODUK */}
        <div className="admin-form-box">
          <h3 style={{ color: "#ff69b4", marginTop: 0, marginBottom: "16px" }}>
            Tambah Produk Baru
          </h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="admin-input"
                style={{
                  border: isNamaError ? "1px solid red" : "1px solid #ffb6c1",
                }}
                placeholder="Nama Produk"
                value={form.nama}
                onChange={(e) => {
                  setForm({ ...form, nama: e.target.value });
                  if (e.target.value.trim() !== "") setIsNamaError(false);
                }}
              />
              {isNamaError && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    margin: "2px 0 0 5px",
                  }}
                >
                  Nama produk wajib diisi.
                </p>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="admin-input"
                style={{
                  border: isHargaError ? "1px solid red" : "1px solid #ffb6c1",
                }}
                placeholder="Harga"
                type="number"
                value={form.harga}
                onChange={(e) => {
                  setForm({ ...form, harga: e.target.value });
                  if (e.target.value !== "") setIsHargaError(false);
                }}
              />
              {isHargaError && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    margin: "2px 0 0 5px",
                  }}
                >
                  Harga wajib diisi.
                </p>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="admin-input"
                style={{
                  border: isStokError ? "1px solid red" : "1px solid #ffb6c1",
                }}
                placeholder="Stok"
                type="number"
                value={form.stok}
                onChange={(e) => {
                  setForm({ ...form, stok: e.target.value });
                  if (e.target.value !== "") setIsStokError(false);
                }}
              />
              {isStokError && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    margin: "2px 0 0 5px",
                  }}
                >
                  Stok wajib diisi.
                </p>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  ...buttonPrimary,
                  padding: "10px 15px",
                  display: "inline-block",
                  margin: "5px",
                }}
              >
                Upload Gambar
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept=".jpg,.jpeg,.png"
                />
              </label>
              <span
                style={{ fontSize: "12px", color: "#999", marginLeft: "5px" }}
              >
                {fileName || "Belum ada file dipilih"}
              </span>
            </div>

            <button
              style={{ ...buttonPrimary, alignSelf: "flex-start" }}
              type="submit"
            >
              Tambah Produk
            </button>
          </form>
        </div>

        {/* LOADING / ERROR */}
        {isLoading && (
          <p
            style={{
              textAlign: "center",
              color: "#ff69b4",
              fontWeight: "bold",
            }}
          >
            Memuat data produk...
          </p>
        )}
        {isError && (
          <p
            style={{
              textAlign: "center",
              color: "#e74c3c",
              fontWeight: "bold",
            }}
          >
            Gagal memuat data. Pastikan server backend sudah berjalan.
          </p>
        )}

        {/* TABEL PRODUK */}
        {!isLoading && !isError && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
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
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#aaa",
                      }}
                    >
                      Belum ada produk. Tambahkan produk di atas.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr
                      key={p.id_product}
                      style={{ borderBottom: "1px solid #fff0f5" }}
                    >
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        {p.image ? (
                          <img
                            src={`http://localhost:3000/uploads/${p.image}`}
                            alt={p.nama}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                        ) : (
                          <span style={{ color: "#ccc", fontSize: "12px" }}>
                            Tidak ada gambar
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        {p.nama}
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        Rp {Number(p.harga).toLocaleString("id-ID")}
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <input
                          type="number"
                          value={stokInput[p.id_product] ?? p.stok}
                          onChange={(e) =>
                            setStokInput((prev) => ({
                              ...prev,
                              [p.id_product]: e.target.value,
                            }))
                          }
                          style={{
                            width: "70px",
                            padding: "6px",
                            borderRadius: "6px",
                            border: "1px solid #ffb6c1",
                            textAlign: "center",
                          }}
                        />
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <button
                          style={buttonUpdate}
                          onClick={() => handleUpdateStock(p.id_product)}
                        >
                          Update Stok
                        </button>
                        <button
                          style={buttonDanger}
                          onClick={() => handleDelete(p.id_product)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
