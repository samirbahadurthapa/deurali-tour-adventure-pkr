import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowLeft } from 'lucide-react';
import { saveAdminToken } from '../utils/api.js';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-brandgreen-light/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <h2 className="text-3xl font-bold text-charcoal-dark">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Sign in to access the Deurali admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label
              htmlFor="adminUsername"
              className="block text-xs font-bold uppercase text-gray-500 mb-2"
            >
              Username
            </label>

            <input
              id="adminUsername"
              type="text"
              required
              autoFocus
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="adminPassword"
              className="block text-xs font-bold uppercase text-gray-500 mb-2"
            >
              Password
            </label>

            <input
              id="adminPassword"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

         

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-60"
          >
            <Lock className="w-4 h-4" />
            {submitting ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={onCancel}
            className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </button>

        </form>
      </div>
    </div>
  );
}