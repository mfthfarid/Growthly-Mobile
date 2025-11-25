import React, { useState, useEffect } from "react";
import {
  FaExclamationTriangle,
  FaUsers,
  FaEnvelope,
  FaCommentDots,
  FaFilter,
  FaSearch,
  FaBan,
  // Ikon yang diperbaiki untuk stunting
  FaChild, // Untuk Total Balita
  FaExclamationCircle, // Untuk Balita Stunted
  FaHeartbeat, // Untuk Balita Severely Stunted
  FaSmile, // Untuk Balita Tinggi/Normal
  FaCheckCircle, // Untuk Balita Normal
} from "react-icons/fa";
import Table from "../Table/tablereport";
import { getGiziStats } from "../../services/pengukuranService"; // Sesuaikan path

const Report = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState({
    total_balita: 0,
    stunted: 0,
    severely_stunted: 0,
    tinggi: 0,
    normal: 0,
  });
  const [loading, setLoading] = useState(true);

  // Definisikan map untuk status gizi (agar rapi)
  const statusGiziMap = {
    stunted: {
      label: "Stunted",
      color: "bg-yellow-100 text-yellow-700",
      hover: "hover:bg-yellow-200",
    },
    severely_stunted: {
      // <-- Gunakan format yang dikembalikan backend
      label: "Severely Stunted",
      color: "bg-red-100 text-red-700",
      hover: "hover:bg-red-200",
    },
    tinggi: {
      label: "Tinggi",
      color: "bg-blue-100 text-blue-700",
      hover: "hover:bg-blue-200",
    },
    normal: {
      label: "Normal",
      color: "bg-green-100 text-green-700",
      hover: "hover:bg-green-200",
    },
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getGiziStats();
        // Pastikan struktur respons sesuai
        setStats({
          total_balita: response.stats.total_balita || 0,
          stunted: response.stats.stunted || 0,
          severely_stunted: response.stats.severely_stunted || 0, // ✅ Cocok dengan backend
          tinggi: response.stats.tinggi || 0,
          normal: response.stats.normal || 0,
        });
      } catch (error) {
        console.error("Gagal mengambil statistik gizi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  // Fungsi untuk format label filter
  // Fungsi bantu untuk konversi kebab-case ke snake_case
  const kebabToSnakeCase = (str) => str.replace(/-/g, "_");

  const getFilterLabel = (filterValue) => {
    // Konversi filterValue dari kebab ke snake untuk pencarian di map
    const snakeCaseKey = kebabToSnakeCase(filterValue);
    return statusGiziMap[snakeCaseKey]?.label || filterValue;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-orange-50/30 min-h-screen">
      {/* Header Section dengan Gradient */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30 shadow-lg">
                <FaExclamationTriangle className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  Manajemen Laporan Gizi Balita
                </h1>
                <p className="text-white/90 text-sm mt-1">
                  Kelola dan Pantau Laporan Gizi Balita
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {/* 5 kolom dengan icon yang diperbaiki */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
        <StatCard
          title="Total Balita"
          value={loading ? "..." : stats.total_balita}
          subtitle="Total data balita"
          icon={<FaChild className="w-6 h-6" />}
          gradient="from-purple-500 to-indigo-500"
        />
        <StatCard
          title="Balita Stunted"
          value={loading ? "..." : stats.stunted}
          subtitle="Perlu perhatian"
          icon={<FaExclamationCircle className="w-6 h-6" />}
          gradient="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Severely Stunted"
          value={loading ? "..." : stats.severely_stunted}
          subtitle="Butuh tindakan segera"
          icon={<FaHeartbeat className="w-6 h-6" />}
          gradient="from-red-500 to-pink-500"
        />
        <StatCard
          title="Tinggi"
          value={loading ? "..." : stats.tinggi}
          subtitle="Pertumbuhan baik"
          icon={<FaSmile className="w-6 h-6" />}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Normal"
          value={loading ? "..." : stats.normal}
          subtitle="Status normal"
          icon={<FaCheckCircle className="w-6 h-6" />}
          gradient="from-blue-500 to-cyan-500"
        />
      </div>

      {/* Table Section dengan Enhanced Design */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUsers className="w-5 h-5 text-purple-600" />
                Daftar Laporan Gizi Balita
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Kelola dan tinjau semua laporan yang masuk
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="w-4 h-4 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Cari nama balita, posyandu, atau catatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full sm:w-64 border-2 border-gray-200 rounded-xl text-sm 
                                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                                   hover:border-gray-300 transition-all bg-white"
                />
              </div>

              {/* Status Gizi Filter */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="w-4 h-4 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)} // Filter berdasarkan status_gizi
                  className="pl-10 pr-10 py-2.5 w-full sm:w-48 border-2 border-gray-200 rounded-xl text-sm 
                                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                                   hover:border-gray-300 transition-all bg-white appearance-none cursor-pointer"
                >
                  <option value="">Semua Status Gizi</option>
                  <option value="stunted">📉 Stunted</option>
                  <option value="severely-stunted">📉 Severely Stunted</option>
                  <option value="tinggi">📈 Tinggi</option>
                  <option value="normal">✅ Normal</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tags (if active) */}
          {(searchQuery || statusFilter) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium">
                  <FaSearch className="w-3 h-3" />
                  Pencarian: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}
              {statusFilter && (
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 ${
                    statusGiziMap[statusFilter]?.color ||
                    "bg-gray-100 text-gray-700"
                  } rounded-lg text-xs font-medium`}
                >
                  <FaFilter className="w-3 h-3" />
                  Filter: {getFilterLabel(statusFilter)}
                  <button
                    onClick={() => setStatusFilter("")}
                    className={`${
                      statusGiziMap[statusFilter]?.hover || "hover:bg-gray-200"
                    } rounded-full p-0.5 transition-colors`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table searchQuery={searchQuery} statusFilter={statusFilter} />
        </div>
      </div>
    </div>
  );
};

// Enhanced Stats Card dengan Gradient
const StatCard = ({ title, value, subtitle, icon, gradient }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1 group">
    <div className="flex items-start justify-between mb-4">
      <div
        className={`bg-gradient-to-br ${gradient} p-3 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
    </div>
    <div>
      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
        {title}
      </p>
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  </div>
);

export default Report;
