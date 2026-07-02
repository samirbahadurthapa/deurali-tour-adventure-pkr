import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowLeft } from 'lucide-react';
import { saveAdminToken } from '../utils/api.js';

const AdminLogin = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok) {
        saveAdminToken(data.token);
        onLoginSuccess();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-base)',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        background: '#fff',
        borderRadius: 'var(--radius-md, 12px)',
        boxShadow: 'var(--shadow-md, 0 4px 20px rgba(0,0,0,0.1))',
        padding: '40px 32px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <ShieldAlert size={36} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
          <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>Admin Login</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sign in to manage Deurali content</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="adminUsername">Username</label>
            <input
              type="text"
              id="adminUsername"
              className="form-control"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="adminPassword">Password</label>
            <input
              type="password"
              id="adminPassword"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p style={{ color: '#DC2626', fontSize: '0.9rem', marginBottom: '16px', fontWeight: 500 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px 0', marginTop: '8px' }}
            disabled={submitting}
          >
            {submitting ? 'Signing in...' : (<><Lock size={16} /> Sign In</>)}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ width: '100%', padding: '10px 0', marginTop: '10px' }}
          >
            <ArrowLeft size={16} /> Back to Site
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;