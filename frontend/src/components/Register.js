import React, { useState } from 'react';
import authService from '../services/authService';
import './Login.css';

const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (formData.username.length < 3) {
      setError('Username-ul trebuie să aibă cel puțin 3 caractere');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Email-ul nu este valid');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Parola trebuie să aibă cel puțin 6 caractere');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Parolele nu coincid');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await authService.register(dataToSend);
      
      console.log('Registration successful:', response);
      setSuccess('Înregistrare reușită! Te redirectăm către login...');
      
      // Resetează formularul
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Redirectare către login după 2 secunde
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess(response);
        }
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Înregistrarea a eșuat. Te rog încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Înregistrare</h2>
        <p className="subtitle">Creează un cont nou</p>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Alege un username"
              minLength="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="adresa@email.com"
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
              placeholder="Minim 6 caractere"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmă Parola</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-introdu parola"
              minLength="6"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Se încarcă...' : 'Înregistrare'}
          </button>
        </form>

        <div className="auth-switch">
          Ai deja cont?{' '}
          <span onClick={onSwitchToLogin} className="link">
            Login aici
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
