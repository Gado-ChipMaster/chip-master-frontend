import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <>
        <footer className="w-full bg-gray-50 dark:bg-slate-800 transition-colors">
          <div className="w-[90%] mx-auto pt-16 text-gray-900 dark:text-gray-100">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 dark:border-gray-600 pb-10">
                <div className="md:max-w-96">
                    <h2 className='text-2xl font-bold text-indigo-600 flex items-center gap-2'>
                        {/* <img alt="" className="h-8" src="..." /> */}
                        Chip Master
                    </h2>
                    <p className="mt-6 text-sm">
                        The leading supplier of original mobile phone motherboards and diagnostic services. We ensure quality, reliability, and fast shipping for all your repair needs.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg" alt="google play" className="h-10 w-auto border border-white rounded" />
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg" alt="app store" className="h-10 w-auto border border-white rounded" />
                    </div>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-10 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"><Link to="/">Home</Link></li>
                            <li className="hover:text-indigo-600 transition"><Link to="/about">About us</Link></li>
                            <li className="hover:text-indigo-600 transition"><Link to="/services">Services</Link></li>
                            <li className="hover:text-indigo-600 transition"><Link to="/contact">Contact us</Link></li>
                            <li className="hover:text-indigo-600 transition"><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li className="hover:text-indigo-600 transition"><Link to="/terms-of-service">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+1 (555) 123-4567</p>
                            <p>support@chipmaster.com</p>
                            <p>123 Tech Park, Silicon Valley</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © <Link to="/">Chip Master</Link>. All Right Reserved.
            </p>
          </div>
        </footer>
        </>
    )
}

export default Footer;
