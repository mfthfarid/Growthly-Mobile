import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookReader,
  FaImage,
  FaUtensils,
  FaInfoCircle,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";
import { addRecipe } from "../../services/recipeService";
import { showCreateSuccess, showCrudError } from "../../utils/sweetAlertCrud";

const TambahRecipe = () => {
  const [food_name, setFoodName] = useState("");
  const [isi, setIsi] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!file) {
      setError("Foto resep wajib diupload.");
      setIsSubmitting(false);
      return;
    }

    if (!food_name.trim()) {
      setError("Nama makanan wajib diisi.");
      setIsSubmitting(false);
      return;
    }

    if (!isi.trim()) {
      setError("Bagian bahan & cara pembuatan wajib diisi.");
      setIsSubmitting(false);
      return;
    }

    try {
      await addRecipe(
        {
          nama_makanan: food_name,
          isi: isi,
        },
        file
      );

      // ✅ Ganti alert dengan SweetAlert sukses
      await showCreateSuccess("resep");
      navigate("/admin/admin/recipeadmin");
    } catch (err) {
      console.error("Error:", err);
      // ✅ Ganti alert error dengan SweetAlert error
      showCrudError("menambahkan resep", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 sm:p-8 text-white flex items-center gap-4">
          <FaBookReader className="text-4xl" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Tambah Resep</h2>
            <p className="text-sm sm:text-base opacity-90">
              Masukkan nama, foto, dan deskripsi resep (bahan & cara membuat)
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-sm flex items-center gap-2">
              <FaInfoCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Foto */}
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Foto Resep <span className="text-red-500">*</span>
              </label>
              <label
                htmlFor="foto"
                className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-all"
              >
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="Preview Resep"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <div className="text-indigo-500 bg-indigo-100 p-4 rounded-full">
                      <FaImage className="text-4xl" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">
                      Klik untuk upload foto makanan
                    </p>
                    <p className="text-sm text-gray-500">
                      Format: JPG, PNG, WEBP (Maks. 5MB)
                    </p>
                  </>
                )}
                <input
                  type="file"
                  id="foto"
                  name="foto"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/png, image/jpeg, image/webp"
                  required
                />
              </label>
            </div>

            {/* Nama Makanan */}
            <div>
              <label
                htmlFor="food_name"
                className="block text-gray-800 text-sm font-semibold mb-2"
              >
                Nama Makanan <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaUtensils className="text-lg" />
                </span>
                <input
                  type="text"
                  id="food_name"
                  value={food_name}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="Contoh: Bubur Ayam Jagung"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 pl-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-base"
                  required
                />
              </div>
            </div>

            {/* Isi (Bahan & Cara Membuat) */}
            <div>
              <label
                htmlFor="isi"
                className="block text-gray-800 text-sm font-semibold mb-2"
              >
                Bahan & Cara Membuat <span className="text-red-500">*</span>
              </label>
              <textarea
                id="isi"
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                placeholder="Tuliskan daftar bahan, takaran, dan langkah-langkah pembuatan secara lengkap..."
                rows="10"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-y text-base"
                required
              ></textarea>
              <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
                <FaInfoCircle /> Pastikan deskripsi jelas dan mudah diikuti
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4 pt-8 mt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/admin/admin/recipeadmin")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all text-base shadow-sm"
              >
                <FaArrowLeft /> Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg text-base shadow-lg transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-purple-200 hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  "Menyimpan..."
                ) : (
                  <>
                    {" "}
                    <FaSave /> Simpan Resep
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahRecipe;
