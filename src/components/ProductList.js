import React from 'react';

export default function ProductList({ products, addToCart }) {
  return (
    <main className="products-section">
      <h2>Our Collection</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <h3>{product.name}</h3>
            <p className="product-color">Color: {product.color}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
