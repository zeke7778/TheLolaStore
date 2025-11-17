import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [], onAdd }) => {
  return (
    <div className="grid">
      {products.map((p) => <ProductCard key={p._id} p={p} onAdd={onAdd} />)}
    </div>
  );
};

export default ProductList;