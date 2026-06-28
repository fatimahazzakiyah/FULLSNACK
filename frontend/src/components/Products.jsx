import React from "react";
import ProductCard from "./ProductCard";

const Products = ({ productsList, onDeleteProduct }) => {
  return (
    <div>
      <h2 style={{ marginBottom: "1rem", color: "#333" }}>
        Katalog Menu Toko FULLSNACK
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {productsList.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
