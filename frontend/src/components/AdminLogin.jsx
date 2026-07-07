import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowLeft } from 'lucide-react';
import { saveAdminToken } from '../utils/api.js';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-150 to-brandgreen-light/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 space-y-6 text-left">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal-dark">Welcome back</h2>
          <p className="text-gray-400 text-sm leading-relaxed">Sign in to access the Deurali admin dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1" htmlFor="adminUsername">
              Username
            </label>
            <input
              type="text"
              id="adminUsername"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1" htmlFor="adminPassword">
              Password
            </label>
            <input
              type="password"
              id="adminPassword"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <p className="text-gray-400 text-xs mt-1">
            Demo login: <span className="font-semibold text-gray-600">admin / admin123</span>
          </p>

          {error && (
            <p className="text-red-600 text-xs font-semibold">
              {error}
            </p>
          )}

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg text-sm shadow-md transition-colors flex justify-center items-center gap-1.5"
            >
              <Lock className="w-4 h-4" /> {submitting ? 'Signing in...' : 'Sign In'}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full border border-gray-300 hover:border-charcoal text-gray-600 hover:text-charcoal-dark font-semibold py-2.5 rounded-lg text-sm transition-all flex justify-center items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Website
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}