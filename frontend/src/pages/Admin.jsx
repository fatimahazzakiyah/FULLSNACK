import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api` });

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

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nama: "", harga: "", stok: "" });
  const [editFile, setEditFile] = useState(null);
  const [editFileName, setEditFileName] = useState("");

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
  const buttonEdit = {
    ...buttonPrimary,
    backgroundColor: "#ffd6e7",
    color: "#ff69b4",
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleEditFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setEditFile(selectedFile);
      setEditFileName(selectedFile.name);
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
        initialStok[p.id_product] = "";
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

  const handleRestock = (id) => {
    const tambahan = stokInput[id];
    if (!tambahan || Number(tambahan) <= 0) {
      alert("Masukkan jumlah stok yang ingin ditambahkan.");
      return;
    }
    api
      .put(
        `/products/${id}`,
        { stok: Number(tambahan) },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        alert(`Stok berhasil ditambah ${tambahan} pcs.`);
        setStokInput((prev) => ({ ...prev, [id]: "" }));
        fetchProducts();
      })
      .catch(() => alert("Gagal memperbarui stok."));
  };

  const handleEditClick = (p) => {
    setEditId(p.id_product);
    setEditForm({ nama: p.nama, harga: p.harga, stok: p.stok });
    setEditFile(null);
    setEditFileName("");
  };

  const handleEditSave = (id) => {
    const formData = new FormData();
    formData.append("nama", editForm.nama);
    formData.append("harga", editForm.harga);
    formData.append("stok", editForm.stok);
    if (editFile) formData.append("image", editFile);

    api
      .put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Produk berhasil diperbarui.");
        setEditId(null);
        fetchProducts();
      })
      .catch(() => alert("Gagal memperbarui produk."));
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
                placeholder="Stok Awal"
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
            Gagal memuat data.
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
                  <th style={{ padding: "15px" }}>Restock</th>
                  <th style={{ padding: "15px" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
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
                    <React.Fragment key={p.id_product}>
                      <tr style={{ borderBottom: "1px solid #fff0f5" }}>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {p.image ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL}/uploads/${p.image}`}
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
                          <span
                            style={{
                              fontWeight: "bold",
                              color: p.stok === 0 ? "red" : "#ff69b4",
                            }}
                          >
                            {p.stok} pcs
                          </span>
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                            }}
                          >
                            <input
                              type="number"
                              min="1"
                              placeholder="Jumlah..."
                              value={stokInput[p.id_product] || ""}
                              onChange={(e) =>
                                setStokInput((prev) => ({
                                  ...prev,
                                  [p.id_product]: e.target.value,
                                }))
                              }
                              style={{
                                width: "80px",
                                padding: "6px",
                                borderRadius: "6px",
                                border: "1px solid #ffb6c1",
                                textAlign: "center",
                              }}
                            />
                            <button
                              style={buttonUpdate}
                              onClick={() => handleRestock(p.id_product)}
                            >
                              Restock
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          <button
                            style={buttonEdit}
                            onClick={() => handleEditClick(p)}
                          >
                            Edit
                          </button>
                          <button
                            style={buttonDanger}
                            onClick={() => handleDelete(p.id_product)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>

                      {/* FORM EDIT */}
                      {editId === p.id_product && (
                        <tr style={{ backgroundColor: "#fff5f7" }}>
                          <td colSpan="6" style={{ padding: "20px" }}>
                            <h4
                              style={{ color: "#ff69b4", marginBottom: "12px" }}
                            >
                              Edit Produk: {p.nama}
                            </h4>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <input
                                  className="admin-input"
                                  placeholder="Nama Produk"
                                  value={editForm.nama}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      nama: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <input
                                  className="admin-input"
                                  placeholder="Harga"
                                  type="number"
                                  value={editForm.harga}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      harga: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <input
                                  className="admin-input"
                                  placeholder="Stok"
                                  type="number"
                                  value={editForm.stok}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      stok: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <label
                                  style={{
                                    ...buttonPrimary,
                                    padding: "10px 15px",
                                    display: "inline-block",
                                  }}
                                >
                                  Ganti Foto
                                  <input
                                    type="file"
                                    onChange={handleEditFileChange}
                                    style={{ display: "none" }}
                                    accept=".jpg,.jpeg,.png"
                                  />
                                </label>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "#999",
                                    marginTop: "4px",
                                  }}
                                >
                                  {editFileName ||
                                    "Biarkan kosong jika tidak ganti foto"}
                                </span>
                              </div>
                              <button
                                style={buttonUpdate}
                                onClick={() => handleEditSave(p.id_product)}
                              >
                                Simpan
                              </button>
                              <button
                                style={buttonDanger}
                                onClick={() => setEditId(null)}
                              >
                                Batal
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
