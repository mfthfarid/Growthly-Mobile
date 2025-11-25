import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUserShield,
  FaSearch,
  FaFilter,
  FaCircle,
} from "react-icons/fa";
import Table from "../Table/tableadmin"; // Sesuaikan path jika perlu
import { getBalitaStats } from "../../services/adminService"; // Sesuaikan path

const Admin = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // State untuk statistik balita
  const [stats, setStats] = useState({
    total_balita: 0,
    total_laki_laki: 0,
    total_perempuan: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch statistik saat komponen dimuat
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getBalitaStats(); // ✅ ini langsung berisi { message, stats }
        setStats(data.stats); // ✅ bukan response.data.stats
      } catch (error) {
        console.error("Gagal memuat statistik balita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30 shadow-lg">
                <FaUserShield className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Manajemen Balita
                </h1>
                <p className="text-white/90 text-sm mt-1">Kelola Data Balita</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistik Admin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <StatCard
          title="Total Balita"
          value={loading ? "..." : stats.total_balita}
          subtitle="Terdaftar dalam sistem"
          icon={<FaUsers className="w-6 h-6" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Balita Laki Laki"
          value={loading ? "..." : stats.total_laki_laki}
          subtitle="Aktif saat ini"
          icon={<FaCircle className="w-6 h-6 animate-pulse" />}
          gradient="from-emerald-500 to-teal-500"
          isLive={true}
        />
        <StatCard
          title="Balita Perempuan"
          value={loading ? "..." : stats.total_perempuan}
          subtitle="Terdaftar dalam sistem"
          icon={<FaUserShield className="w-6 h-6" />}
          gradient="from-purple-500 to-indigo-500"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUsers className="w-5 h-5 text-purple-600" />
                Daftar Balita
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Kelola dan Pantau Data Balita
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Cari balita atau orang tua..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full sm:w-64 border-2 border-gray-200 rounded-xl text-sm 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                           hover:border-gray-300 transition-all bg-white"
                />
              </div>

              {/* Filter */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-10 pr-10 py-2.5 w-full sm:w-48 border-2 border-gray-200 rounded-xl text-sm 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                           hover:border-gray-300 transition-all bg-white appearance-none cursor-pointer"
                >
                  <option value="">Semua Status Gizi</option>
                  <option value="stunted">📉 Stunted</option>
                  <option value="severely stunted">📉 Severely Stunted</option>
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
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table searchQuery={searchQuery} roleFilter={roleFilter} />
        </div>
      </div>
    </div>
  );
};

// Komponen StatCard (tidak berubah)
const StatCard = ({ title, value, subtitle, icon, gradient, isLive }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1 group">
    <div className="flex items-start justify-between mb-4">
      <div
        className={`bg-gradient-to-br ${gradient} p-3 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      {isLive && (
        <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live
        </span>
      )}
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

export default Admin;
