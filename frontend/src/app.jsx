import React, { useState, useEffect } from "react";
import axios from "axios";
// Import Routes dan Route untuk mengatur perpindahan halaman
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProductForm from "./components/AddProductForm";
import Products from "./components/Products";
import Footer from "./components/Footer";

// IMPORT AUTHPROVIDER YANG BARUSAN KAMU BUAT
import { AuthProvider } from "./context/AuthContext";

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
    Halaman Login (Tugas Aura)
  </div>
);
const RegisterPlaceholder = () => (
  <div style={{ padding: "3rem", textAlign: "center", fontWeight: "bold" }}>
    Halaman Register (Tugas Tiya)
  </div>
);

function App() {
  const [products, setProducts] = useState([]);

  // State Loading & Error
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch Products API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);

      setIsLoading(false);
    } catch (error) {
      console.error("Gagal memuat data produk:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      // Kirim data snack baru ke backend API
      await axios.post("http://localhost:3000/api/products", newProduct);

      // Refresh data produk otomatis
      fetchProducts();

      alert("Snack baru berhasil tersimpan ke database MySQL");
    } catch (error) {
      console.error("Gagal menyimpan snack baru:", error);
      alert("Gagal menambahkan snack. Cek koneksi API!");
    }
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
      {/* BUNGKUS SELURUH KOMPONEN DI DALAM AUTHPROVIDER UNTUK GLOBAL STATE */}
      <AuthProvider>
        {/* Layout Global (Navbar & Footer selalu muncul di setiap rute) */}
        <Navbar />

        {/* Sistem Navigasi Antar Halaman */}
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
      </AuthProvider>
    </div>
  );
}

export default App;
