import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [], onAdd, renderActions }) => {
  const list = Array.isArray(products) ? products : [];

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
