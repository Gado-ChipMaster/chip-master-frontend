import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const Error404 = () => {
    return (
      <>
        <Navbar  />
        <main className="w-full h-screen bg-white dark:bg-slate-900 transition-colors">
        <div className="flex flex-col items-center justify-center text-sm max-md:px-4 mt-20 w-[80%] mx-auto">
            <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">404</h1>
            <div className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"></div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Page Not Found</p>
            <p className="text-sm md:text-base mt-4 text-gray-500 dark:text-gray-400 max-w-md text-center">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <div className="flex items-center gap-4 mt-6">
                <Link to="/" className="bg-gray-800 hover:bg-black dark:bg-slate-700 dark:hover:bg-slate-600 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all">
                    Return Home
                </Link>
                <Link to="/contact" className="border border-gray-300 dark:border-gray-600 px-7 py-2.5 text-gray-800 dark:text-gray-200 rounded-md active:scale-95 transition-all hover:bg-gray-50 dark:hover:bg-slate-800">
                    Contact support
                </Link>
            </div>
        </div>
        </main>
        <Footer />
      </>
    );
};

export default Error404;