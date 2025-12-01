import React from 'react';

export default function Cart({ cart, removeFromCart, onBack }) {
  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <div className="cart-section">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <span>
                  {item.image} {item.name}
                </span>
                <span>${item.price.toFixed(2)}</span>
                <button className="remove-btn" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}

      <button className="back-btn" onClick={onBack}>
        ← Back to Shopping
      </button>
    </div>
  );
}
