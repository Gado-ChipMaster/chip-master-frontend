
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen flex flex-col transition-colors">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <Navbar />
            
            <main className="flex-grow w-full">
                {/* Header Section */}
                <section className="bg-slate-900 dark:bg-slate-950 py-16 md:py-20 text-center text-white relative overflow-hidden transition-colors w-full">
                     <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 L 100 0 L 0 0 Z" fill="url(#grad1)" />
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
                                    <stop offset="100%" style={{stopColor: '#7c3aed', stopOpacity: 1}} />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="relative z-10 w-[90%] md:w-[80%] mx-auto px-4">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold mb-4"
                        >
                            Get in Touch
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-300 text-base md:text-lg max-w-xl mx-auto"
                        >
                            Have a question about a motherboard or need a custom quote? Our team is here to help.
                        </motion.p>
                    </div>
                </section>

                <div className="w-[90%] md:w-[80%] mx-auto py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Email Us</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Our friendly team is here to help.</p>
                                    <a href="mailto:support@phonepartsmaster.com" className="text-indigo-600 font-medium hover:underline">support@phonepartsmaster.com</a>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Visit Us</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Come say hello at our HQ.</p>
                                    <p className="text-slate-900 dark:text-slate-100">123 Tech Park, Silicon Valley, CA</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-pink-50 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Call Us</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Mon-Fri from 8am to 5pm.</p>
                                    <p className="text-slate-900 dark:text-slate-100">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Response Time Commitment</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                We pride ourselves on quick responses. You can expect a reply to your inquiry within <span className="font-bold text-indigo-600">24 business hours</span>.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-slate-700 mb-2">First name</label>
                                    <input type="text" id="first-name" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition text-slate-900 dark:text-slate-100" placeholder="John" />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-slate-700 mb-2">Last name</label>
                                    <input type="text" id="last-name" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition text-slate-900 dark:text-slate-100" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition text-slate-900 dark:text-slate-100" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                <select id="subject" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition text-slate-900 dark:text-slate-100">
                                    <option>Sales Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Return/Exchange</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea id="message" rows="4" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition text-slate-900 dark:text-slate-100" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition duration-300">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </main>

        </div>
    );
};

export default Contact;
