import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 py-4 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Logo and Copyright */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <div className="flex flex-col sm:flex-row items-center">
              <img 
                src="/logo.jpeg" 
                alt="Furnish Logo" 
                className="h-12 sm:h-16 mb-3 sm:mb-0 sm:mr-4"
              />
              <span className="text-xs sm:text-sm text-center sm:text-left">
                © {new Date().getFullYear()}, All Rights Reserved SPOT FURNISH.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="w-full lg:w-auto">
            <div className="flex flex-wrap justify-center gap-y-2">
              <a href="/policy" className="mx-2 sm:mx-3 text-xs sm:text-sm hover:text-gray-300 transition duration-300">
                Terms and Conditions
              </a>
              <a href="/policy" className="mx-2 sm:mx-3 text-xs sm:text-sm hover:text-gray-300 transition duration-300">
                Delivery Policy
              </a>
              <a href="/contact" className="mx-2 sm:mx-3 text-xs sm:text-sm hover:text-gray-300 transition duration-300">
                Contact Us
              </a>
              <a href="/faq" className="mx-2 sm:mx-3 text-xs sm:text-sm hover:text-gray-300 transition duration-300">
                FAQ
              </a>
            </div>
          </div>

          {/* Social and Contact */}
          <div className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Social Icons */}
              <div className="flex space-x-3">
                <a 
                  href="https://www.facebook.com/spot.furnish/" 
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-white text-xl" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-white text-xl" />
                </a>
              </div>

              {/* Help Section */}
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-xs mb-1">Need Help? Call Us</div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                  <div className="flex items-center">
                    
                    <a href="tel:+918123096298" className="text-sm font-bold hover:underline">+918123096298</a>
                  </div>
                  <a href="tel:+919844723432" className="text-sm font-bold hover:underline">+919844723432</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Policy Link */}
        <div className="text-center lg:text-right mt-6 lg:mt-3">
          <a href="/policy" className="text-xs sm:text-sm hover:text-gray-300 transition duration-300">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;