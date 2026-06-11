import React, { useState } from "react";

const AddProductForm = ({ onAddProduct }) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");

  // === TUGAS ARRA: Buat state untuk menampung status error input form ===
  const [isNamaError, setIsNamaError] = useState(false);
  const [isHargaError, setIsHargaError] = useState(false);
  const [isStokError, setIsStokError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // handling submit agar form tidak reload saat tombol diklik

    // Reset status error setiap kali tombol disubmit ulang
    setIsNamaError(false);
    setIsHargaError(false);
    setIsStokError(false);

    // === TUGAS ARRA: Logic fungsi validasi pengecekan input kosong ===
    let errorTerjadi = false;

    if (nama === "") {
      setIsNamaError(true);
      errorTerjadi = true;
    }
    if (harga === "") {
      setIsHargaError(true);
      errorTerjadi = true;
    }
    if (stok === "") {
      setIsStokError(true);
      errorTerjadi = true;
    }

    // Jika ada salah satu input yang kosong, hentikan proses (jangan kirim ke database)
    if (errorTerjadi) return;

    // Mengirimkan objek snack baru ke fungsi App.jsx
    onAddProduct({ nama, harga: parseInt(harga), stok: parseInt(stok) });

    // Reset form field agar kosong kembali
    setNama("");
    setHarga("");
    setStok("");
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginBottom: "2rem",
        border: "1px solid #ffb6c1",
      }}
    >
      <h3 style={{ color: "#ff69b4", marginTop: 0 }}>➕ Tambah Snack Baru</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Nama Snack:
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: isNamaError ? "1px solid red" : "1px solid #ccc",
            }}
          />
          
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Harga (Rp):
          </label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: isHargaError ? "1px solid red" : "1px solid #ccc",
            }}
          />
          
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Stok Awal:
          </label>
          <input
            type="number"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: isStokError ? "1px solid red" : "1px solid #ccc",
            }}
          />
          
        </div>

        <button
          type="submit"
          style={{
            background: "#ff69b4",
            color: "white",
            border: "none",
            padding: "0.6rem 1.2rem",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Simpan Snack
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
