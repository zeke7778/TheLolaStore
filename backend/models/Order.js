import mongoose from "mongoose";

// 🛒 Cart Item Schema (clean & reusable)
const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
});

// 📦 Order Schema
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      default: () => "ORD-" + Date.now(), // auto-generate if not sent
    },

    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },

    cartItems: [cartItemSchema], // 🚀 clean nested schema

    total: { type: Number, required: true },

    status: {
      type: String,
      default: "Pending", // Pending | Shipped | Delivered | Canceled (future)
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
