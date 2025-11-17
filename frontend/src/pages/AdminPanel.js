import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList"; // If you still need it elsewhere
import { getProducts, deleteProduct } from "../services/productService";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {/* Product Form */}
        <ProductForm onAdded={loadProducts} />

        {/* Product List */}
        <div>
          <h3 style={{ marginBottom: 10 }}>Products</h3>

          <div className="grid">
            {products.map((p) => (
              <div key={p._id} className="order-card">
                <img
                  src={p.image || "/assets/placeholder.jpg"}
                  alt={p.name}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    objectFit: "cover",
                    height: 180,
                  }}
                />

                <h4>{p.name}</h4>
                <p>₹{p.price}</p>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn small"
                    onClick={() => window.alert("Edit UI not implemented yet")}
                  >
                    Edit
                  </button>

                  <button
                    className="btn small"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;