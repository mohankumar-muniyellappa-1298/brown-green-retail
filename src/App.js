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

  const addToCart = (product) => setCart((c) => [...c, product]);
  const removeFromCart = (index) => setCart((c) => c.filter((_, i) => i !== index));

  return (
    <Router>
      <div className="App">
        <Header cartCount={cart.length} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList products={productData} addToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        </Routes>

        <footer className="app-footer">
          <p>&copy; 2025 Brown & Green Retail. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
