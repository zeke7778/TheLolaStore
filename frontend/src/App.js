import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AdminPanel from "./pages/AdminPanel";
import EditProduct from "./pages/EditProduct";
import ThankYou from "./pages/ThankYou";
import Checkout from "./pages/Checkout";
import UserDashboard from "./pages/UserDashboard";
import CheckoutDetails from "./pages/CheckoutDetails";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />

              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout-details" element={<CheckoutDetails />} />
              
              <Route
                path="/admin"
                element={
                  <PrivateRoute adminOnly={true}>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/products/:id/edit"
                element={
                  <PrivateRoute adminOnly={true}>
                    <EditProduct />
                  </PrivateRoute>
                }
              />

              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
