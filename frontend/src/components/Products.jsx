import React from 'react';
import ProductCard from './ProductCard'; // Sekarang aman karena filenya udah lo bikin!

// 🌟 DI SINI: Tambahin props onDeleteProduct yang dikirim dari App.jsx
const Products = ({ productsList, onDeleteProduct }) => {
  return (
    <div>
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>🍪 Katalog Menu Toko FULLSNACK</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {productsList.map((product, index) => (
          // 🌟 DI SINI: Tambahin onDelete={onDeleteProduct} biar tombol di ProductCard bisa jalan!
          <ProductCard key={index} product={product} onDelete={onDeleteProduct} />
        ))}
      </div>
    </div>
  );
};

export default Products;