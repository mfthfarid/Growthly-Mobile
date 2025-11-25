import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUtensils,
  FaClock,
  FaUser,
  FaSearch,
  FaFire,
  FaBaby,
  FaUsers,
} from "react-icons/fa";
import EditModal from "./modal/editrecipe";
import {
  getRecipeStats,
  getAllRecipes,
  deleteRecipe,
  updateRecipe,
} from "../../services/recipeService";
import {
  showDeleteConfirm,
  showDeleteSuccess,
  showUpdateSuccess,
  showCrudError,
} from "../../utils/sweetAlertCrud";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]); // ✅ bukan static
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [recipeStats, setRecipeStats] = useState({ total: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  // ✅ Fetch daftar resep
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRecipes();
        // Transform: parse `isi` dan sesuaikan ke struktur UI
        const transformed = data.map((item) => {
          let parsedIsi = {
            author: "-",
            kalori: 0,
            durasi: 0,
            porsi: 1,
            usia: "0+",
            description: item.isi || "",
          };

          try {
            // Coba parse isi sebagai JSON
            if (item.isi && typeof item.isi === "string") {
              const parsed = JSON.parse(item.isi);
              parsedIsi = { ...parsedIsi, ...parsed };
            }
          } catch (e) {
            // Jika gagal parse, anggap `isi` adalah teks biasa → description saja
            parsedIsi.description = item.isi;
          }

          // URL foto lengkap
          const fotoUrl = item.foto
            ? `${import.meta.env.VITE_API_BASE_URL}/uploads/makanan/${
                item.foto
              }`
            : "https://via.placeholder.com/400x200?text=No+Image";

          return {
            id_recipe: item.id_makanan,
            food_name: item.nama_makanan,
            ...parsedIsi,
            foto: fotoUrl,
          };
        });

        setRecipes(transformed);
      } catch (err) {
        console.error("Gagal mengambil data makanan:", error);
        showCrudError("memuat data makanan", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch statistik
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getRecipeStats();
        const total = response.stats?.total_makanan || 0;
        setRecipeStats({ total });
      } catch (error) {
        console.error("Gagal memuat statistik resep:", error);
        setRecipeStats({ total: 0 });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const handleUpdateRecipe = async (updatedData, newFile) => {
    try {
      const isi = JSON.stringify({
        author: updatedData.author || "-",
        kalori: updatedData.kalori ? parseInt(updatedData.kalori, 10) : 0,
        durasi: updatedData.durasi ? parseInt(updatedData.durasi, 10) : 0,
        porsi: updatedData.porsi ? parseInt(updatedData.porsi, 10) : 1,
        usia: updatedData.usia || "0+",
        description: updatedData.description || "",
      });

      const payload = {
        nama_makanan: updatedData.food_name,
        isi: isi,
      };

      await updateRecipe(currentRecipe.id_recipe, payload, newFile);

      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id_recipe === currentRecipe.id_recipe
            ? {
                ...recipe,
                food_name: updatedData.food_name,
                author: updatedData.author,
                kalori: updatedData.kalori,
                durasi: updatedData.durasi,
                porsi: updatedData.porsi,
                usia: updatedData.usia,
                description: updatedData.description,
                ...(newFile && {
                  foto: URL.createObjectURL(newFile),
                }),
              }
            : recipe
        )
      );

      showUpdateSuccess("resep"); // ✅ Notifikasi sukses
      handleCloseModal();
    } catch (err) {
      console.error("Gagal memperbarui resep:", err);
      showCrudError("memperbarui resep", err.message); // ❌ Notifikasi error
    }
  };

  const handleEdit = (recipe) => {
    setCurrentRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRecipe(null);
  };

  const handleDelete = async (id) => {
    const result = await showDeleteConfirm("resep ini");
    if (!result.isConfirmed) return;

    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((recipe) => recipe.id_recipe !== id));
      showDeleteSuccess("resep"); // ✅ Notifikasi sukses
    } catch (err) {
      console.error("Gagal menghapus resep:", err);
      showCrudError("menghapus resep", err.message); // ❌ Notifikasi error
    }
  };
  // Filter berdasarkan pencarian
  const filteredRecipes = recipes.filter((recipe) =>
    [recipe.food_name, recipe.author, recipe.description].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Status loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-700">Memuat daftar resep...</div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-indigo-50/30 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30 shadow-lg">
                  <FaUtensils className="text-white w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                    Manajemen Resep
                  </h1>
                  <p className="text-white/90 text-sm mt-1">
                    Kelola resep nutrisi dan makanan sehat untuk stunting
                  </p>
                </div>
              </div>

              <NavLink
                to="/admin/tambahrecipe"
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-indigo-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <FaPlus className="w-4 h-4" />
                <span>Tambah Resep</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <StatCard
            title="Total Resep"
            value={loadingStats ? "..." : recipeStats.total}
            subtitle="Resep di database"
            icon={<FaUtensils className="w-6 h-6" />}
            gradient="from-indigo-500 to-purple-500"
          />
          <StatCard
            title="Resep Ditampilkan"
            value={filteredRecipes.length}
            subtitle="Hasil pencarian"
            icon={<FaSearch className="w-6 h-6" />}
            gradient="from-fuchsia-500 to-pink-500"
          />
        </div>

        {/* Search & List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-5 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-fuchsia-50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaUtensils className="w-5 h-5 text-indigo-600" />
                  Daftar Resep
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Kelola dan edit resep yang telah dipublikasi
                </p>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Cari resep..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full sm:w-80 border-2 border-gray-200 rounded-xl text-sm 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                           hover:border-gray-300 transition-all bg-white"
                />
              </div>
            </div>

            {searchTerm && (
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">
                  <FaSearch className="w-3 h-3" />
                  Pencarian: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
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

          {/* Recipes Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id_recipe}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={recipe.foto}
                      alt={recipe.food_name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/400x200?text=No+Image")
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEdit(recipe)}
                        className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all shadow-lg hover:scale-110 active:scale-95"
                        title="Edit Resep"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(recipe.id_recipe)}
                        className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow-lg hover:scale-110 active:scale-95"
                        title="Hapus Resep"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-xs font-semibold shadow-md">
                        <FaFire className="w-3 h-3 text-orange-600" />
                        {recipe.kalori} kkal
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1.5">
                        <FaClock className="w-3 h-3 text-indigo-500" />
                        <span>{recipe.durasi} menit</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaUser className="w-3 h-3 text-indigo-500" />
                        <span className="truncate max-w-[100px]">
                          {recipe.author}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-base font-bold text-indigo-900 mb-2 line-clamp-2 min-h-[48px]"
                      title={recipe.food_name}
                    >
                      {recipe.food_name}
                    </h3>

                    <p className="text-gray-700 text-sm line-clamp-3 mb-4 min-h-[60px]">
                      {recipe.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        <FaUsers className="w-3 h-3" />
                        {recipe.porsi} porsi
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">
                        <FaBaby className="w-3 h-3" />
                        {recipe.usia} bulan
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-indigo-200">
                      <button
                        onClick={() => handleEdit(recipe)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <FaEdit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(recipe.id_recipe)}
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
            <div className="p-12 text-center">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUtensils className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {searchTerm
                  ? "Tidak ada resep yang ditemukan"
                  : "Belum ada resep"}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {searchTerm
                  ? "Coba ubah kata kunci pencarian Anda"
                  : "Mulai dengan menambahkan resep pertama untuk platform"}
              </p>
              {!searchTerm && (
                <NavLink
                  to="/admin/tambahrecipe"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <FaPlus className="w-4 h-4" />
                  Tambah Resep Pertama
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>

      <EditModal
        showModal={showModal}
        currentRecipe={currentRecipe}
        handleCloseModal={handleCloseModal}
        onSubmit={handleUpdateRecipe}
      />
    </>
  );
};

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

export default Recipe;
