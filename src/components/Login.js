import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('bgr_users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('bgr_current_user', JSON.stringify(user));
      alert('Login successful');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <main className="products-section">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '1rem auto' }}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button type="submit" className="checkout-btn">Login</button>
        </div>
      </form>
    </main>
  );
}
