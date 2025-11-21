import React from "react";
import { Link } from "react-router-dom";

const AdminProductCard = ({ p, onDelete }) => {
  const imageURL = p.image?.startsWith("http")
    ? p.image
    : `${process.env.REACT_APP_IMAGE_URL}/${p.image}`;

  return (
    <div className="card">
      <img src={imageURL} alt={p.name} />

      <h3>{p.name}</h3>
      <p className="price">₹{p.price}</p>
      <p className="muted">{p.category}</p>

      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        <Link to={`/admin/edit-product/${p._id}`} className="btn small">
          Edit
        </Link>

        <button
          className="btn small danger"
          onClick={() => onDelete(p._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;
