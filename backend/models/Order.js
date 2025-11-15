import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },

    cartItems: [
      {
        name: String,
        price: Number,
        qty: Number,
        image: String
      }
    ],

    total: { type: Number, required: true },

    status: {
      type: String,
      default: "Pending", // Pending | Delivered
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
