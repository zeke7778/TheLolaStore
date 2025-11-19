import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [], onAdd }) => {
  const list = Array.isArray(products) ? products : [];

  if (!Array.isArray(products)) {
    console.warn("ProductList expected an array but received:", products);
  }

  return (
    <div className="grid">
      {list.map((p) => (
        <ProductCard key={p._id} p={p} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default ProductList;

