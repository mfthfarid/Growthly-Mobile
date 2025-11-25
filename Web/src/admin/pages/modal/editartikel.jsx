import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaSave,
  FaEdit,
  FaHeading,
  FaUserEdit,
  FaMapMarkerAlt,
  FaImage,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";

// Komponen InputField yang sudah di-upgrade dengan glassmorphism effect
const InputField = ({
  id,
  label,
  placeholder,
  defaultValue,
  icon,
  type = "text",
  required = true,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2"
    >
      <span className="text-indigo-600">{icon}</span>
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative group">
      <input
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue}
        className="w-full rounded-xl border-2 border-gray-200 bg-white px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all text-base shadow-sm hover:shadow-md"
        placeholder={placeholder}
        required={required}
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  </div>
);

const EditModal = ({
  showModal,
  currentArticle = {},
  handleCloseModal,
  onSubmit,
}) => {
  // Ganti handleSubmit menjadi onSubmit
  const [newFile, setNewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Reset state saat modal ditutup atau artikel berubah
  useEffect(() => {
    if (!showModal) {
      setNewFile(null);
      setPreviewUrl(null);
    }
  }, [showModal]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
      // Hapus preview lama jika ada
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Bersihkan URL preview saat komponen unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Modifikasi handleSubmit untuk mengumpulkan data formulir dan memanggil onSubmit dari parent
  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedData = {
      judul: formData.get("judul"),
      author: formData.get("author"),
      lokasi: formData.get("lokasi"),
      tgl_penerbitan: formData.get("tgl_penerbitan"),
      deskripsi: formData.get("deskripsi"),
      // foto: newFile, // Kirim file baru jika ada
    };

    // Panggil fungsi onSubmit dari parent dengan data yang dikumpulkan dan file baru
    onSubmit(updatedData, newFile);
    // handleCloseModal(); // Opsional: tutup modal setelah submit
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-md z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-gray-100"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header dengan gradient modern */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>

              <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="bg-white/20 backdrop-blur-lg p-3 rounded-2xl shadow-lg"
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <FaEdit className="text-white w-6 h-6" />
                  </motion.div>
                  <div>
                    <motion.h2
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Edit Artikel
                    </motion.h2>
                    <motion.p
                      className="text-sm text-indigo-100 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Perbarui informasi artikel yang ada
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  onClick={handleCloseModal}
                  className="p-2.5 text-white hover:bg-white/20 rounded-xl transition-all hover:rotate-90 duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Form dengan scrollable content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <form onSubmit={onFormSubmit} className="p-8 space-y-6">
                {/* Judul Artikel dengan card effect */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <InputField
                    id="judul"
                    label="Judul Artikel"
                    placeholder="Masukkan judul artikel yang menarik"
                    defaultValue={currentArticle.judul}
                    icon={<FaHeading />}
                  />
                </motion.div>

                {/* Penulis & Lokasi */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <InputField
                    id="author"
                    label="Penulis"
                    placeholder="Nama penulis"
                    defaultValue={currentArticle.author}
                    icon={<FaUserEdit />}
                  />
                  <InputField
                    id="lokasi"
                    label="Lokasi"
                    placeholder="Lokasi artikel"
                    defaultValue={currentArticle.lokasi}
                    icon={<FaMapMarkerAlt />}
                    required={false}
                  />
                </motion.div>

                {/* Tanggal Penerbitan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <InputField
                    id="tgl_penerbitan"
                    label="Tanggal Penerbitan"
                    type="date"
                    defaultValue={currentArticle.tgl_penerbitan}
                    icon={<FaCalendarAlt />}
                  />
                </motion.div>

                {/* Deskripsi dengan modern textarea */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label
                    htmlFor="deskripsi"
                    className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2"
                  >
                    <span className="text-indigo-600">
                      <FaFileAlt />
                    </span>
                    Deskripsi Artikel <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative group">
                    <textarea
                      id="deskripsi"
                      name="deskripsi"
                      defaultValue={currentArticle.deskripsi}
                      rows={6}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-5 py-4 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all resize-y text-base shadow-sm hover:shadow-md"
                      placeholder="Tulis deskripsi artikel yang informatif dan menarik..."
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Upload Gambar dengan enhanced design */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-indigo-600">
                      <FaImage />
                    </span>
                    Ganti Foto Artikel
                  </label>
                  <label
                    htmlFor="foto"
                    className="relative flex flex-col items-center justify-center w-full h-56 border-3 border-indigo-300 border-dashed rounded-2xl cursor-pointer bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl"
                  >
                    {previewUrl || currentArticle.foto ? (
                      <div className="relative w-full h-full">
                        <img
                          src={previewUrl || currentArticle.foto}
                          alt="Preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/600x400/E2E8F0/AAAAAA?text=Gambar+Rusak";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                          <span className="text-white font-semibold text-sm">
                            Klik untuk ganti gambar
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <motion.div
                          className="text-indigo-600 bg-white p-5 rounded-2xl shadow-lg mb-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring" }}
                        >
                          <FaImage className="text-3xl" />
                        </motion.div>
                        <p className="text-lg font-bold text-gray-800 mb-1">
                          Klik untuk upload gambar baru
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          Format: JPG, PNG, WEBP (Max 5MB)
                        </p>
                        <div className="mt-4 px-4 py-2 bg-white rounded-full shadow-sm border border-indigo-200">
                          <span className="text-xs text-indigo-600 font-semibold">
                            Drag & Drop juga bisa!
                          </span>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      id="foto"
                      name="foto"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                </motion.div>

                {/* Tombol Aksi dengan enhanced buttons */}
                <motion.div
                  className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4 pt-8 border-t-2 border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all text-base shadow-md hover:shadow-lg border-2 border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaTimes /> Batal
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all text-base shadow-lg hover:shadow-2xl shadow-indigo-300 hover:shadow-indigo-400"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaSave /> Simpan Perubahan
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;
