import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Katalog from "./pages/Katalog";
import Keranjang from "./pages/Keranjang";
import Riwayat from "./pages/Riwayat";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  console.log("USER APP:", user);

  const [catalogRefreshKey, setCatalogRefreshKey] = useState(0);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Fungsi Logout membersihkan user dan token
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  // Tombol hapus produk
  const handleDeleteProduct = async (idProduct) => {
    const isConfirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus produk ini?",
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/products/${idProduct}`);

      alert("Produk berhasil dihapus!");

      setCatalogRefreshKey((previousKey) => previousKey + 1);
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Gagal menghapus produk dari database.");
    }
  };

  return (
    <Routes>
      {/* LOGIN: Diubah agar menyimpan user sekaligus token dari backend */}
      <Route
        path="/login"
        element={
          <Login
            onLogin={(data) => {
              if (data.token) {
                localStorage.setItem("token", data.token);
              }
              setUser(data.user || data);
            }}
          />
        }
      />

      {/* REGISTER */}
      <Route path="/register" element={<Register />} />

      {/* HALAMAN UTAMA */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              {user?.role === "admin" ? (
                <Admin />
              ) : (
                <Katalog
                  key={catalogRefreshKey}
                  onDeleteProduct={handleDeleteProduct}
                />
              )}
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* KATALOG */}
      <Route
        path="/katalog"
        element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <Katalog
                key={catalogRefreshKey}
                onDeleteProduct={handleDeleteProduct}
              />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* KERANJANG */}
      <Route
        path="/keranjang"
        element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <Keranjang />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* RIWAYAT */}
      <Route
        path="/riwayat"
        element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <Riwayat user={user} />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
