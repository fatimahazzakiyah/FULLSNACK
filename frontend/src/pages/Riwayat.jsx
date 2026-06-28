import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Riwayat() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Gagal memuat riwayat:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#ff69b4" }}>
        Memuat riwayat...
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
          <button className="nav-btn" onClick={() => navigate("/cart")}>
            Keranjang
          </button>
          <span className="nav-greeting">Halo, {user?.nama}</span>
          <button className="nav-btn-danger" onClick={handleLogout}>
            Keluar
          </button>
        </div>
      </nav>

      <div className="riwayat-container">
        <h2
          style={{
            color: "#ff85a2",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Riwayat Belanja
        </h2>
        {orders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            Belum ada riwayat pesanan.
          </p>
        ) : (
          orders.map((item) => (
            <div key={item.id_order} className="order-card">
              <p
                style={{
                  fontWeight: "bold",
                  color: "#ff69b4",
                  marginBottom: "6px",
                }}
              >
                Order #{item.id_order}
              </p>
              <p style={{ marginBottom: "4px" }}>
                Total: Rp {Number(item.total_harga).toLocaleString("id-ID")}
              </p>
              <p
                style={{ color: "#888", fontSize: "13px", marginBottom: "4px" }}
              >
                Status: {item.status}
              </p>
              {item.created_at && (
                <p style={{ color: "#aaa", fontSize: "12px" }}>
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
