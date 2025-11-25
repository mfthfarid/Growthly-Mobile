// src/pages/Login.jsx
import Foto from "../assets/logo_putih.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService"; // ← import dari service
import { showLoginSuccess, showLoginError } from "../../utils/sweetAlertLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await login({ username, password }); // ✅ bersih & reusable

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      await showLoginSuccess();
      navigate("/admin/dashboardadmin");
    } catch (err) {
      await showLoginError(err.message);
    }
  };

  // === JSX tetap sama seperti sebelumnya ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-fuchsia-400/25 to-pink-400/25 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 opacity-10 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <svg
            className="w-12 h-12 text-purple-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 2v7H2v6h7v7h6v-7h7V9h-7V2H9z" />
          </svg>
        </div>
        <div
          className="absolute top-1/2 right-20 opacity-10 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "0.5s" }}
        >
          <svg
            className="w-16 h-16 text-fuchsia-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 2v7H2v6h7v7h6v-7h7V9h-7V2H9z" />
          </svg>
        </div>
        <div
          className="absolute bottom-20 left-1/4 opacity-10 animate-bounce"
          style={{ animationDuration: "3.5s", animationDelay: "1s" }}
        >
          <svg
            className="w-10 h-10 text-violet-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 2v7H2v6h7v7h6v-7h7V9h-7V2H9z" />
          </svg>
        </div>

        <div
          className="absolute top-40 right-1/4 opacity-10 animate-pulse"
          style={{ animationDuration: "2s" }}
        >
          <svg
            className="w-14 h-14 text-pink-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/40">
            <div className="lg:grid lg:grid-cols-2 lg:gap-0">
              {/* Left Panel */}
              <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center w-full">
                  <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
                    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 inline-block shadow-2xl border border-white/30">
                      <img
                        src={Foto}
                        alt="Logo Growthly"
                        className="h-20 sm:h-24 w-auto mx-auto filter drop-shadow-2xl"
                      />
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
                    Growthly
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4"></div>
                  <p className="text-lg sm:text-xl text-white/90 font-semibold mb-3">
                    Admin Portal
                  </p>
                  <p className="text-sm sm:text-base text-white/80 max-w-sm mx-auto leading-relaxed">
                    Sistem Informasi Monitoring Stunting
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white font-medium border border-white/30">
                      🔒 Aman & Terpercaya
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white font-medium border border-white/30">
                      📊 Real-time Data
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Panel - Login Form */}
              <div className="p-6 sm:p-10 lg:p-12 flex items-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                      Selamat Datang! 👋
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                      Yuk, mulai kelola data dari sini.
                    </p>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl animate-shake">
                      <span className="text-sm text-red-700 font-medium">
                        {error}
                      </span>
                    </div>
                  )}

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username Input */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-semibold mb-2"
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <input
                        className="w-full pl-3 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm placeholder-gray-400"
                        type="text"
                        id="username"
                        placeholder="admin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    {/* Password Input */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-semibold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="relative group">
                        <input
                          className="w-full pl-3 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm placeholder-gray-400"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 text-sm sm:text-base"
                    >
                      Masuk ke Dashboard
                    </button>
                  </form>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-center text-xs text-gray-500">
                      🔐 Sistem dilindungi dengan enkripsi end-to-end
                    </p>
                    <p className="text-center text-xs text-gray-400 mt-2">
                      © 2025 Growthly. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
