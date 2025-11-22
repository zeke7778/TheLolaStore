import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [], onAdd, renderActions }) => {
  const list = Array.isArray(products) ? products : [];

   if (list.length === 0) {
    return <p style={{ textAlign: "center", color: "#999" }}>No products found.</p>;
  }
  
  return (
    <div className="grid">
      {list.map((p) => (
        <ProductCard
          key={p._id}
          p={p}
          onAdd={onAdd}
          renderActions={renderActions}
        />
      ))}
    </div>
  );
};

export default ProductList;
