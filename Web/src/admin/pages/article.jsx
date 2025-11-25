// src/pages/admin/Article.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaNewspaper,
  FaCalendarAlt,
  FaUser,
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
} from "react-icons/fa";
import EditModal from "./modal/editartikel";
// --- Import service baru untuk statistik dan daftar artikel ---
import {
  getArtikelStats,
  getArtikelList,
  deleteArtikel,
  updateArtikel,
} from "../../services/articleService";
import {
  showDeleteConfirm,
  showDeleteSuccess,
  showUpdateSuccess,
  showCrudError,
} from "../../utils/sweetAlertCrud";

const Article = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [stats, setStats] = useState({ total_artikel: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const response = await getArtikelStats();
        setStats({
          total_artikel: response?.stats?.total_artikel || 0,
        });
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
        showCrudError("memuat data artikel", error.message);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getArtikelList();
        const transformedData = response.map((item) => ({
          id: item.id_artikel,
          judul: item.judul,
          author: item.penulis,
          lokasi: item.nama_posyandu || "–",
          tgl_penerbitan:
            item.created_at || item.tanggal_terbit || new Date().toISOString(),
          deskripsi: item.isi, // Gunakan isi dari API
          foto: item.foto
            ? `http://localhost:5000/uploads/artikel/${item.foto}`
            : "https://placehold.co/600x400/EEE/31343C?text=No+Image",
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
        showCrudError("memuat data artikel", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateArticle = async (updatedData, newFile) => {
    try {
      const payload = {
        judul: updatedData.judul,
        isi: updatedData.deskripsi,
        penulis: updatedData.author,
        nama_posyandu: updatedData.lokasi,
      };

      await updateArtikel(currentArticle.id, payload, newFile);

      setData((prev) =>
        prev.map((article) =>
          article.id === currentArticle.id
            ? {
                ...article,
                judul: updatedData.judul,
                author: updatedData.author,
                lokasi: updatedData.lokasi,
                tgl_penerbitan: updatedData.tgl_penerbitan,
                deskripsi: updatedData.deskripsi,
                ...(newFile && {
                  foto: URL.createObjectURL(newFile),
                }),
              }
            : article
        )
      );

      showUpdateSuccess("artikel");
      handleCloseModal();
    } catch (err) {
      console.error("Gagal memperbarui artikel:", err);
      showCrudError("memperbarui artikel", err.message);
    }
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await showDeleteConfirm("artikel ini");
    if (!result.isConfirmed) return;

    try {
      await deleteArtikel(id);
      setData((prevData) => prevData.filter((article) => article.id !== id));

      // Refresh statistik
      const response = await getArtikelStats();
      setStats({
        total_artikel: response?.stats?.total_artikel || 0,
      });

      showDeleteSuccess("artikel"); // ✅ Notifikasi sukses
    } catch (error) {
      console.error("Gagal menghapus artikel:", error);
      showCrudError("menghapus artikel", error.message); // ❌ Notifikasi error
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentArticle(null);
  };

  // Filter data berdasarkan search term
  const filteredData = data.filter(
    (item) =>
      (item.judul &&
        item.judul.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.author &&
        item.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.deskripsi &&
        item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.lokasi &&
        item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // --- Tampilkan skeleton loading saat data dari API sedang dimuat ---
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-purple-50/30 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Memuat data artikel...</p>
        </div>
      </div>
    );
  }
  // ------------------------------------------------------------------

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-purple-50/30 min-h-screen space-y-8">
      {/* Header Section dengan Gradient */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30 shadow-lg">
                <FaNewspaper className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  Manajemen Artikel
                </h1>
                <p className="text-white/90 text-sm mt-1">
                  Kelola artikel kesehatan, nutrisi, dan edukasi stunting
                </p>
              </div>
            </div>

            <NavLink
              to="/admin/tambahartikel"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-purple-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <FaPlus className="w-4 h-4" />
              <span>Tambah Artikel</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Stats Cards - 2 Cards Only */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {/* Kartu Statistik Total Artikel dari API */}
        <StatCard
          title="Total Artikel"
          value={statsLoading ? "..." : stats.total_artikel} // Tampilkan "..." saat loading
          subtitle="Artikel terpublikasi"
          icon={<FaNewspaper className="w-6 h-6" />}
          gradient="from-purple-500 to-indigo-500"
        />
        {/* Kartu Statistik Artikel Ditampilkan (dari state lokal) */}
        <StatCard
          title="Artikel Ditampilkan"
          value={filteredData.length} // Ini tetap dihitung dari state lokal
          subtitle="Hasil pencarian"
          icon={<FaSearch className="w-6 h-6" />}
          gradient="from-violet-500 to-purple-500"
        />
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 via-indigo-50 to-violet-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaNewspaper className="w-5 h-5 text-purple-600" />
                Daftar Artikel
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Kelola dan edit artikel yang telah dipublikasi
              </p>
            </div>

            {/* Search Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full sm:w-64 border-2 border-gray-200 rounded-xl text-sm 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                           hover:border-gray-300 transition-all bg-white"
              />
            </div>
          </div>

          {/* Search Tag */}
          {searchTerm && (
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                <FaSearch className="w-3 h-3" />
                Pencarian: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
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
            </div>
          )}
        </div>

        {/* Articles Grid */}
        {filteredData.length > 0 ? (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((article) => (
              <div
                key={article.id}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={article.foto}
                    alt={article.judul}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/600x400/EEE/31343C?text=No+Image")
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Action Buttons Overlay */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(article)}
                      className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all shadow-lg hover:scale-110 active:scale-95"
                      title="Edit Artikel"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow-lg hover:scale-110 active:scale-95"
                      title="Hapus Artikel"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Location Badge */}
                  {article.lokasi && article.lokasi !== "–" && (
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-xs font-semibold shadow-md">
                        <FaMapMarkerAlt className="w-3 h-3 text-purple-600" />
                        {article.lokasi}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="w-3 h-3 text-purple-500" />
                      <span>
                        {new Date(article.tgl_penerbitan).toLocaleDateString(
                          "id-ID",
                          { day: "2-digit", month: "short", year: "numeric" }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaUser className="w-3 h-3 text-purple-500" />
                      <span className="truncate max-w-[100px]">
                        {article.author}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base font-bold text-purple-900 mb-2 line-clamp-2 min-h-[48px]"
                    title={article.judul}
                  >
                    {article.judul}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-sm line-clamp-3 mb-4 min-h-[60px]">
                    {article.deskripsi}
                  </p>

                  {/* Footer Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-purple-200">
                    <button
                      onClick={() => handleEdit(article)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="p-12 text-center">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <p className="text-gray-500 font-medium">
              {searchTerm
                ? "Tidak ada artikel yang ditemukan"
                : "Tidak ada data artikel"}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <EditModal
        showModal={showModal}
        currentArticle={currentArticle}
        handleCloseModal={handleCloseModal}
        onSubmit={handleUpdateArticle} // Ganti handleSubmit dengan onSubmit
      />
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

export default Article;
