import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('bgr_users') || '[]');
    if (users.find((u) => u.email === email)) {
      alert('An account with that email already exists');
      return;
    }
    const user = { name, email, password };
    users.push(user);
    localStorage.setItem('bgr_users', JSON.stringify(users));
    alert('Account created — you can now log in');
    navigate('/login');
  };

  return (
    <main className="products-section">
      <h2>Create Account</h2>
      <form className="auth-form" onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '1rem auto' }}>
        <label>
          Full name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button type="submit" className="checkout-btn">Create Account</button>
        </div>
      </form>
    </main>
  );
}
