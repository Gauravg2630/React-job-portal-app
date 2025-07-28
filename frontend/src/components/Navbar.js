import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();

  function handleLogout() {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Job Board</Link>
      <div>
        {user ? (
          <>
            <span className="nav-user">
              Hi, {user.username} {user.isAdmin && '(Admin)'}
            </span>

            {/* Show Admin Dashboard link only for admins */}
            {user.isAdmin && (
              <Link to="/admin" className="btn-link" style={{ marginLeft: '1rem' }}>
                Admin Dashboard
              </Link>
            )}

            <button onClick={handleLogout} className="btn-logout" style={{ marginLeft: '1rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-link">Login</Link>
            <Link to="/register" className="btn-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
