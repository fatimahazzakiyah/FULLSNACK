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
  // Ambil data user dari localStorage saat aplikasi pertama kali dibuka
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  console.log("USER APP:", user);

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
    localStorage.removeItem("token");
    setUser(null);
  };

  // Tombol hapus produk
  const handleDeleteProduct = async (idProduct) => {
    const isConfirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus produk ini?"
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/products/${idProduct}`
      );

      alert("Produk berhasil dihapus!");

      setCatalogRefreshKey(
        (previousKey) => previousKey + 1
      );
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Gagal menghapus produk dari database.");
    }
  };

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <Login
            onLogin={(data) => {
              setUser(data);
            }}
          />
        }
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

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
            <Layout
              user={user}
              onLogout={handleLogout}
            >
              <Katalog
                key={catalogRefreshKey}
                onDeleteProduct={
                  handleDeleteProduct
                }
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
            <Layout
              user={user}
              onLogout={handleLogout}
            >
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
            <Layout
              user={user}
              onLogout={handleLogout}
            >
              <Riwayat user={user} />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Jika URL tidak ditemukan */}
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;