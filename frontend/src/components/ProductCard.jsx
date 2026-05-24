import React from "react";

// 🌸 SAKLEK SESUAI PRINTAH TUGAS TIYA (3)
const ProductCard = ({ product, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ffb6c1', borderRadius: '8px', padding: '1rem', background: '#ffffff', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem' }}>🍿</div>
      <h4>{product.nama}</h4>
      <p style={{ color: '#ff69b4', fontWeight: 'bold' }}>
        Rp {product.harga ? product.harga.toLocaleString() : 0}
      </p>
      <p>Stok: {product.stok} pcs</p>
      
      {/* Tombol Hapus buatan Tiya (Udah disesuaikan ke id_product database kelompok lo) */}
      <button 
        onClick={() => onDelete(product.id_product)} 
        style={{ marginTop: '0.5rem', background: '#e74c3c', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
      >
        🗑️ Hapus Snack
      </button>
    </div>
  );
};

export default ProductCard;