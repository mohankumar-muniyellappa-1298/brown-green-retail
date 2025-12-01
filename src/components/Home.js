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

          Founded in 2025, our mission is to promote eco-friendly practices
          within the fashion industry while offering our customers stylish and
          affordable clothing options.
        </p>
      </section>

      <section className="contact-section" style={{ marginTop: '1.5rem' }}>
        <h3>Contact Us</h3>
        <p>Email: <a href="mailto:hello@bro​wngreen.com">browngreenretail@gmail.com</a></p>
        <p>Phone: +91 8754951634</p>
        <p>Address: chinna belagondapalli, Mathigiri, Hosur TamilNadu- 635114</p>
        <p>
          Follow us: 
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
          {' • '}
          <a href="https://www.instagram.com/brown_green_retail/" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
      </section>
    </main>
  );
}
