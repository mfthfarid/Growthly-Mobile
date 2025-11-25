import { NavLink as RouterNavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logoUngu from "../assets/NewLogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // PERUBAHAN: Link 'Artikel' diubah kembali ke huruf kecil
  const navLinks = [
    { to: "/", text: "Beranda", emoji: "🏠", activeTextColor: "text-green-600" },
    { to: "/about", text: "Tentang", emoji: "👥", activeTextColor: "text-blue-600" },
    { to: "/fitur", text: "Fitur", emoji: "✨", activeTextColor: "text-purple-600" },
    { to: "/Article", text: "Artikel", emoji: "📰", activeTextColor: "text-orange-600" },
    { to: "/contact", text: "Kontak", emoji: "📞", activeTextColor: "text-pink-600" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg' : 'bg-transparent border-b border-transparent'}`}>
      
      <div className="relative container mx-auto px-4 lg:px-20 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center group">
          <div className="bg-white/50 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/30 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            {/* PERUBAHAN: Alt text diubah kembali ke 'Growthly Logo' */}
            <img src={logoUngu} alt="Growthly Logo" className="h-8 w-auto" />
          </div>
          <div className="ml-3 hidden sm:block">
            {/* PERUBAHAN: Nama brand diubah kembali ke 'Growthly' */}
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Growthly
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-grow justify-center">
          <ul className="flex gap-2 text-[16px] bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border border-white/30">
            {navLinks.map((link) => (
              <CustomNavLink key={link.to} to={link.to} activeTextColor={link.activeTextColor}>
                {link.text}
              </CustomNavLink>
            ))}
          </ul>
        </div>

        {/* PERUBAHAN: Tombol CTA dihapus dan diganti placeholder untuk keseimbangan layout */}
        <div className="hidden lg:flex w-36"></div> 

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="relative bg-white/50 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20 text-gray-700 hover:bg-white/70 focus:outline-none transition-all duration-300"
            onClick={toggleNavbar}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-0 left-0 w-6 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2.5' : 'rotate-0 translate-y-0'
                }`}
              ></span>
              <span
                className={`absolute top-2.5 left-0 w-6 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transform transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`absolute top-5 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2.5' : 'rotate-0 translate-y-0'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-2xl transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <ul className="flex flex-col gap-2 items-center">
            {navLinks.map((link) => (
              <MobileNavLink key={link.to} to={link.to} onClick={toggleNavbar} activeTextColor={link.activeTextColor}>
                {link.emoji} {link.text}
              </MobileNavLink>
            ))}
          </ul>
          
          {/* PERUBAHAN: Tombol CTA di menu mobile dihapus */}
          
        </div>
      </div>
    </nav>
  );
};

const CustomNavLink = ({ to, children, onClick, activeTextColor }) => {
  return (
    <li className="cursor-pointer group">
      <RouterNavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `relative px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
            isActive
              ? `bg-white/50 backdrop-blur-lg shadow-md transform scale-105 ${activeTextColor}`
              : 'text-gray-700 hover:bg-white/40 hover:backdrop-blur-sm'
          }`
        }
      >
        {children}
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
      </RouterNavLink>
    </li>
  );
};

const MobileNavLink = ({ to, children, onClick, activeTextColor }) => {
  return (
    <li className="w-full max-w-xs cursor-pointer">
      <RouterNavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center justify-center w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            isActive
              ? `bg-white/60 backdrop-blur-lg shadow-lg ${activeTextColor}`
              : 'bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/70 hover:shadow-md border border-white/20'
          }`
        }
      >
        {children}
      </RouterNavLink>
    </li>
  );
};

export default Navbar;

