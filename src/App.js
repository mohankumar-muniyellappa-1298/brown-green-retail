import React, { useState } from 'react';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    { id: 1, name: 'Classic T-Shirt', price: 29.99, category: 'tops', color: 'Navy Blue', image: '👕' },
    { id: 2, name: 'Denim Jeans', price: 79.99, category: 'bottoms', color: 'Dark Blue', image: '👖' },
    { id: 3, name: 'Cotton Hoodie', price: 59.99, category: 'tops', color: 'Gray', image: '🧥' },
    { id: 4, name: 'Joggers', price: 49.99, category: 'bottoms', color: 'Black', image: '🧣' },
    { id: 5, name: 'Leather Jacket', price: 199.99, category: 'outerwear', color: 'Brown', image: '🧥' },
    { id: 6, name: 'Summer Dress', price: 69.99, category: 'dresses', color: 'Floral', image: '👗' },
    { id: 7, name: 'Casual Shirt', price: 39.99, category: 'tops', color: 'White', image: '👔' },
    { id: 8, name: 'Sneakers', price: 89.99, category: 'shoes', color: 'White', image: '👟' },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="logo">Brown Green Retail</h1>
          <p className="tagline">Premium Fashion for Everyone</p>
        </div>
        <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cart.length})
        </button>
      </header>

      {showCart ? (
        <div className="cart-section">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <span>{item.image} {item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <strong>Total: ${cartTotal.toFixed(2)}</strong>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </>
          )}
          <button className="back-btn" onClick={() => setShowCart(false)}>← Back to Shopping</button>
        </div>
      ) : (
        <main className="products-section">
          <h2>Our Collection</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.image}</div>
                <h3>{product.name}</h3>
                <p className="product-color">Color: {product.color}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      <footer className="app-footer">
        <p>&copy; 2025 Brown & Green Retail. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
