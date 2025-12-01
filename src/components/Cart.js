import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cart, updateQuantity, removeFromCart, onBack }) {
  const navigate = useNavigate();
  const total = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const handleCheckout = () => {
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

    const recipient = 'browngreenretail@gmail.com';
    const userEmail = (currentUser && currentUser.email) ? currentUser.email : '';
    const subject = `New order from ${userEmail || 'guest'}`;

    const lines = [];
    lines.push('Order details from Brown Green Retail');
    if (userEmail) lines.push(`Customer email: ${userEmail}`);
    lines.push('');
    cart.forEach((item, idx) => {
      const qty = item.quantity || 1;
      lines.push(
        `${idx + 1}. ${item.name} — ${item.color} — ${qty} x $${item.price.toFixed(2)} = $${(
          item.price * qty
        ).toFixed(2)}`
      );
    });
    lines.push('');
    lines.push(`Total: $${total.toFixed(2)}`);
    lines.push('');
    lines.push('Please get back to the customer with order confirmation and shipping details.');

    const body = lines.join('\n');

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

     alert('we will receive your order details once you send the auto generated mail which opened');
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
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}

      <button
        className="back-btn"
        onClick={() => {
          if (typeof onBack === 'function') return onBack();
          // fallback to route navigation when onBack is not provided
          navigate('/shop');
        }}
      >
        ← Back to Shopping
      </button>
    </div>
  );
}
