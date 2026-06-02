import React, { useState, useEffect } from "react";
import axios from "axios";
// 1. Import Routes dan Route untuk mengatur perpindahan halaman
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProductForm from "./components/AddProductForm";
import Products from "./components/Products";
import Footer from "./components/Footer";

// --- HALAMAN UTAMA / DASHBOARD TOKO (Menggunakan komponen asli kamu) ---
const DashboardPage = ({ products, handleAddProduct }) => {
  return (
    <main
      style={{
        flex: 1,
        maxWidth: "800px",
        width: "100%",
        margin: "2rem auto",
        padding: "0 1rem",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#ff69b4",
          marginBottom: "2rem",
        }}
      >
        FULLSNACK DASHBOARD (LIVE API)
      </h2>

      {/* Form Tambah Produk */}
      <AddProductForm onAddProduct={handleAddProduct} />

      {/* List Tampilan Produk */}
      <Products productsList={products} />
    </main>
  );
};

// --- PLACEHOLDER HALAMAN SEMENTARA UNTUK ANGGOTA LAIN ---
const LoginPlaceholder = () => (
  <div style={{ padding: "3rem", textAlign: "center", fontWeight: "bold" }}>
    🔑 Halaman Login (Tugas Aura)
  </div>
);
const RegisterPlaceholder = () => (
  <div style={{ padding: "3rem", textAlign: "center", fontWeight: "bold" }}>
    📝 Halaman Register (Tugas Tiya)
  </div>
);

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Gagal memuat data produk dari backend:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#fff0f5",
        fontFamily: "sans-serif",
      }}
    >
      {/* Layout Global (Navbar & Footer selalu muncul di setiap rute) */}
      <Navbar />

      {/* 2. Sistem Navigasi Antar Halaman */}
      <Routes>
        {/* Jalur ke halaman utama dashboard */}
        <Route
          path="/"
          element={
            <DashboardPage
              products={products}
              handleAddProduct={handleAddProduct}
            />
          }
        />
        {/* Jalur ke halaman login & register */}
        <Route path="/login" element={<LoginPlaceholder />} />
        <Route path="/register" element={<RegisterPlaceholder />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
