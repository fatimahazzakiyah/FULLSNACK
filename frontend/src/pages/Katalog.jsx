import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api` });

export default function Katalog({ onDeleteProduct }) {
  const [products, setProducts] = useState([]);
  const { token, user, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    // eslint-disable-next-line
  }, [token]);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
      const initialQty = {};
      response.data.forEach((p) => {
        initialQty[p.id_product] = 1;
      });
      setQuantities(initialQty);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleQtyChange = (id_product, value, stok) => {
    const val = Math.max(1, Math.min(Number(value), stok));
    setQuantities((prev) => ({ ...prev, [id_product]: val }));
  };

  const addToCart = async (product) => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      return;
    }
    const qty = quantities[product.id_product] || 1;
    if (qty > product.stok) {
      alert(`Stok tidak cukup. Stok tersedia: ${product.stok}`);
      return;
    }
    try {
      await api.post(
        "/cart",
        { id_product: product.id_product, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(`${product.nama} (x${qty}) berhasil ditambahkan ke keranjang.`);
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
                  src={`${process.env.REACT_APP_API_URL}/uploads/${p.image}`}
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

              {/* QUANTITY SELECTOR */}
              {user?.role !== "admin" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    margin: "6px 0",
                  }}
                >
                  <button
                    onClick={() =>
                      handleQtyChange(
                        p.id_product,
                        (quantities[p.id_product] || 1) - 1,
                        p.stok,
                      )
                    }
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #ffb6c1",
                      backgroundColor: "white",
                      color: "#ff69b4",
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#ff69b4",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {quantities[p.id_product] || 1}
                  </span>
                  <button
                    onClick={() =>
                      handleQtyChange(
                        p.id_product,
                        (quantities[p.id_product] || 1) + 1,
                        p.stok,
                      )
                    }
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #ffb6c1",
                      backgroundColor: "white",
                      color: "#ff69b4",
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>
              )}

              <button
                className="btn-cart"
                onClick={() => addToCart(p)}
                disabled={p.stok === 0}
                style={{ opacity: p.stok === 0 ? 0.5 : 1 }}
              >
                {p.stok === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
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
