// src/components/OrderCard.js
import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  const created = new Date(order.createdAt).toLocaleString();

  return (
    <div className="order-card">
      <div className="oc-top">
        <div>
          <div className="oc-id">Order #{order._id.slice(-6).toUpperCase()}</div>
          <div className="oc-date">Placed: {created}</div>
        </div>

        <div className={`oc-status ${order.isPaid ? "paid" : "pending"}`}>
          {order.isPaid ? "Paid" : "Pending"}
        </div>
      </div>

      <div className="oc-body">
        <div className="oc-items">
          {order.orderItems.slice(0, 3).map((it) => (
            <div className="oc-item" key={it.product}>
              <img
                src={it.image?.startsWith("http") ? it.image : `${process.env.REACT_APP_IMAGE_URL}/${it.image}`}
                alt={it.name}
              />
              <div>
                <div className="oc-item-name">{it.name}</div>
                <div className="oc-item-qty">Qty: {it.qty}</div>
              </div>
            </div>
          ))}
          {order.orderItems.length > 3 && (
            <div className="oc-more">+{order.orderItems.length - 3} more</div>
          )}
        </div>

        <div className="oc-totals">
          <div>Items: {order.orderItems.length}</div>
          <div className="oc-total">Total: ₹{order.totalPrice}</div>
        </div>
      </div>

      <div className="oc-actions">
        <Link to={`/order-success/${order._id}`} className="btn small">
          View
        </Link>
        <button
          className="btn small secondary"
          onClick={() => window.alert("Reorder feature coming soon")}
        >
          Reorder
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
