// src/pages/admin/Tambahartikel.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaImage,
  FaHeading,
  FaUserEdit,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";
import { addArtikel } from "../../services/articleService";
import { showCreateSuccess, showCrudError } from "../../utils/sweetAlertCrud";

const Tambahartikel = () => {
  const [formData, setFormData] = useState({
    judul: "",
    author: "", // <-- Perhatikan: backend menggunakan 'penulis'
    lokasi: "",
    tgl_penerbitan: "",
    deskripsi: "", // <-- Perhatikan: backend menggunakan 'isi'
  });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Tambahkan state loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!file) {
      setError("Gambar artikel wajib diupload.");
      setLoading(false);
      return;
    }

    if (
      !formData.judul ||
      !formData.author ||
      !formData.tgl_penerbitan ||
      !formData.deskripsi
    ) {
      setError("Judul, Penulis, Tanggal Terbit, dan Deskripsi wajib diisi.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("judul", formData.judul);
      formDataToSend.append("isi", formData.deskripsi);
      formDataToSend.append("penulis", formData.author);
      formDataToSend.append("foto", file);

      const response = await addArtikel(formDataToSend);

      // ✅ Ganti alert dengan SweetAlert sukses
      await showCreateSuccess("artikel");
      navigate("/admin/admin/articleadmin"); // Sesuaikan path jika perlu
    } catch (err) {
      console.error("Gagal menambahkan artikel:", err);
      // ✅ Ganti setError/alert error dengan SweetAlert error
      showCrudError(
        "menambahkan artikel",
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* 🎨 Header dengan gradien ungu-biru */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 sm:p-8 text-white flex items-center gap-4">
          <FaBookOpen className="text-4xl" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Informasi Artikel
            </h2>
            <p className="text-white/90 text-sm mt-1">
              Lengkapi detail artikel dengan Tambah yang akurat
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* 🎨 Pesan error (tetap merah) */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-sm flex items-center gap-2">
              <FaInfoCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 🎨 Upload Gambar Kustom (Biru-Ungu) */}
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Gambar Artikel <span className="text-red-500">*</span>
              </label>
              <label
                htmlFor="foto"
                className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-all"
              >
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt="Preview Artikel"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <div className="text-indigo-500 bg-indigo-100 p-4 rounded-full">
                      <FaImage className="text-4xl" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">
                      Klik untuk upload gambar
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

            {/* 🎨 Judul Artikel */}
            <div>
              <label
                htmlFor="judul"
                className="block text-gray-800 text-sm font-semibold mb-2"
              >
                Judul Artikel <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaHeading className="text-lg" />
                </span>
                <input
                  type="text"
                  id="judul"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  placeholder="Contoh: Tips Mencegah Stunting pada Balita"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 pl-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-base"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Buat judul yang menarik dan informatif
              </p>
            </div>

            {/* 🎨 Grid 3 Kolom */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Penulis */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-gray-800 text-sm font-semibold mb-2"
                >
                  Penulis <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaUserEdit className="text-lg" />
                  </span>
                  <input
                    type="text"
                    id="author"
                    name="author" // <-- Ini akan dikirim sebagai 'penulis' ke backend
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Nama penulis"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 pl-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-base"
                    required
                  />
                </div>
              </div>

              {/* Lokasi */}
              <div>
                <label
                  htmlFor="lokasi"
                  className="block text-gray-800 text-sm font-semibold mb-2"
                >
                  Lokasi
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaMapMarkerAlt className="text-lg" />
                  </span>
                  <input
                    type="text"
                    id="lokasi"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    placeholder="Kota/Kabupaten"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 pl-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-base"
                  />
                </div>
              </div>

              {/* Tanggal Terbit */}
              <div>
                <label
                  htmlFor="tgl_penerbitan"
                  className="block text-gray-800 text-sm font-semibold mb-2"
                >
                  Tanggal Terbit <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaCalendarAlt className="text-lg" />
                  </span>
                  <input
                    type="date"
                    id="tgl_penerbitan"
                    name="tgl_penerbitan"
                    value={formData.tgl_penerbitan}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 pl-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-base"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 🎨 Deskripsi */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="deskripsi"
                  className="block text-gray-800 text-sm font-semibold"
                >
                  Deskripsi Artikel <span className="text-red-500">*</span>
                </label>
                <span className="text-sm text-gray-500">
                  {formData.deskripsi.length} karakter
                </span>
              </div>
              <textarea
                id="deskripsi"
                name="deskripsi" // <-- Ini akan dikirim sebagai 'isi' ke backend
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Tulis konten artikel secara lengkap dan informatif..."
                rows="10"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-y text-base"
                minLength="100"
                required
              ></textarea>
              <p className="text-xs text-gray-500 mt-2">
                Minimum 100 karakter untuk deskripsi yang baik
              </p>
            </div>

            {/* 🎨 Card Informasi Penting (Biru) */}
            <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mt-8 rounded-md flex items-start gap-3">
              <FaInfoCircle className="text-xl text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Tips Menulis Artikel Berkualitas
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Gunakan bahasa yang mudah dipahami</li>
                  <li>Sertakan fakta dan data yang akurat</li>
                  <li>Struktur artikel dengan paragraf yang jelas</li>
                  <li>Gunakan gambar yang relevan dan berkualitas</li>
                </ul>
              </div>
            </div>

            {/* 🎨 Tombol Aksi (Biru-Ungu) */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4 pt-8 mt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/admin/article")} // Sesuaikan path
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg hover:shadow-xl transition-all text-base shadow-sm"
                disabled={loading} // Nonaktifkan saat loading
              >
                <FaArrowLeft /> Batal
              </button>
              <button
                type="submit"
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-base shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 active:scale-95"
                }`}
                disabled={loading} // Nonaktifkan saat loading
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <FaSave /> Simpan Artikel
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

export default Tambahartikel;
