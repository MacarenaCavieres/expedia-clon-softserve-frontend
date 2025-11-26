import {Link} from "react-router-dom";
function Footer() {
    return (
        <footer className="mt-20 bg-slate-900 text-slate-200 py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Company Branding  */}
                <div>
                    <h4 className="font-bold text-lg">Expedia Clone Group</h4>
                    <p className="text-sm mt-2 text-slate-400">
                        Your trusted travel companion — explore the world with confidence.
                    </p>
                </div>

                {/* Contact info */}
                <div>
                    <h5 className="font-semibold mb-3">Contact us</h5>
                    <ul className="space-y-1 text-sm text-slate-300">
                        <li>📍 Santiago, Chile</li>
                        <li>📞 +56 9 1234 5678</li>
                        <li>✉️ support@expediaclone.com</li>
                    </ul>
                </div>

                {/* Links */}
                <div>
                    <h5 className="font-semibold mb-3">Information</h5>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <Link to="/terms" className="hover:text-white">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-white">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/help" className="hover:text-white">
                                Help Center
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media  (flowbite icons)*/}
                <div>
                    <h5 className="font-semibold mb-3">Follow Us!</h5>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="#" className="hover:text-white">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
                                </svg> 
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar (could be deleted if needed)*/}
            <div className="mt-10 border-t border-slate-700 pt-4 text-center text-xs text-slate-500">
                © 2025 Expedia Clone. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;

