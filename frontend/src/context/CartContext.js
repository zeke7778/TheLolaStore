import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists)
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) =>
    setCart((prev) =>
      prev.map((p) => (p._id === id ? { ...p, qty } : p))
    );

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p._id !== id));

  const clearCart = () => setCart([]);

  // ⭐ NEW: total price function
  const totalPrice = () => {
    return cart.reduce(
      (sum, item) => sum + item.price * (item.qty || 1),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalPrice, // ⭐ make function available
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
