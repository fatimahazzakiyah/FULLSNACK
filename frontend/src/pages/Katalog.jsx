import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

export default function Katalog({ onDeleteProduct }) {
  const [products, setProducts] = useState([]);
  const { token, user, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      return;
    }
    try {
      await api.post(
        "/cart",
        { id_product: product.id_product, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(`${product.nama} berhasil ditambahkan ke keranjang.`);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menambahkan ke keranjang.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#ff69b4" }}>
        Memuat produk...
      </div>
    );

  if (isError)
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Gagal memuat produk.
      </div>
    );

  return (
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh" }}>
      <nav className="navbar">
        <h2>FullSnack</h2>
        <div className="navbar-links">
          {user?.role !== "admin" && (
            <>
              <button className="nav-btn" onClick={() => navigate("/cart")}>
                Keranjang
              </button>
              <button className="nav-btn" onClick={() => navigate("/riwayat")}>
                Riwayat
              </button>
            </>
          )}
          <span className="nav-greeting">Halo, {user?.nama}</span>
          <button className="nav-btn-danger" onClick={handleLogout}>
            Keluar
          </button>
        </div>
      </nav>

      <div className="katalog-container">
        <h2 style={{ color: "#ff69b4", marginBottom: "20px" }}>
          Our Snack Collection
        </h2>
        <div className="katalog-grid">
          {products.map((p) => (
            <div key={p.id_product} className="product-card">
              {p.image && (
                <img
                  src={`http://localhost:3000/uploads/${p.image}`}
                  alt={p.nama}
                />
              )}
              <h3>{p.nama}</h3>
              <p>Rp {Number(p.harga || 0).toLocaleString("id-ID")}</p>
              <p
                style={{
                  color: "#aaa",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Stok: {p.stok}
              </p>
              <button className="btn-cart" onClick={() => addToCart(p)}>
                Tambah ke Keranjang
              </button>
              {user?.role === "admin" && (
                <button
                  className="btn-hapus"
                  onClick={() => onDeleteProduct(p.id_product)}
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
