import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Katalog from "./pages/Katalog";
import Keranjang from "./pages/Keranjang";
import Riwayat from "./pages/Riwayat";
import Footer from "./components/Footer";

function App() {
  // Ambil data user dari localStorage saat aplikasi pertama kali dibuka
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activePage, setActivePage] = useState("katalog");

  // Dipakai untuk memuat ulang katalog setelah produk berhasil dihapus
  const [catalogRefreshKey, setCatalogRefreshKey] = useState(0);

  // Simpan user ke localStorage setelah login
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setActivePage("katalog");
  };

  // Tombol hapus buatan Tiya, dirapikan kembali saat proses final merge
  const handleDeleteProduct = async (idProduct) => {
    const isConfirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus snack manis ini? 🥺"
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/products/${idProduct}`
      );

      alert("Snack berhasil dihapus dari database! ✨");

      // Disesuaikan Maulidya agar katalog mengambil ulang data terbaru
      setCatalogRefreshKey((previousKey) => previousKey + 1);
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Gagal menghapus produk dari database.");
    }
  };

  if (!user) {
    return <Login onLogin={(data) => setUser(data)} />;
  }

  return (
    <div>
      <nav
        style={{
          background: "#ffe4ec",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <b style={{ color: "#ff69b4", fontSize: "20px" }}>
          FullSnack 🍿
        </b>

        <div>
          {user.role === "user" ? (
            <>
              <span
                onClick={() => setActivePage("katalog")}
                style={{
                  marginRight: "15px",
                  cursor: "pointer",
                  color: "#ff69b4",
                  fontWeight:
                    activePage === "katalog" ? "bold" : "normal",
                  borderBottom:
                    activePage === "katalog"
                      ? "2px solid #ff69b4"
                      : "none",
                }}
              >
                Katalog
              </span>

              <span
                onClick={() => setActivePage("keranjang")}
                style={{
                  marginRight: "15px",
                  cursor: "pointer",
                  color: "#ff69b4",
                  fontWeight:
                    activePage === "keranjang" ? "bold" : "normal",
                  borderBottom:
                    activePage === "keranjang"
                      ? "2px solid #ff69b4"
                      : "none",
                }}
              >
                Keranjang 🛒
              </span>

              <span
                onClick={() => setActivePage("riwayat")}
                style={{
                  marginRight: "15px",
                  cursor: "pointer",
                  color: "#ff69b4",
                  fontWeight:
                    activePage === "riwayat" ? "bold" : "normal",
                  borderBottom:
                    activePage === "riwayat"
                      ? "2px solid #ff69b4"
                      : "none",
                }}
              >
                Riwayat 📋
              </span>
            </>
          ) : (
            <span
              style={{
                marginRight: "15px",
                fontWeight: "bold",
                color: "#ff69b4",
              }}
            >
              Dashboard Admin ⚙️
            </span>
          )}

          <button
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              backgroundColor: "#ff69b4",
              color: "white",
            }}
          >
            Keluar
          </button>
        </div>
      </nav>

      <main style={{ padding: "20px" }}>
        {user.role === "admin" ? (
          <Admin />
        ) : (
          <>
            {activePage === "katalog" && (
              <Katalog
                key={catalogRefreshKey}
                onDeleteProduct={handleDeleteProduct}
              />
            )}

            {activePage === "keranjang" && <Keranjang />}

            {activePage === "riwayat" && <Riwayat user={user} />}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;