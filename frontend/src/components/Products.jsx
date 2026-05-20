import React from 'react';
import ProductCard from './ProductCard'; // Komponen satuan milik Maulidya

const Products = ({ productsList }) => {
  return (
    <div>
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>🍪 Katalog Menu Toko FULLSNACK</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {productsList.map((product, index) => (
          // Melakukan looping (.map) dan melempar data ke ProductCard milik Maulidya
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;