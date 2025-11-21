// src/pages/UserDashboard.js
import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import OrderCard from "../components/OrderCard";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // try to get basic user info from localStorage (adjust if you use context)
  const user = JSON.parse(localStorage.getItem("userInfo")) || {};

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dash-left">
        <div className="profile-card">
          <img src={user?.avatar || "/default-avatar.png"} alt={user?.name || "User"} />
          <h3>{user?.name || "Anonymous"}</h3>
          <p className="muted">{user?.email}</p>
          <div className="profile-stats">
            <div>
              <div className="stat-val">{orders.length}</div>
              <div className="stat-label">Orders</div>
            </div>
            {/* You can add more quick stats here */}
          </div>
        </div>
      </div>

      <div className="dash-right">
        <h2>Your Orders</h2>

        {loading ? (
          <div className="loading">Loading orders…</div>
        ) : orders.length === 0 ? (
          <div className="empty">You have no orders yet.</div>
        ) : (
          <div className="orders-list">
            {orders.map((o) => (
              <OrderCard key={o._id} order={o} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
