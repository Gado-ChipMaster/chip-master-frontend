
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import mahmoud from "../assets/mahmoud.png";
import SliderCompany from "../components/SliderCompany";
import { useState } from "react";
import { useGoogleCallback } from './GoogleCallback';

const Home = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    const [showAuthModal, setShowAuthModal] = useState(false);
    
    // Handle Google OAuth callback
    useGoogleCallback();

    return (
      <motion.div className="bg-white dark:bg-slate-900 transition-colors">
      <Navbar />
      <motion.main className="w-full relative overflow-hidden min-h-[calc(100vh-100px)] w-full">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob" />
            <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] bg-pink-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-4000" />
        </div>

        <section className="flex flex-col md:flex-row items-center justify-between py-10 md:py-20 gap-8 md:gap-8 w-[95%] md:w-[90%] mx-auto">
          
          {/* Left Content */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 z-10">
            
            {/* Community Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900/30 p-1.5 pr-4 rounded-full shadow-sm hover:shadow-md transition-all cursor-default mb-8"
            >
              <div className="flex -space-x-2">
                {[
                  mahmoud,
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100"
                ].map((src, i) => (
                  <img
                    key={i}
                    className="size-8 rounded-full border-2 border-white object-cover"
                    src={src}
                    alt={`User ${i + 1}`}
                  />
                ))}
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Trusted by <span className="text-indigo-600 font-bold">5k+</span> repair shops
              </p>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center md:text-left text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-4 md:mb-6"
            >
              Genuine Mobile <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Phone Boards
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center md:text-left text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-lg mb-8 leading-relaxed px-4 md:px-0"
            >
              Your trusted source for original, testing, and unlocked mobile logic boards. 
              We sell high-quality parts and provide expert diagnostic services.
            </motion.p>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 md:px-0"
            >
              <Link 
                to="/service" 
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    setShowAuthModal(true);
                  }
                }}
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto h-12 text-base">Get Started</Button>
              </Link>

              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-slate-700 dark:text-slate-200 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all active:scale-95 group w-full sm:w-auto">
                <div className="relative flex items-center justify-center size-8 bg-indigo-100 text-indigo-600 rounded-full group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-1/2 relative z-10"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-md xl:max-w-lg">
                {/* Abstract decorative shape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-200 to-pink-200 rounded-full blur-3xl opacity-30 -z-10" />
                
                <img
                    src="https://images.pexels.com/photos/6755093/pexels-photo-6755093.jpeg"
                    alt="Hero Visual"
                    className="relative w-full rounded-3xl shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/30 rotate-2 hover:rotate-0 transition-all duration-500 ease-out border-4 border-white dark:border-slate-700"
                />
                
                {/* Floating Cards */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
                >
                    <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-medium">Quality Check</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">100% Tested</p>
                    </div>
                </motion.div>
            </div>
          </motion.div>
        </section>
        {/* ----------------------------------------------------------------------------- */}
        {/* ----------------------------------------------------------------------------- */}
        <motion.section className="w-full py-24 bg-slate-50 dark:bg-slate-900/50">
          <motion.div className="w-[95%] mx-auto">
            <div className="text-center mb-16">
                <span className="text-indigo-600 font-bold tracking-tighter text-sm uppercase px-4 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">Pro Services</span>
                <motion.h1 className="text-4xl md:text-5xl font-black text-center mx-auto text-slate-900 dark:text-white mt-4">
                    Neural Operations Center
                </motion.h1>
                <motion.p className="text-base text-slate-500 text-center mt-4 max-w-xl mx-auto">
                    Access our proprietary search engines and technical databases designed for professional lab environments.
                </motion.p>
            </div>
            
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
                <ServiceCard 
                    img="https://images.pexels.com/photos/3520692/pexels-photo-3520692.jpeg"
                    title="Neural Chip Lookup"
                    desc="Global inventory search with AI-powered code identification and matching."
                    tag="V3.0 Search"
                />
                <ServiceCard 
                    img="https://images.pexels.com/photos/6754837/pexels-photo-6754837.jpeg"
                    title="Technical Data Lab"
                    desc="Instant access to Pinouts, ISP diagrams, and Datasheets for 50k+ components."
                    tag="Live DB"
                />
                <ServiceCard 
                    img="https://images.pexels.com/photos/6755133/pexels-photo-6755133.jpeg"
                    title="Industrial Converters"
                    desc="High-precision conversion tools for storage capacity and performance metrics."
                    tag="Pro Tools"
                />
            </motion.div>

            <div className="flex justify-center mt-12">
                <Link to="/service">
                    <button className="group flex items-center gap-3 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                        ENTER OPERATIONS CENTER
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </button>
                </Link>
            </div>
          </motion.div>
        </motion.section>
        {/* ----------------------------------------------------------------------------- */}
        <motion.section className="w-full">
          <SliderCompany className="w-[95%] mx-auto mt-24" />
        </motion.section>
        {/* ----------------------------------------------------------------------------- */}
          <div className="w-[90%] mx-auto py-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Getting your device back to life is easier than ever with our streamlined process.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Select Your Part",
                  description: "Browse our inventory of genuine boards for your specific model.",
                  icon: (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )
                },
                {
                  step: "02",
                  title: "Lab Testing",
                  description: "Every board undergoes rigorous 15-point QC in our static-free lab.",
                  icon: (
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )
                },
                {
                  step: "03",
                  title: "Fast Shipping",
                  description: "Secure packaging and expedited shipping to get you back online fast.",
                  icon: (
                    <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-slate-900 select-none">
                    {item.step}
                  </div>
                  <div className="size-12 rounded-xl bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        {/* ----------------------------------------------------------------------------- */}
          <div className="w-[90%] mx-auto py-20">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Testimonials</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-6">Trusted by Repair Experts</h2>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 relative">
                    <svg className="absolute -top-4 -left-4 w-10 h-10 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01691 21L5.01691 18C5.01691 16.8954 5.91234 16 7.01691 16H10.0169C10.5692 16 11.0169 15.5523 11.0169 15V9C11.0169 8.44772 10.5692 8 10.0169 8H6.01691C5.46462 8 5.01691 8.44772 5.01691 9V11C5.01691 11.5523 4.56919 12 4.01691 12H3.01691V5H13.0169V15C13.0169 18.3137 10.3306 21 7.01691 21H5.01691Z" />
                    </svg>
                    <p className="text-slate-600 dark:text-slate-300 italic mb-6 relative z-10 pt-4">
                      "I've sourced over 50 iPhone logic boards from PhonePartsMaster for my repair shop. Every single one was genuine and worked perfectly. Their QC is unmatched in this industry."
                    </p>
                    <div className="flex items-center gap-4">
                      <img 
                        src={mahmoud} 
                        alt="Alex M." 
                        className="size-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Mahmoud Gado</h4>
                        <p className="text-xs text-slate-500">Owner, iFixItFast Repairs</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                 <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  src="https://images.pexels.com/photos/6754853/pexels-photo-6754853.jpeg" 
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                 />
                 <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  src="https://images.pexels.com/photos/6755092/pexels-photo-6755092.jpeg" 
                  className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
                 />
              </div>
            </div>
          </div>
        {/* ----------------------------------------------------------------------------- */}
          <div className="w-[90%] mx-auto py-10">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <section className="flex flex-col items-center justify-center mx-auto w-full md:w-[85%] text-center rounded-none md:rounded-2xl py-16 md:py-24 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/banners/image-1.png')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 dark:bg-black/40 pointer-events-none" /> {/* Overlay for text contrast */}
                <div className="relative z-10 px-4">
                  <h1 className="text-2xl md:text-3xl font-medium text-white max-w-2xl mx-auto">Ready to earn more money?</h1>
                  <div className="h-[3px] w-24 md:w-32 my-2 bg-gradient-to-l from-transparent to-indigo-600 mx-auto"></div>
                  <p className="text-sm md:text-base text-white max-w-xl mx-auto opacity-90">
                      Join thousands of satisfied technicians. Get 100% original, tested mobile motherboards with a 90-day warranty.
                  </p>
                  
                  <Link 
                    to="/service"
                    onClick={(e) => {
                      if (!isAuthenticated) {
                        e.preventDefault();
                        setShowAuthModal(true);
                      }
                    }}
                  >
                  <button className="px-8 py-3 mt-6 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-500 hover:scale-105 active:scale-95 transition-all duration-300 text-white rounded-full shadow-lg shadow-indigo-600/20">
                      Get Started
                  </button>
                  </Link>
                  <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-indigo-50 text-sm font-medium">
                    <span className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                      <svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      90-Day Warranty
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                      <svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      24/7 Support
                    </span>
                  </div>
                </div>
            </section>
          </div>
        {/* ----------------------------------------------------------------------------- */}
      </motion.main>
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      {/* Modal Removed */}
      </motion.div>
    );
};

const ServiceCard = ({ img, title, desc, tag }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 group h-full flex flex-col"
    >
        <div className="relative h-64 overflow-hidden">
            <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase text-indigo-600 dark:text-indigo-400 border border-white/20">
                {tag}
            </div>
        </div>
        <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                {title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                {desc}
            </p>
            <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:gap-4 transition-all">
                EXPLORE MODULE <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
        </div>
    </motion.div>
);

export default Home;
