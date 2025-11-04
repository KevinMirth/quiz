import React, { useState } from 'react';
import authService from '../services/authService';
import './Login.css';

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      console.log('Login successful:', response);
      
      // Salvează datele utilizatorului în localStorage
      localStorage.setItem('user', JSON.stringify(response));
      
      // Apelează callback-ul pentru autentificare reușită
      if (onLoginSuccess) {
        onLoginSuccess(response);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="subtitle">Bine ai revenit!</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usernameOrEmail">Username sau Email</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required
              placeholder="Introdu username sau email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Parola</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Introdu parola"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Se încarcă...' : 'Login'}
          </button>
        </form>

        <div className="auth-switch">
          Nu ai cont?{' '}
          <span onClick={onSwitchToRegister} className="link">
            Înregistrează-te aici
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
