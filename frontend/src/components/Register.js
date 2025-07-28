import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await register(username, password);
      setSuccess('Registration successful! Redirecting to login...');
      setUsername('');
      setPassword('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Create an Account</h2>

      {error && (
        <p className="error-msg" style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </p>
      )}
      {success && (
        <p className="success-msg" style={{ color: 'green', marginBottom: '1rem' }}>
          {success}
        </p>
      )}

      <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Username
      </label>
      <input
        id="username"
        type="text"
        value={username}
        placeholder="Enter your username"
        onChange={e => setUsername(e.target.value)}
        required
        style={{ width: '100%', padding: '8px', marginBottom: '1rem', boxSizing: 'border-box' }}
      />

      <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        placeholder="Create a password"
        onChange={e => setPassword(e.target.value)}
        required
        style={{ width: '100%', padding: '8px', marginBottom: '1.5rem', boxSizing: 'border-box' }}
      />

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Register
      </button>
    </form>
  );
}
