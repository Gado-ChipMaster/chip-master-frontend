import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import mahmoud from "../assets/mahmoud.png";
import { useUI } from "../contexts/UIContext";

const About = () => {
    const { config } = useUI();
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <Navbar />
            <section 
              className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center transition-colors py-12 md:py-0 overflow-hidden"
              style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 max-w-6xl w-full mx-auto">
                <div className="relative shadow-2xl shadow-indigo-600/40 dark:shadow-indigo-900/50 rounded-2xl overflow-hidden shrink-0 max-w-full">
                    <img className="max-w-md w-full object-cover rounded-2xl"
                        src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
                        alt="" />
                    <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                        <div className="flex -space-x-4 shrink-0">
                            <img src={mahmoud} alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                                alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]" />
                            <div
                                className="flex items-center justify-center text-xs  text-white size-9 rounded-full border-[3px] border-white bg-indigo-600 hover:-translate-y-1 transition z-[4]"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                50+
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Trusted by technicians</p>
                    </div>
                </div>
                <div className="text-sm text-slate-600 max-w-lg">
                    <h1 className="text-xl uppercase font-semibold text-slate-700 dark:text-slate-200">What we do?</h1>
                    <div 
                      className="w-24 h-[3px] rounded-full"
                      style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }}
                    ></div>
                    <p className="mt-8 text-slate-600 dark:text-slate-300">We specialize in providing high-quality, original mobile phone motherboards. From iPhone to Samsung, we stock tested and unlocked logic boards ready for installation.</p>
                    <p className="mt-4 text-slate-600 dark:text-slate-300">Our team of expert technicians rigorously tests every board to ensure 100% functionality. We also offer advanced diagnostic services to help identified complex hardware issues.</p>
                    <p className="mt-4 text-slate-600 dark:text-slate-300">Whether you are a repair shop owner or a DIY enthusiast, we provide the reliable parts and support you need to get devices running like new again.</p>
                    <Link 
                      to="/contact" 
                      className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition py-3 px-8 rounded-full text-white"
                      style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }}
                    >
                        <span>Get in touch</span>
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                fill="#fff" />
                        </svg>
                    </Link>
                </div>
              </div>
            </section>
        </>
    );
};

export default About;
