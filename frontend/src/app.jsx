import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import AddProductForm from "./components/AddProductForm";
import Products from "./components/Products";
import Footer from "./components/Footer";

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
          {" "}
          FULLSNACK DASHBOARD (LIVE API)
        </h2>

        {/* Form Tambah Produk */}
        <AddProductForm onAddProduct={handleAddProduct} />

        {/* List Tampilan Produk yang datanya sudah diambil dari database oleh */}
        <Products productsList={products} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
