import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const CheckoutDetails = () => {
  const { cart, clearCart } = useCart();
  const totalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    const orderMessage = `
🛒 *New Order Received*  

👤 *Customer*: ${form.name}  
📞 *Phone*: ${form.phone}  
🏠 *Address*: ${form.address}  

📦 *Items Ordered*:  
${cart.map(i => `• ${i.name} (Qty: ${i.qty}) - ₹${i.price}`).join("\n")}

💰 *Total Price*: ₹${totalPrice()}
    `;

    const whatsappURL = `https://wa.me/9109867778?text=${encodeURIComponent(orderMessage)}`;

    window.open(whatsappURL, "_blank");

    clearCart();
  };

  return (
    <div className="checkout-details-wrapper">
      <div className="checkout-details-card">
        <h2 className="form-title">Delivery Details</h2>

        <input
          name="name"
          placeholder="Full Name"
          className="form-input"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          className="form-textarea"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="form-input"
          onChange={handleChange}
        />

        <button className="submit-btn" onClick={handleSubmit}>
          Submit & Send to WhatsApp
        </button>
      </div>
    </div>
  );
};

export default CheckoutDetails;

