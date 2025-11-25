import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-64 right-0 z-40 bg-white/95 backdrop-blur-lg 
      border-b border-gray-100 shadow-sm transition-all duration-300 ease-in-out`}
    >
      <div className="px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Kiri: Info Admin */}
          <div className="flex items-center gap-4">
            {/* Avatar dengan gradient modern */}
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span className="text-white text-base font-bold">AD</span>
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>

            {/* Info Admin */}
            <div className="hidden sm:block">
              <h2 className="text-sm font-bold text-gray-900">Admin Growthly</h2>
              <p className="text-xs text-gray-500 font-medium">Super Administrator</p>
            </div>
          </div>

          {/* Kanan: Tombol Logout */}
          <button
            onClick={handleLogout}
            className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                     bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-sm
                     shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40
                     hover:scale-105 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2
                     transition-all duration-200 overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <FaSignOutAlt className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Logout</span>
          </button>
        </div>
      </div>

      {/* Decorative bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </nav>
  );
};

export default Navbar;
