import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const cartCount = Array.isArray(cart) ? cart.reduce((s, p) => s + (p.qty || 1), 0) : 0;

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">The Lola Store</Link>
      </div>

      <nav className={`nav-menu ${open ? "open" : ""}`}>
        <NavLink to="/" className="nav-link" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/cart" className="nav-link" onClick={() => setOpen(false)}>Cart</NavLink>
      </nav>

      <div className="nav-right">
        <Link to="/cart" className="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="10" cy="20" r="1" fill="currentColor" />
            <circle cx="18" cy="20" r="1" fill="currentColor" />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            {user.isAdmin ? <Link to="/admin" className="nav-link">Admin</Link> : <Link to="/profile" className="nav-link">Dashboard</Link>}
            <button className="btn small" onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn small">Register</Link>
          </>
        )}

        <button className={`nav-toggle ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu toggle">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
};

export default Navbar;