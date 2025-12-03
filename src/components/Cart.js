import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function Cart({ cart, updateQuantity, removeFromCart, onBack }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    let currentUser = null;
    try {
      currentUser = JSON.parse(localStorage.getItem('bgr_current_user'));
    } catch (e) {
      currentUser = null;
    }

    const userEmail = (currentUser && currentUser.email) ? currentUser.email : '';

    if (!userEmail) {
      alert('Please log in to proceed with checkout');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id || null,
          email: userEmail,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            color: item.color,
            quantity: item.quantity || 1,
          })),
          total: total.toFixed(2),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Order submission failed');
      }

      alert(`✅ your order details received successfully, we will get back to you\n\nOrder ID: ${data.orderId}`);
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-section">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 24 }}>{item.image}</span>
                  <div>
                    <div>{item.name}</div>
                    <div style={{ fontSize: 12, color: '#666' }}>{item.color}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ minWidth: 120, textAlign: 'right' }}>${item.price.toFixed(2)}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button className="remove-btn" onClick={() => (updateQuantity ? updateQuantity(item.id, -1) : null)}>-</button>
                    <span style={{ minWidth: 28, textAlign: 'center' }}>{item.quantity || 1}</span>
                    <button className="add-to-cart-btn" onClick={() => (updateQuantity ? updateQuantity(item.id, 1) : null)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
            <button className="checkout-btn" onClick={handleCheckout} disabled={loading}>
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </>
      )}

      <button
        className="back-btn"
        onClick={() => {
          if (typeof onBack === 'function') return onBack();
          navigate('/shop');
        }}
      >
        ← Back to Shopping
      </button>
    </div>
  );
}
