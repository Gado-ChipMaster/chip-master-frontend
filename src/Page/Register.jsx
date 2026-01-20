import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { chipService } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    first_name: '', 
    last_name: '', 
    phone_number: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      console.log('Sending registration data:', formData);
      const response = await chipService.register(formData);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (err) {
      const errorData = err.response?.data;
      let errorMessage = 'Registration failed. Please check your inputs.';
      
      if (errorData) {
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else {
          // Join the first error message of each field
          errorMessage = Object.entries(errorData)
            .map(([field, errors]) => {
              const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ');
              const fieldError = Array.isArray(errors) ? errors[0] : errors;
              return `${fieldName}: ${fieldError}`;
            })
            .join(' | ');
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const redirectUri = window.location.origin;
      console.log('Initiating Google Login with redirect_uri:', redirectUri);
      const response = await fetch(`${import.meta.env.VITE_GOOGLE_AUTH_URL}?redirect_uri=${encodeURIComponent(redirectUri)}&state=/`);
      const data = await response.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (error) {
      console.error('Google OAuth error:', error);
      alert('Failed to initiate Google login');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Background blobs */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join the Chip Master network</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500 uppercase">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="text"
                  required
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase">First Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                  <input 
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={e => setFormData({...formData, first_name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                    placeholder="John"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase">Last Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                  <input 
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={e => setFormData({...formData, last_name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500 uppercase">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500 uppercase">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="tel"
                  required
                  value={formData.phone_number}
                  onChange={e => setFormData({...formData, phone_number: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500 uppercase">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader className="animate-spin" /> : <><span>Sign Up</span> <ArrowRight size={20} /></>}
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#050505]/50 backdrop-blur text-gray-500">Or continue with</span>
                </div>
            </div>

            <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black font-bold py-3 rounded-xl transition-all hover:bg-gray-100 flex items-center justify-center gap-2"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                <span>Google</span>
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
