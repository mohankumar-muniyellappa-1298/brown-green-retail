import React from 'react';

export default function ProductList({ products, addToCart, updateQuantity, cart }) {
  const getQty = (productId) => {
    const item = cart && cart.find((c) => c.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <main className="products-section">
      <h2>Our Collection</h2>
      <div className="products-grid">
        {products.map((product) => {
          const qty = getQty(product.id);
          return (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <h3>{product.name}</h3>
              <p className="product-color">Color: {product.color}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>

              {qty > 0 ? (
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                  <button className="remove-btn" onClick={() => updateQuantity(product.id, -1)}>-</button>
                  <span style={{ minWidth: 28, textAlign: 'center' }}>{qty}</span>
                  <button className="add-to-cart-btn" onClick={() => updateQuantity(product.id, 1)}>+</button>
                </div>
              ) : (
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
