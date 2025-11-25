// src/pages/Customer.jsx
import React, { useState, useEffect } from "react";
import Table from "../Table/tablecustomers";
import { FaUsers, FaCheckCircle, FaUserClock } from "react-icons/fa";
import { getOrangtuaStats } from "../../services/customerService"; // ← tambahkan ini

const Customer = () => {
  const [statsData, setStatsData] = useState({
    total_orangtua: 0,
    total_bulan_ini: 0,
    total_tahun_ini: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getOrangtuaStats();
        setStatsData(response.stats);
      } catch (err) {
        console.error("Gagal memuat statistik:", err);
        setError(err.message || "Gagal memuat data statistik");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Hitung persentase aktif (opsional, tapi kamu pakai di mock)
  const activePercentage =
    statsData.total_orangtua > 0
      ? Math.round((statsData.total_bulan_ini / statsData.total_orangtua) * 100)
      : 0;

  const stats = [
    {
      label: "Total Orang Tua",
      value: loading ? "..." : statsData.total_orangtua,
      change: "+0%",
      icon: FaUsers,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Orang Tua Bulan Ini",
      value: loading ? "..." : statsData.total_bulan_ini,
      change: `${activePercentage}%`,
      icon: FaCheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Total Orang Tua Tahun Ini",
      value: loading ? "..." : statsData.total_tahun_ini,
      change: "0%",
      icon: FaUserClock,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-6 bg-white rounded-xl shadow">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTE4IDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

          <div className="relative flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <FaUsers className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Manajemen Orang Tua
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                Kelola data orang tua dan informasi akun orang tua
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 border-2 border-gray-100"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-400 to-purple-600"></div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaUsers className="text-blue-600" />
            Daftar Orang Tua
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <Table />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Customer;
