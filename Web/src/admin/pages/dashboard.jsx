// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaBook,
  FaNewspaper,
  FaExclamationTriangle,
  FaChartLine,
  FaBaby,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFilter,
} from "react-icons/fa";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getDashboardStats } from "../../services/dashboardService"; // Pastikan path ini benar

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("current"); // Filter tahun global

  // State untuk data dashboard dari API
  const [dashboardData, setDashboardData] = useState({
    totalStunting: 0,
    prevalensi: 0,
    totalBalita: 0,
    sudahDiukur: 0,
    statusGizi: [],
    trendBulanan: [],
    distribusiGender: [],
  });
  const [loading, setLoading] = useState(true);

  // useEffect untuk mengambil data dari API saat komponen mount atau selectedYear berubah
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Tentukan tahun yang akan diambil datanya
        const yearToFetch =
          selectedYear === "current"
            ? new Date().getFullYear()
            : parseInt(selectedYear, 10);

        // Panggil service untuk mendapatkan data
        const statsResponse = await getDashboardStats(yearToFetch);

        // Update state dengan data dari API
        // Pastikan struktur respons API cocok dengan yang diharapkan
        setDashboardData({
          totalStunting: statsResponse.totalStunting || 0,
          prevalensi: statsResponse.prevalensi || 0,
          totalBalita: statsResponse.totalBalita || 0,
          sudahDiukur: statsResponse.sudahDiukur || 0,
          statusGizi: statsResponse.statusGizi || [],
          trendBulanan: statsResponse.trendBulanan || [],
          distribusiGender: statsResponse.distribusiGender || [],
        });
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        // Set ke nilai default atau tampilkan error
        setDashboardData({
          totalStunting: 0,
          prevalensi: 0,
          totalBalita: 0,
          sudahDiukur: 0,
          statusGizi: [],
          trendBulanan: [],
          // distribusiUsia: [], // DIHAPUS
          distribusiGender: [],
        });
        alert("Gagal mengambil data dashboard. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]); // Dependency array: fetchData akan dipanggil ulang jika selectedYear berubah

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen space-y-8">
      {/* Header dengan Filter Tahun */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              Dashboard Monitoring Stunting
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              Pemantauan real-time kasus stunting dan gizi buruk balita 📊
            </p>
          </div>

          {/* Filter Tahun Global */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
            <FaCalendarAlt className="w-5 h-5 text-white/80" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent text-white font-semibold text-sm focus:outline-none cursor-pointer appearance-none pr-8"
            >
              <option value="current" className="bg-purple-600">
                Data Terkini ({new Date().getFullYear()})
              </option>
              {/* Generate options tahun dari data jika tersedia, atau hardcode range */}
              {(() => {
                const currentYear = new Date().getFullYear();
                const startYear = 2020; // Ganti dengan tahun awal data Anda dari backend
                const options = [];
                for (let y = currentYear; y >= startYear; y--) {
                  options.push(
                    <option key={y} value={y} className="bg-purple-600">
                      Tahun {y}
                    </option>
                  );
                }
                return options;
              })()}
            </select>
            <svg
              className="w-4 h-4 text-white/80 absolute right-2 pointer-events-none"
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

      {/* Bagian 1: Gambaran Umum (Executive Summary) */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-purple-100 p-2 rounded-lg">
            <FaChartLine className="text-purple-600 w-5 h-5" />
          </span>
          Gambaran Umum Stunting{" "}
          {selectedYear !== "current" && `Tahun ${selectedYear}`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          <StatCard
            icon={<FaBaby className="w-6 h-6" />}
            label="Total Balita"
            value={dashboardData.totalBalita}
            gradient="from-green-500 to-emerald-600"
            desc="Terdata"
          />
          <StatCard
            icon={<FaExclamationTriangle className="w-6 h-6" />}
            label="Jumlah Stunting"
            value={dashboardData.totalStunting}
            gradient="from-red-500 to-orange-600"
            desc={
              selectedYear !== "current" ? `Tahun ${selectedYear}` : "Tahun ini"
            }
          />
          <StatCard
            icon={<FaMapMarkerAlt className="w-6 h-6" />}
            label="Cakupan Pengukuran"
            value={`${dashboardData.sudahDiukur}%`}
            gradient="from-purple-500 to-pink-600"
            desc="Balita yang sudah diukur"
          />
          <StatCard
            icon={<FaUser className="w-6 h-6" />}
            label="Status Normal"
            value={
              dashboardData.statusGizi.find(
                (s) => s.name.toLowerCase() === "normal"
              )?.value || 0
            }
            gradient="from-blue-500 to-cyan-600"
            desc="Jumlah balita normal"
          />
          <StatCard
            icon={<FaChartLine className="w-6 h-6" />}
            label="Prevalensi Stunting"
            value={`${dashboardData.prevalensi}%`}
            gradient="from-orange-500 to-yellow-600"
            desc="Persentase dari total balita"
          />
        </div>
      </div>

      {/* Bagian 2: Pemantauan Tren dan Status Gizi */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-blue-100 p-2 rounded-lg">
            <FaChartLine className="text-blue-600 w-5 h-5" />
          </span>
          Pemantauan Tren dan Status Gizi
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Tren Prevalensi & Kasus Baru Bulanan */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Tren & Kasus Baru Stunting (Bulanan{" "}
              {selectedYear !== "current"
                ? selectedYear
                : new Date().getFullYear()}
              )
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={dashboardData.trendBulanan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="bulan"
                  stroke="#6B7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#8B5CF6"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#EF4444"
                  style={{ fontSize: "12px" }}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="kasusStunting"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#8B5CF6" }}
                  name="Total Kasus Stunting"
                />
                <Bar
                  yAxisId="right"
                  dataKey="kasusBaru"
                  fill="#EF4444"
                  opacity={0.6}
                  radius={[4, 4, 0, 0]}
                  name="Kasus Baru"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Distribusi Status Gizi */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Distribusi Status Gizi Balita
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.statusGizi}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {dashboardData.statusGizi.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen StatCard
const StatCard = ({ icon, label, value, gradient, desc }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 transform hover:-translate-y-1">
    <div className="flex items-start justify-between mb-3">
      <div
        className={`bg-gradient-to-br ${gradient} p-3 rounded-xl text-white shadow-lg`}
      >
        {icon}
      </div>
    </div>
    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
      {label}
    </p>
    <h2 className="text-3xl font-bold text-gray-900 mb-1">{value}</h2>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

export default Dashboard;
