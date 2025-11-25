import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserShield,
  FaChartBar,
  FaNewspaper,
  FaUtensils,
  FaVideo,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../assets/logo_putih.png";

const Sidebar = () => {
  const handleLogoutClick = (event) => {
    event.preventDefault();
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      window.location.href = "/";
    }
  };

  const menuItems = [
    {
      path: "admin/dashboardadmin",
      icon: FaHome,
      label: "Dashboard",
      color: "from-blue-500 to-blue-600",
    },
    {
      path: "admin/customeradmin",
      icon: FaUsers,
      label: "Orang tua",
      color: "from-green-500 to-green-600",
    },
    {
      path: "admin/admin",
      icon: FaUserShield,
      label: "Balita",
      color: "from-purple-500 to-purple-600",
    },
    {
      path: "admin/reportadmin",
      icon: FaChartBar,
      label: "Gizi Balita",
      color: "from-orange-500 to-orange-600",
    },
    {
      path: "admin/articleadmin",
      icon: FaNewspaper,
      label: "Artikel",
      color: "from-pink-500 to-pink-600",
    },
    {
      path: "admin/recipeadmin",
      icon: FaUtensils,
      label: "Resep",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen flex flex-col
      bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900
      text-white shadow-2xl w-64 transition-all duration-300`}
    >
      {/* Header dengan logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-purple-700/50 bg-black/10">
        <div className="bg-white p-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200">
          <img src={Logo} alt="Growthly Logo" className="w-8 h-8" />
        </div>

        <div className="flex-1 overflow-hidden">
          <h1 className="text-xl font-bold text-white tracking-wide">
            Growthly
          </h1>
          <p className="text-xs text-purple-200">Admin Panel</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `group relative flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white text-purple-900 shadow-lg shadow-purple-500/20 scale-105"
                        : "text-purple-100 hover:bg-white/10 hover:translate-x-1"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Icon */}
                      <div
                        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300
                        ${
                          isActive
                            ? `bg-gradient-to-br ${item.color}`
                            : "bg-transparent group-hover:bg-white/20"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-white"
                              : "text-purple-200 group-hover:text-white"
                          }`}
                        />
                      </div>

                      {/* Label */}
                      <span className="ml-3">{item.label}</span>

                      {/* Indikator aktif */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"></div>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - Tombol Keluar */}
      <div className="p-3 border-t border-purple-700/50 bg-black/10">
        <button
          onClick={handleLogoutClick}
          className="group w-full flex items-center px-3 py-3 text-sm font-medium text-purple-100 hover:bg-red-500/20 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-red-500/30"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/20 group-hover:bg-red-500 transition-all duration-300">
            <FaSignOutAlt className="w-5 h-5 text-red-400 group-hover:text-white transition-colors duration-300" />
          </div>
          <span className="ml-3">Keluar</span>
        </button>
      </div>

      {/* Dekorasi gradasi */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 pointer-events-none"></div>
    </aside>
  );
};

export default Sidebar;
