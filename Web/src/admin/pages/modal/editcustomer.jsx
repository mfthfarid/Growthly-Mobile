import React from "react";
import {
  FaEdit,
  FaTimes,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";

const EditCustomer = ({ isOpen, onClose, customer, onSave, onChange }) => {
  if (!isOpen || !customer) return null;

  // Helper: konversi nilai pendapatan angka ke kategori
  const getIncomeCategory = (value) => {
    const num = Number(value);
    if (num < 3000000) return "rendah";
    if (num <= 5000000) return "sedang";
    return "tinggi";
  };

  // Helper: konversi kategori ke label
  const incomeOptions = [
    { value: "rendah", label: "Rendah (< Rp3.000.000)" },
    { value: "sedang", label: "Sedang (Rp3.000.000 – Rp5.000.000)" },
    { value: "tinggi", label: "Tinggi (> Rp5.000.000)" },
  ];

  const areaOptions = [
    { value: "dataran rendah", label: "Dataran Rendah" },
    { value: "pegunungan", label: "Pegunungan" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform animate-slideUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaEdit className="text-white w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Edit Data Orang Tua
                </h2>
                <p className="text-white/80 text-sm">
                  Perbarui informasi keluarga
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
          {/* Nama Orang Tua */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Orang Tua <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                value={customer.nama || ""}
                onChange={(e) => onChange("nama", e.target.value)}
                placeholder="Masukkan nama orang tua"
                required
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Username (READ-ONLY) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={customer.User?.username || customer.username || "-"}
                readOnly
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* No HP */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              No HP <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="tel"
                value={customer.no_hp || ""}
                onChange={(e) => onChange("no_hp", e.target.value)}
                placeholder="081234567890"
                required
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alamat <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <textarea
                value={customer.alamat || ""}
                onChange={(e) => onChange("alamat", e.target.value)}
                placeholder="Contoh: Jl. Mawar No. 10, RT 001/RW 002, Kel. Sukamaju, Kec. Sukamakmur, Kab. Bogor"
                required
                rows="3"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white resize-y"
              />
            </div>
          </div>

          {/* Pendapatan (Dropdown) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori Pendapatan <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaDollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <select
                value={customer.pendapatan || ""}
                onChange={(e) => onChange("pendapatan", e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white appearance-none"
                required
              >
                <option value="">Pilih kategori pendapatan</option>
                {incomeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Wilayah Tempat Tinggal (Dropdown) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Wilayah Tempat Tinggal <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
              </div>
              <select
                value={customer.wilayah || ""}
                onChange={(e) => onChange("wilayah", e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         hover:border-gray-300 transition-all outline-none bg-gray-50 focus:bg-white appearance-none"
                required
              >
                <option value="">Pilih wilayah</option>
                {areaOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
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
              className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
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

export default EditCustomer;
