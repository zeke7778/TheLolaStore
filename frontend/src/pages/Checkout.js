import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate(); // ✅ MUST be declared

  const totalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="checkout-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `${process.env.REACT_APP_IMAGE_URL}/${item.image}`
                  }
                  alt={item.name}
                />

                <div className="info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>

                  <div className="quantity-box">
                    <button
                      onClick={() =>
                        updateQty(item._id, item.qty > 1 ? item.qty - 1 : 1)
                      }
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button onClick={() => updateQty(item._id, item.qty + 1)}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="summary modern-summary">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice()}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className="green-text">FREE</span>
            </div>

            <div className="summary-total">
              <span>Grand Total</span>
              <span>₹{totalPrice()}</span>
            </div>

            <button
              className="place-order-btn"
              onClick={() => navigate("/checkout-details")} // ✅ Works now
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

