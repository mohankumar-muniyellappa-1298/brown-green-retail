import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ cartCount }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="logo">Brown Green Retail</h1>
        <p className="tagline">Premium Fashion for Everyone</p>
      </div>

      <nav className="header-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Create Account</Link>
        <Link to="/cart" className="cart-btn">🛒 Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}
