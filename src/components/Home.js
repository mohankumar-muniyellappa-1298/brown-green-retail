import React from 'react';

export default function Home() {
  return (
    <main className="products-section">
      <h2>Welcome to Brown Green Retail</h2>
      <section className="company-section">
        <h3>About Us</h3>
        <p>
          Brown Green Retail is a boutique clothing store dedicated to providing
          high-quality, sustainable fashion. We carefully curate collections to
          blend timeless style with modern comfort.
        </p>
      </section>

      <section className="contact-section" style={{ marginTop: '1.5rem' }}>
        <h3>Contact Us</h3>
        <p>Email: <a href="mailto:hello@bro​wngreen.com">hello@browngreen.com</a></p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Green Lane, Style City, Country</p>
        <p>
          Follow us: 
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
          {' • '}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
      </section>
    </main>
  );
}
