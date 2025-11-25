import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CookingPot,
  LineChart,
  BookOpen,
  Heart,
  FileText,
  MessageSquare,
} from "lucide-react";

// PERUBAHAN: Nama komponen diubah menjadi Fitur
const Fitur = () => {
  const [isVisible, setIsVisible] = useState({});

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

    return () => observer.disconnect();
  }, []);

  const featureList = [
    {
      icon: BrainCircuit,
      title: "Prediksi Gizi",
      description:
        "Gunakan teknologi AI untuk mendeteksi risiko stunting lebih dini berdasarkan data tumbuh kembang anak.",
      to: "/prediction",
      color: "purple",
    },
    {
      icon: CookingPot,
      title: "Rekomendasi Makanan",
      description:
        "Dapatkan ribuan ide resep dan menu makanan bergizi yang disesuaikan dengan usia dan kebutuhan si kecil.",
      to: "/rekomendasi",
      color: "orange",
    },
    {
      icon: LineChart,
      title: "Dashboard Perkembangan",
      description:
        "Pantau semua data penting seperti berat dan tinggi badan dalam satu dasbor interaktif yang mudah dibaca.",
      to: "#", // Ganti dengan link yang sesuai
      color: "blue",
    },
    {
      icon: BookOpen,
      title: "Artikel Terpercaya",
      description:
        "Akses ratusan artikel informatif dari para ahli gizi untuk menambah wawasan Anda seputar kesehatan anak.",
      to: "/article",
      color: "teal",
    },
    {
      icon: MessageSquare,
      title: "Konsultasi Ahli",
      description:
        "Terhubung langsung dengan para pakar kesehatan anak dan ahli gizi untuk mendapatkan saran profesional.",
      to: "#", // Ganti dengan link yang sesuai
      color: "pink",
    },
    {
      icon: FileText,
      title: "Informasi Gizi",
      description:
        "Temukan panduan lengkap tentang kebutuhan gizi anak sesuai usia dan kondisi geografis.",
      to: "/informasi",
      color: "green",
    },
  ];

  const colorVariants = {
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "hover:border-purple-300",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      border: "hover:border-orange-300",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "hover:border-blue-300",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-600",
      border: "hover:border-teal-300",
    },
    pink: {
      bg: "bg-pink-100",
      text: "text-pink-600",
      border: "hover:border-pink-300",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      border: "hover:border-green-300",
    },
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section
        id="fitur-hero"
        className="pt-32 pb-20 text-center relative"
        data-animate
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-10 w-40 h-40 bg-blue-200/50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -right-10 w-40 h-40 bg-green-200/50 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <h1
            className={`text-4xl md:text-6xl font-bold text-gray-800 transition-all duration-1000 ${
              isVisible["fitur-hero"]
                ? "opacity-100"
                : "opacity-0 translate-y-4"
            }`}
          >
            Fitur Cerdas untuk
            <span className="block bg-gradient-to-r from-green-600 via-pink-500 to-blue-600 bg-clip-text text-transparent mt-2">
              Masa Depan si Kecil
            </span>
          </h1>
          <p
            className={`mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible["fitur-hero"]
                ? "opacity-100"
                : "opacity-0 translate-y-4"
            }`}
          >
            Jelajahi berbagai fitur unggulan Growthly yang dirancang khusus
            untuk membantu Anda memantau dan mengoptimalkan tumbuh kembang anak
            dengan mudah dan menyenangkan.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features-grid" className="py-20" data-animate>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((feature, index) => {
              const Icon = feature.icon;
              const colors = colorVariants[feature.color];
              return (
                <NavLink
                  to={feature.to}
                  key={index}
                  className={`group bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/30 text-left transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                    colors.border
                  } ${
                    isVisible["features-grid"]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div
                    className={`font-semibold ${colors.text} flex items-center gap-2 group-hover:gap-3 transition-all`}
                  >
                    Pelajari Lebih Lanjut
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section id="spotlight" className="py-20" data-animate>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 bg-white/50 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/30">
            {/* Text Content */}
            <div
              className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
                isVisible["spotlight"]
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Fokus pada{" "}
                <span className="text-purple-600">Prediksi Gizi</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Salah satu keunggulan utama kami adalah fitur prediksi gizi.
                Dengan memasukkan data antropometri anak secara rutin, sistem
                cerdas kami akan menganalisis tren pertumbuhan dan memberikan
                peringatan dini jika ada potensi risiko stunting, memungkinkan
                Anda untuk mengambil langkah pencegahan yang cepat dan tepat.
              </p>
              <NavLink to="/prediction">
                <button className="group bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  Coba Prediksi Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </NavLink>
            </div>
            {/* Image Placeholder */}
            <div
              className={`lg:w-1/2 transition-all duration-1000 ${
                isVisible["spotlight"]
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <img
                src="https://placehold.co/600x450/c9bce7/333?text=Fitur+Prediksi+Gizi"
                alt="Fitur Prediksi Gizi"
                className="rounded-2xl w-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/50 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/30 max-w-4xl mx-auto">
            <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Siap Mengoptimalkan Tumbuh Kembang Anak?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Daftarkan diri Anda sekarang dan manfaatkan semua fitur canggih
              Growthly secara gratis.
            </p>
            <NavLink to="/kontak">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Daftar Gratis
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fitur;
