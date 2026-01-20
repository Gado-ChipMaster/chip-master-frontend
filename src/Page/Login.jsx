import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, LogIn, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { chipService } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clear any invalid tokens when Login page loads
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await chipService.login(formData.username, formData.password);
      const token = response.data.access;
      console.log('Login successful, token:', token); // Debug log
      localStorage.setItem('token', token);
      window.location.href = '/'; // Full page reload to refresh all components
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Access your professional tools</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500 uppercase">Username or Email</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="text"
                  required
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="Username or Email"
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
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader className="animate-spin" /> : <><span>Sign In</span> <LogIn size={20} /></>}
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
                onClick={async () => {
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
                }}
                className="w-full bg-[#303030] text-white font-bold py-3 rounded-xl transition-all hover:bg-[#404040] flex items-center justify-center gap-2"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                <span>Google</span>
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
