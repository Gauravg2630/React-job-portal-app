import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = 'https://react-job-portal-app-backend.onrender.com/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // Fetch current user on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/me`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Auto-login failed:', err);
      }
      setLoading(false);
    })();
  }, []);

  // Login function
  async function login(username, password) {
    setAuthLoading(true);
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });
    setAuthLoading(false);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }

    const data = await res.json();
    setUser(data.user);            // Save user to state
    return data.user;              // ✅ Return user object for role-based checks
  }

  // Logout function
  async function logout() {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  }

  // Register function
  async function register(username, password) {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        isAdmin: username.toLowerCase() === 'admin',  // 👈 Treat 'admin' username as admin
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
  }

  if (loading) return <div className="centered">Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout, register, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
