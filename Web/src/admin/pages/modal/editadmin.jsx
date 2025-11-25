import React from "react";
import {
  FaEdit,
  FaTimes,
  FaUser,
  FaBirthdayCake,
  FaVenusMars,
  FaInfoCircle,
} from "react-icons/fa";

const EditBalita = ({ isOpen, onClose, balita, onSave, onChange }) => {
  if (!isOpen || !balita) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform animate-slideUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaEdit className="text-white w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Edit Data Balita
                </h2>
                <p className="text-white/80 text-sm">
                  Perbarui informasi balita
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="p-6 space-y-5"
        >
          {/* Nama Balita */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Balita <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="text"
                name="nama_balita"
                value={balita.nama_balita || ""}
                onChange={(e) => onChange("nama_balita", e.target.value)}
                placeholder="Masukkan nama balita"
                required
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Nama Orang Tua - READ ONLY */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Orang Tua
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={balita.nama_orangtua || "–"}
                readOnly
                className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-600 border border-gray-200 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBirthdayCake className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="date"
                name="tanggal_lahir"
                value={balita.tanggal_lahir || ""}
                onChange={(e) => onChange("tanggal_lahir", e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaVenusMars className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <select
                name="jenis_kelamin"
                value={balita.jenis_kelamin || ""}
                onChange={(e) => onChange("jenis_kelamin", e.target.value)}
                required
                className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
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

          {/* Status Gizi - READ ONLY (INFORMASI SAJA) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status Gizi Saat Ini
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaInfoCircle className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={balita.status_gizi || "Belum Diukur"}
                readOnly
                className="w-full pl-11 pr-4 py-3 bg-gray-100 text-gray-600 border border-gray-200 rounded-xl cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Status gizi diambil dari pengukuran terbaru. Untuk mengubahnya,
              silakan input pengukuran baru.
            </p>
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

      <style jsx>{`
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

export default EditBalita;
