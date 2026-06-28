import React, { useState, useContext } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Katalog from "./pages/Katalog";
import Keranjang from "./pages/Keranjang";
import Riwayat from "./pages/Riwayat";
import Admin from "./pages/Admin";

function App() {
  const { token, user } = useContext(AuthContext);
  const [catalogRefreshKey, setCatalogRefreshKey] = useState(0);

  const handleDeleteProduct = async (idProduct) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus produk ini?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/api/products/${idProduct}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Produk berhasil dihapus.");
      setCatalogRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Gagal menghapus produk.");
    }
  };

  // Komponen untuk proteksi route berdasarkan role
  const AdminRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" />;
    if (user?.role !== "admin") return <Navigate to="/" />;
    return children;
  };

  const UserRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" />;
    if (user?.role !== "user") return <Navigate to="/admin" />;
    return children;
  };

  const HomeRoute = () => {
    if (!token) return <Navigate to="/login" />;
    if (user?.role === "admin") return <Navigate to="/admin" />;
    return (
      <Katalog onDeleteProduct={handleDeleteProduct} key={catalogRefreshKey} />
    );
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomeRoute />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <UserRoute>
            <Keranjang />
          </UserRoute>
        }
      />
      <Route
        path="/riwayat"
        element={
          <UserRoute>
            <Riwayat />
          </UserRoute>
        }
      />
    </Routes>
  );
}

export default App;
