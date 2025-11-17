import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProductById(id);
        setP(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (!p) return <div>Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={p.image || "/assets/placeholder.jpg"} alt={p.name} />
      </div>
      <div className="product-info">
        <h2>{p.name}</h2>
        <div className="category">{p.category}</div>
        <div className="price">₹{p.price}</div>
        <p className="description">{p.description}</p>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
