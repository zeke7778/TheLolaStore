import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate();

  const safeCart = Array.isArray(cart) ? cart : [];
  const total = safeCart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>
      {safeCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {safeCart.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={item.image || "/assets/placeholder.jpg"} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => updateQty(item._id, Math.max((item.qty || 1) - 1, 1))}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item._id, (item.qty || 1) + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
            <button className="btn" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;