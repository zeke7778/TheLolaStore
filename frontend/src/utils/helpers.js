export const currency = (n) => {
  if (n == null) return "₹0";
  return "₹" + Number(n).toFixed(2);
};

export const genOrderId = () => "ORD-" + Math.floor(100000 + Math.random() * 900000);