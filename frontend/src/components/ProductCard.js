import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ p, onAdd, renderActions }) => {
  const imageURL = p.image?.startsWith("http")
    ? p.image
    : `${process.env.REACT_APP_IMAGE_URL}/${p.image}`;

  return (
    <div className="card">
      <Link to={`/product/${p._id}`}>
        <img src={imageURL} alt={p.name} />
      </Link>

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
        {/* If admin gave custom actions → show them */}
        {renderActions ? (
          renderActions(p)
        ) : (
          <>
            {/* Normal user buttons */}
            <button className="btn small" onClick={() => onAdd(p)}>
              Add
            </button>

            <Link to={`/product/${p._id}`} className="btn small secondary">
              View
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;



