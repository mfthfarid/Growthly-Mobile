import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BrainCircuit, Check, ChevronsRight, Loader } from "lucide-react";

const showPredictionResult = (prediction) => {
  let result = {
    title: "Hasil Tidak Diketahui",
    description: "Silakan masukkan data dengan benar dan coba lagi.",
    color: "gray",
    icon: "❓",
  };

  // Mapping prediksi numerik ke pesan
  switch (prediction) {
    case 0: // Normal
      result = {
        title: "Normal",
        description:
          "Selamat! Status gizi anak Anda tergolong dalam kategori normal. Pertahankan pola makan dan gaya hidup sehat.",
        color: "green",
        icon: "🟢",
      };
      break;
    case 1: // Severely Stunted
      result = {
        title: "Severely Stunted",
        description:
          "Status gizi anak Anda tergolong dalam kategori sangat pendek (severely stunted). Segera konsultasikan dengan ahli gizi atau dokter anak.",
        color: "red",
        icon: "🔴",
      };
      break;
    case 2: // Stunted
      result = {
        title: "Stunted",
        description:
          "Status gizi anak Anda tergolong dalam kategori pendek (stunted). Disarankan untuk berkonsultasi dengan ahli gizi untuk perbaikan nutrisi.",
        color: "orange",
        icon: "🟠",
      };
      break;
    case 3: // Tinggi
      result = {
        title: "Tinggi",
        description:
          "Status gizi anak Anda tergolong dalam kategori tinggi. Ini adalah indikator yang baik, terus pantau pertumbuhannya.",
        color: "blue",
        icon: "🔵",
      };
      break;
    default:
      // Jika prediksi tidak sesuai dengan yang diharapkan
      console.warn(`Nilai prediksi tidak dikenali: ${prediction}`);
      break;
  }

  // Varians warna untuk styling SweetAlert
  const colorVariants = {
    red: { text: "text-red-800" },
    orange: { text: "text-orange-800" },
    green: { text: "text-green-800" },
    blue: { text: "text-blue-800" },
    gray: { text: "text-gray-800" },
  };

  const colors = colorVariants[result.color] || colorVariants.gray;

  // Tampilkan SweetAlert
  Swal.fire({
    title: `<span class="${colors.text}">${result.icon} ${result.title}</span>`,
    html: `<p class="text-gray-600">${result.description}</p>`,
    icon:
      result.color === "green"
        ? "success"
        : result.color === "gray"
        ? "question"
        : "warning",
    background: "#fff",
    confirmButtonText: "Mengerti",
    confirmButtonColor: "#34D399",
  });
};

