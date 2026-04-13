import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa"
import { MdEmail, MdPhone } from "react-icons/md"

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">eKart</h2>
          <p className="mt-2 text-sm">
            Smart shopping made easy. Best deals at your fingertips.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-lg">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaGithub /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>

          <div className="flex items-center gap-2 text-sm">
            <MdEmail />
            <span>support@ekart.com</span>
          </div>

          <div className="flex items-center gap-2 text-sm mt-2">
            <MdPhone />
            <span>+91 98765 43210</span>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 text-center text-sm py-4">
        © {new Date().getFullYear()} eKart. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer