import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, authLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      // login returns the user object (make sure your AuthContext.login returns user)
      const user = await login(username, password);

      if (user?.isAdmin) {
        navigate('/admin'); // Redirect admin to admin dashboard
      } else {
        navigate('/'); // Redirect normal user to homepage
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
      <label>Username
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          placeholder="Enter username"
        />
      </label>
      <label>Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="Enter password"
        />
      </label>
      <button type="submit" disabled={authLoading}>
        {authLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