// Komponen utama Prediksi
const Prediksi = () => {
  const [formData, setFormData] = useState({
    umurAnak: "",
    jenisKelamin: "", // Default kosong
    tinggiBadan: "",
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  // Observer untuk animasi saat elemen masuk viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    // Cleanup observer
    return () => {
      elements.forEach((el) => {
        if (observer) observer.unobserve(el);
      });
    };
  }, []); // Dependency array kosong berarti hanya dijalankan sekali

  // Handler perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validasi dasar di frontend (opsional, backend juga harus validasi)
    const umur = parseInt(formData.umurAnak, 10);
    const tinggi_badan = parseFloat(formData.tinggiBadan);

    if (isNaN(umur) || isNaN(tinggi_badan) || !formData.jenisKelamin) {
      Swal.fire({
        title: "Data Tidak Lengkap",
        text: "Harap isi semua kolom dengan benar.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      setLoading(false);
      return;
    }

    try {
      // Siapkan data untuk dikirim
      // KONSISTENSI: Kirim string jenis kelamin, biarkan backend encode
      const requestData = {
        umur: umur,
        jenis_kelamin: formData.jenisKelamin, // Kirim string "Laki-Laki" atau "Perempuan"
        tinggi_badan: tinggi_badan,
      };

      console.log("Mengirim data ke backend:", requestData); // Untuk debugging

      // Kirim permintaan ke backend Node.js
      const response = await axios.post(
        "http://localhost:5000/api/predict",
        requestData
      );

      console.log("Menerima respons dari backend:", response.data); // Untuk debugging

      // Asumsi respons memiliki struktur { prediction: number, message: string }
      const { prediction } = response.data;

      if (typeof prediction === "number") {
        // Tampilkan hasil menggunakan fungsi terpisah
        showPredictionResult(prediction);
      } else {
        // Tangani jika struktur respons tidak sesuai
        console.error("Struktur respons tidak sesuai:", response.data);
        throw new Error("Respons dari server tidak valid.");
      }
    } catch (error) {
      console.error("Error saat membuat permintaan:", error);

      // Tangani error dari Axios (jaringan, timeout, status 4xx/5xx)
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server merespons dengan status error (4xx, 5xx)
          const status = error.response.status;
          let message = "Terjadi kesalahan pada server.";
          if (status === 400) {
            message =
              "Data yang dikirim tidak valid. Periksa kembali input Anda.";
          } else if (status >= 500) {
            message =
              "Server sedang mengalami masalah. Silakan coba lagi nanti.";
          }
          Swal.fire({
            title: `Error ${status}`,
            text: message,
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (error.request) {
          // Permintaan dibuat tapi tidak ada respons (timeout, offline)
          Swal.fire({
            title: "Tidak Ada Respons",
            text: "Tidak dapat menghubungi server. Periksa koneksi internet Anda.",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          // Kesalahan lain saat mengatur permintaan
          Swal.fire({
            title: "Error",
            text: `Terjadi kesalahan: ${error.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        // Error lainnya (bukan Axios)
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan yang tidak terduga. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section
        id="prediksi-hero"
        className="pt-32 pb-20 text-center relative"
        data-animate
      >
        <div className="container mx-auto px-6 relative">
          <h1
            className={`text-4xl md:text-6xl font-bold text-gray-800 transition-all duration-1000 ${
              isVisible["prediksi-hero"]
                ? "opacity-100"
                : "opacity-0 translate-y-4"
            }`}
          >
            Prediksi Status Gizi
            <span className="block bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mt-2">
              Berbasis AI
            </span>
          </h1>
          <p
            className={`mt-6 text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible["prediksi-hero"]
                ? "opacity-100"
                : "opacity-0 translate-y-4"
            }`}
          >
            Gunakan teknologi cerdas kami untuk mendapatkan prediksi status gizi
            anak Anda. Cukup masukkan data di bawah ini untuk memulai deteksi
            dini stunting.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-prediksi" className="py-10 pb-20" data-animate>
        <div className="container mx-auto px-6">
          <div
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 bg-white/50 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-xl border border-white/30 transition-all duration-1000 ${
              isVisible["form-prediksi"] ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image Placeholder */}
            <div className="lg:w-2/5 w-full">
              <img
                src="https://placehold.co/600x700/e9d5ff/333?text=Prediksi+Gizi+Anak"
                alt="Prediksi Gizi Anak"
                className="rounded-2xl w-full object-cover shadow-lg"
              />
            </div>

            {/* Form */}
            <div className="lg:w-3/5 w-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <BrainCircuit className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Mulai Prediksi
                  </h2>
                  <p className="text-gray-600">
                    Masukkan data anak Anda di bawah ini.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Umur Anak */}
                <div>
                  <label
                    htmlFor="umurAnak"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Umur Anak (dalam bulan)
                  </label>
                  <input
                    type="number"
                    id="umurAnak"
                    name="umurAnak"
                    value={formData.umurAnak}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-white bg-white/70 rounded-xl focus:border-purple-300 focus:outline-none transition-all"
                    placeholder="Contoh: 12"
                    required
                    min="0" // Batasi nilai minimum
                  />
                </div>

                {/* Jenis Kelamin */}
                <div>
                  <label className="block mb-3 font-semibold text-gray-700">
                    Jenis Kelamin
                  </label>
                  <div className="flex gap-4">
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="jenisKelamin"
                        value="Laki-Laki"
                        checked={formData.jenisKelamin === "Laki-Laki"}
                        onChange={handleChange}
                        className="sr-only peer"
                        required
                      />
                      <div className="p-4 rounded-xl bg-white/70 border-2 border-white cursor-pointer peer-checked:border-purple-400 peer-checked:bg-purple-50 peer-checked:text-purple-700 transition-all">
                        Laki-Laki
                      </div>
                    </label>
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="jenisKelamin"
                        value="Perempuan"
                        checked={formData.jenisKelamin === "Perempuan"}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="p-4 rounded-xl bg-white/70 border-2 border-white cursor-pointer peer-checked:border-purple-400 peer-checked:bg-purple-50 peer-checked:text-purple-700 transition-all">
                        Perempuan
                      </div>
                    </label>
                  </div>
                </div>

                {/* Tinggi Badan */}
                <div>
                  <label
                    htmlFor="tinggiBadan"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Tinggi Badan (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    id="tinggiBadan"
                    name="tinggiBadan"
                    value={formData.tinggiBadan}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-white bg-white/70 rounded-xl focus:border-purple-300 focus:outline-none transition-all"
                    placeholder="Contoh: 75"
                    required
                    min="0" // Batasi nilai minimum
                  />
                </div>

                {/* Tombol Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 font-semibold transition hover:shadow-xl transform hover:scale-105 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <ChevronsRight />
                  )}
                  {loading ? "Menganalisis..." : "Lihat Hasil Prediksi"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prediksi;
