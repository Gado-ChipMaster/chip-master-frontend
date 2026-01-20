import React, { useState } from 'react';
import { Menu, X, Cpu, Home, Info, Phone, Package, LogIn, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Gemini_Generated_Image_7c2ivw7c2ivw7c2i (1).png';
import { chipService } from '../services/api';
import { useUI } from '../contexts/UIContext';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { config } = useUI();

  // Fetch user data on mount if logged in
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      chipService.getProfile()
        .then(res => setUser(res.data))
        .catch(err => {
          if (err.response && err.response.status === 401) {
            setUser(null);
            setIsLoggedIn(false);
          } else {
            console.error('Profile fetch error:', err);
          }
        });
    } else {
      setUser(null);
    }
  }, [isLoggedIn]); // Re-run when login status changes

  const navLinks = [
    { title: 'Home', path: '/', icon: <Home size={18} /> },
    { title: 'Services', path: '/service', icon: <Cpu size={18} /> },
    { title: 'About', path: '/about', icon: <Info size={18} /> },
    { title: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-custom/80 backdrop-blur-md border-b border-white/10" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              className='w-10 h-10 object-contain' 
              src={config?.logo_url || logo} 
              alt="logo" 
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {config?.labels?.site_title || 'CHIP MASTER'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'text-primary' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ color: location.pathname === link.path ? 'var(--color-primary)' : 'inherit' }}
                >
                  {link.icon}
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-white/10" />

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                        {user && user.username ? user.username[0].toUpperCase() : <User size={16}/>}
                    </div>
                    <span className="text-sm font-medium text-white max-w-[100px] truncate">
                        {user ? user.username : 'User'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1"
                        >
                            <Link 
                                to="/profile" 
                                onClick={() => setShowProfileMenu(false)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <User size={16} /> Profile
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                            >
                                <LogOut size={16} /> Sign Out
                            </button>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:opacity-90 transition-colors shadow-lg shadow-primary/20"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black"
          >
            <div className="p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-white/5 text-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.icon}
                  {link.title}
                </Link>
              ))}

              <div className="h-[1px] bg-white/10 my-4" />

              {isLoggedIn ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 p-3 text-red-400 bg-red-500/10 rounded-lg"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center p-3 text-white bg-white/5 rounded-lg border border-white/10"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center p-3 text-black bg-emerald-500 rounded-lg font-medium"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;