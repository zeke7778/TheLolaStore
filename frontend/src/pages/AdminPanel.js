import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/productService";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();   // <-- FIXED

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
      loadProducts(); // refresh
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
        {/* Product Creation Form */}
        <ProductForm onAdded={loadProducts} />

        {/* Product List */}
        <div>
          <h3 style={{ marginBottom: 10 }}>Products</h3>

          <ProductList
            products={products}
            onAdd={() => {}} // unnecessary for admin
            renderActions={(p) => (
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn small"
                  onClick={() => navigate(`/admin/products/${p._id}/edit`)}
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
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

