import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div style={{ 
      border: '1px solid #ffb6c1', 
      borderRadius: '8px', 
      padding: '1rem', 
      background: '#ffffff', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
      textAlign: 'center' 
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🍿</div>

      <h4 style={{ 
        margin: '0 0 0.5rem 0', 
        color: '#333', 
        fontSize: '1.2rem' 
      }}>
        {product.nama}
      </h4>

      <p style={{ 
        margin: '0 0 0.5rem 0', 
        color: '#ff69b4', 
        fontWeight: 'bold' 
      }}>
        Rp {product.harga.toLocaleString()}
      </p>

      <p style={{ 
        margin: 0, 
        fontSize: '14px', 
        color: '#7f8c8d' 
      }}>
        Sisa Stok: {product.stok} pcs
      </p>
    </div>
  );
};

export default ProductCard;