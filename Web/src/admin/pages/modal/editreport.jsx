// src/components/Modal/EditPengukuranModal.jsx
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTimes,
  FaRuler,
  FaWeight,
  FaStickyNote,
  FaClinicMedical,
} from "react-icons/fa";

const EditPengukuranModal = ({
  isOpen,
  onClose,
  pengukuran,
  onSave,
  onChange,
}) => {
  const [formData, setFormData] = useState({
    tinggi_badan: "",
    berat_badan: "",
    status_gizi: "",
    catatan: "",
    nama_posyandu: "",
  });

  useEffect(() => {
    if (pengukuran) {
      setFormData({
        tinggi_badan: pengukuran.tinggi_badan || "",
        berat_badan: pengukuran.berat_badan || "",
        status_gizi: pengukuran.status_gizi || "",
        catatan: pengukuran.catatan || "",
        nama_posyandu: pengukuran.nama_posyandu || "",
      });
    }
  }, [pengukuran]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Kirim data baru ke fungsi di CustomTable
    onClose(); // Tutup modal setelah submit
  };

  if (!isOpen || !pengukuran) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform animate-fadeIn animate-slideUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaEdit className="text-white w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Edit Data Pengukuran
                </h2>
                <p className="text-white/80 text-sm">
                  Nama Balita:{" "}
                  <span className="font-semibold">
                    {pengukuran.Balitum?.nama_balita || "–"}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nama Balita - READ ONLY */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Balita
            </label>
            <div className="relative">
              <input
                type="text"
                value={pengukuran.Balitum?.nama_balita || "–"}
                readOnly
                className="w-full pl-4 pr-4 py-3 bg-gray-100 text-gray-600 border border-gray-200 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tanggal Ukur - READ ONLY */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal Ukur
            </label>
            <div className="relative">
              <input
                type="text"
                value={new Date(pengukuran.tanggal_ukur).toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
                readOnly
                className="w-full pl-4 pr-4 py-3 bg-gray-100 text-gray-600 border border-gray-200 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tinggi Badan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tinggi Badan (cm) <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaRuler className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="number"
                name="tinggi_badan"
                value={formData.tinggi_badan}
                onChange={handleChange}
                required
                min="0"
                step="0.1"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Berat Badan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Berat Badan (kg) <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaWeight className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="number"
                name="berat_badan"
                value={formData.berat_badan}
                onChange={handleChange}
                required
                min="0"
                step="0.1"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Status Gizi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status Gizi <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <select
                name="status_gizi"
                value={formData.status_gizi}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="">Pilih Status Gizi</option>
                <option value="normal">Normal</option>
                <option value="tinggi">Tinggi</option>
                <option value="stunted">Stunted</option>
                <option value="severely-stunted">Severely Stunted</option>
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

          {/* Catatan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Catatan
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaStickyNote className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <textarea
                name="catatan"
                value={formData.catatan}
                onChange={handleChange}
                placeholder="Catatan tambahan..."
                rows="3"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white resize-none"
              />
            </div>
          </div>

          {/* Nama Posyandu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Posyandu
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaClinicMedical className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="text"
                name="nama_posyandu"
                value={formData.nama_posyandu}
                onChange={handleChange}
                placeholder="Nama posyandu tempat pengukuran"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 border border-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-5 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EditPengukuranModal;
