import Order from "../models/Order.js";

// 🛒 Create new order
export const createOrder = async (req, res) => {
  try {
    const { items, total, customer, address, phone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    if (!total) {
      return res.status(400).json({ message: "Order total required" });
    }

    const order = new Order({
      items,
      total,
      customer,
      address,
      phone,
      status: "Pending",
    });

    const saved = await order.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error("Create Order Error:", err);
    return res.status(500).json({ message: "Failed to create order" });
  }
};

// 📦 Get all orders (ADMIN)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.error("Get Orders Error:", err);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// 🔄 Update order status (Pending → Processing → Delivered)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    const updated = await order.save();

    return res.json(updated);
  } catch (err) {
    console.error("Update Order Error:", err);
    return res.status(500).json({ message: "Failed to update order" });
  }
};

// GET /api/orders/my
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id; // protect middleware attaches req.user
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Get My Orders Error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
