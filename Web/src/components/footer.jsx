import logoUngu from "../assets/NewLogo.png";
import { NavLink } from "react-router-dom";
import {
  FaPinterest,
  FaInstagram,
  FaTelegram,
  FaFacebook,
  FaHeart,
  FaLeaf,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 text-gray-800 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -right-10 w-60 h-60 bg-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 left-1/3 w-50 h-50 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-screen-xl px-6 py-16">
        <div className="md:flex md:justify-between gap-12 items-start">
          {/* Logo & Description Section */}
          <div className="mb-12 md:mb-0 flex flex-col items-center md:items-start max-w-sm">
            <a href="/" className="flex items-center mb-6 group">
              <div className="bg-gradient-to-r from-green-400 to-blue-400 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img src={logoUngu} className="h-12" alt="Growthly Logo" />
              </div>
            </a>
            
            <div className="text-center md:text-left mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
                Growthly
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Temukan solusi hidup sehat Anda bersama kami. Kesehatan adalah investasi terbaik untuk masa depan yang cerah.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                { icon: FaPinterest, color: "from-red-400 to-red-500", hoverColor: "hover:from-red-500 hover:to-red-600" },
                { icon: FaInstagram, color: "from-pink-400 to-purple-500", hoverColor: "hover:from-pink-500 hover:to-purple-600" },
                { icon: FaTelegram, color: "from-blue-400 to-blue-500", hoverColor: "hover:from-blue-500 hover:to-blue-600" },
                { icon: FaFacebook, color: "from-blue-600 to-blue-700", hoverColor: "hover:from-blue-700 hover:to-blue-800" },
              ].map(({ icon: Icon, color, hoverColor }, i) => (
                <a
                  key={i}
                  href="#"
                  className={`bg-gradient-to-r ${color} ${hoverColor} p-3 rounded-xl text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 flex-grow">
            {/* Product Kami */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaLeaf className="text-green-500 mr-2" />
                <h2 className="text-lg font-bold text-green-700">Product Kami</h2>
              </div>
              <ul className="space-y-3">
                <li>
                  <NavLink
                    to="/home"
                    className="text-gray-600 hover:text-green-600 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Perusahaan
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/home"
                    className="text-gray-600 hover:text-green-600 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Website
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Tentang Kami */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FaHeart className="text-pink-500 mr-2" />
                <h2 className="text-lg font-bold text-pink-700">Tentang Kami</h2>
              </div>
              <ul className="space-y-3">
                <li>
                  <NavLink 
                    to="/about" 
                    className="text-gray-600 hover:text-pink-600 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Perusahaan
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/about" 
                    className="text-gray-600 hover:text-pink-600 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Visi
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/about" 
                    className="text-gray-600 hover:text-pink-600 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Misi
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Artikel */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded mr-2"></div>
                <h2 className="text-lg font-bold text-blue-700">Artikel</h2>
              </div>
              <ul className="space-y-3">
                <li>
                  <NavLink 
                    to="/article" 
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Artikel
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/informasi" 
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Informasi Gizi
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Kontak */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 via-pink-400 to-blue-400 rounded mr-2"></div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Kontak</h2>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="text-gray-600">
                  <span className="font-medium">📞</span> 666 8888 0000
                </li>
                <li className="text-gray-600">
                  <span className="font-medium">✉️</span> Needhelp@company.com
                </li>
                <li>
                  <NavLink 
                    to="/login" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Admin
                  </NavLink>
                </li>
              </ul>

              {/* Newsletter Subscription */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3 font-medium">Newsletter</p>
                <div className="flex bg-white rounded-xl shadow-inner overflow-hidden border border-gray-200">
                  <input
                    type="email"
                    placeholder="Email Anda..."
                    className="flex-grow px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 bg-transparent"
                  />
                  <button className="bg-gradient-to-r from-green-400 via-pink-400 to-blue-400 hover:from-green-500 hover:via-pink-500 hover:to-blue-500 px-4 py-3 transition-all duration-300">
                    <FaTelegram className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="relative border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-xl px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © 2024 CopyRight by StartUp Growthly. 
              <span className="ml-2 text-pink-500">Made with ❤️</span>
            </p>
            <div className="mt-2 md:mt-0 text-sm text-gray-500">
              <span>Kesehatan • Nutrisi • Hidup Sehat</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;