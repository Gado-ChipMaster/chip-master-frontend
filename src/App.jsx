import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { uiService } from './services/api';

// Pages
import Home from './Page/Home';
import Service from './Page/Service';
import Login from './Page/Login';
import Register from './Page/Register';
import About from './Page/About';
import Contact from './Page/Contact';
import Profile from './Page/Profile';
import Error404 from './Page/Error404';
import PrivacyPolicy from './Page/PrivacyPolicy';
import TermsOfService from './Page/TermsOfService';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-500/30" style={{ color: 'var(--color-text, white)', backgroundColor: 'var(--color-bg, #050505)' }}>
        <NavBar />
        
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
