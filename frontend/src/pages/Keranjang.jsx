import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Keranjang() {
  const [cartItems, setCartItems] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [totalBayar, setTotalBayar] = useState(0);
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL + "/api";

  const fetchCart = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Gagal memuat keranjang:", err);
    }
  }, [token, API]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemove = async (id_cart) => {
    try {
      await axios.delete(`${API}/cart/${id_cart}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      alert("Gagal menghapus item.");
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong.");
      return;
    }
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.harga) * item.quantity,
      0,
    );
    try {
      await axios.post(
        `${API}/cart/checkout`,
        { total_harga: total, alamat: "Alamat pengguna" },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTotalBayar(total);
      setIsSuccess(true);
      setCartItems([]);
    } catch (err) {
      alert("Gagal checkout.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!token)
    return (
      <div className="auth-container">
        <h2 style={{ color: "#ff69b4" }}>Silakan login terlebih dahulu.</h2>
      </div>
    );

  if (isSuccess)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          backgroundColor: "#fff0f5",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ color: "#ff69b4" }}>Pesanan Berhasil</h1>
        <h2 style={{ marginTop: "12px" }}>
          Total: Rp {totalBayar.toLocaleString("id-ID")}
        </h2>
        <button
          className="nav-btn"
          onClick={() => navigate("/")}
          style={{
            marginTop: "24px",
            backgroundColor: "#ffb6c1",
            color: "white",
          }}
        >
          Kembali ke Katalog
        </button>
      </div>
    );

  return (
    <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh" }}>
      <nav className="navbar">
        <h2>FullSnack</h2>
        <div className="navbar-links">
          <button className="nav-btn" onClick={() => navigate("/")}>
            Katalog
          </button>
          <button className="nav-btn" onClick={() => navigate("/riwayat")}>
            Riwayat
          </button>
          <span className="nav-greeting">Halo, {user?.nama}</span>
          <button className="nav-btn-danger" onClick={handleLogout}>
            Keluar
          </button>
        </div>
      </nav>

      <div className="keranjang-container">
        <h2
          style={{
            color: "#ff69b4",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Keranjang Belanja
        </h2>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            Keranjang kamu masih kosong.
          </p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id_cart} className="cart-item">
              <span style={{ fontWeight: "500" }}>
                {item.nama}{" "}
                <span style={{ color: "#aaa" }}>(x{item.quantity})</span>
              </span>
              <span style={{ color: "#ff69b4", fontWeight: "bold" }}>
                Rp{" "}
                {(Number(item.harga) * item.quantity).toLocaleString("id-ID")}
              </span>
              <button
                onClick={() => handleRemove(item.id_cart)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <button className="btn-checkout" onClick={handleCheckout}>
            Checkout Sekarang
          </button>
        )}
      </div>
    </div>
  );
}
