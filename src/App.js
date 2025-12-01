import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { products as productData } from './data/products';
import './components/Shop.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((c) => {
      const found = c.find((it) => it.id === product.id);
      if (found) {
        return c.map((it) => (it.id === product.id ? { ...it, quantity: it.quantity + 1 } : it));
      }
      return [...c, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((c) =>
      c
        .map((it) => (it.id === productId ? { ...it, quantity: Math.max(0, it.quantity + delta) } : it))
        .filter((it) => it.quantity > 0)
    );
  };

  const removeFromCart = (productId) => setCart((c) => c.filter((it) => it.id !== productId));

  return (
    <Router>
      <div className="App">
        <Header cartCount={cart.reduce((s, it) => s + (it.quantity || 0), 0)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brown-green-retail" element={<Home />} />
          <Route
            path="/shop"
            element={<ProductList products={productData} addToCart={addToCart} updateQuantity={updateQuantity} cart={cart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
        </Routes>

        <footer className="app-footer">
          <p>&copy; 2025 Brown & Green Retail. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
