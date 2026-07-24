import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        // Store user details in localStorage if needed (e.g. user session)
        localStorage.setItem('deurali_user_token', data.token);
        localStorage.setItem('deurali_user_name', data.name);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-tr from-charcoal-dark to-brandgreen-light/20 p-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-10 text-left">
        
        {success ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-charcoal-dark">
                Welcome to Deurali!
              </h2>
              <p className="text-gray-500 text-sm">
                Your account has been created successfully.
              </p>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
            >
              Explore Packages
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-charcoal-dark">
                Create Account
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Join Deurali Tour & Adventure for custom travel experiences
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition"
                  />
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 rounded-lg px-4 py-3 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-60 shadow-md"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing Up...</span>
                  </>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>

              {/* Back Link */}
              <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
                <Link to="/" className="flex items-center gap-1 hover:text-primary transition">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </Link>
                <span>
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary font-bold hover:underline">
                    Login
                  </Link>
                </span>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
}
