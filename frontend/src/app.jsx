import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import AddProductForm from "./components/AddProductForm";
import Products from "./components/Products";
import Footer from "./components/Footer";

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

      const response = await axios.get(
        "http://localhost:3000/api/products"
      );

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
      <Navbar />

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
        {/* Form Tambah Produk */}
<AddProductForm onAddProduct={handleAddProduct} />

        {/* Kondisi Loading */}
        {isLoading && (
          <p
            style={{
              textAlign: "center",
              color: "#ff69b4",
              fontWeight: "bold",
            }}
          >
            Sedang memuat produk snack...
          </p>
        )}

        {/* Kondisi Error */}
        {isError && (
          <p
            style={{
              textAlign: "center",
              color: "#e74c3c",
              fontWeight: "bold",
            }}
          >
            Gagal memuat data. Pastikan Server Backend sudah dinyalakan!
          </p>
        )}

        {/* Produk hanya tampil kalau tidak loading */}
        {!isLoading && !isError && (
          <Products productsList={products} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;