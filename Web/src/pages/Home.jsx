import React, { useState, useEffect } from 'react';
// PERUBAHAN: Menambahkan NavLink
import { NavLink } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Users, 
  BookOpen,
  Shield, 
  CheckCircle, 
  ArrowRight,
  PlayCircle,
  Zap,
  Target,
  Award,
  ChevronRight,
  BrainCircuit, 
  CookingPot, 
  LineChart,
} from 'lucide-react';

const Home = () => {
  const [rating, setRating] = useState(4);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const Rating = () => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
            index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => handleRatingClick(index + 1)}
        />
      ))}
    </div>
  );
  
  // PERUBAHAN: Menambahkan properti 'to' untuk setiap fitur
  const featuredServices = [
    { icon: BrainCircuit, title: "Prediksi Gizi", description: "Analisis status gizi anak berbasis data untuk deteksi dini stunting.", cardColor: "bg-purple-100 hover:bg-purple-200", iconColor: "text-purple-600", to: "/prediction" },
    { icon: CookingPot, title: "Rekomendasi Makanan", description: "Dapatkan ribuan ide menu dan resep sehat yang disesuaikan dengan usia anak.", cardColor: "bg-orange-100 hover:bg-orange-200", iconColor: "text-orange-600", to: "/rekomendasi" },
    { icon: LineChart, title: "Dashboard Admin", description: "Pantau grafik berat badan, tinggi badan, dan status gizi anak secara berkala.", cardColor: "bg-blue-100 hover:bg-blue-200", iconColor: "text-blue-600", to: "/login" },
    { icon: BookOpen, title: "Artikel Terpercaya", description: "Tingkatkan wawasan Anda dengan ratusan artikel dari para ahli gizi & kesehatan.", cardColor: "bg-teal-100 hover:bg-teal-200", iconColor: "text-teal-600", to: "/Article" },
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <section 
        id="home" 
        className="pt-24 pb-20 overflow-hidden"
        data-animate
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className={`lg:w-1/2 transition-all duration-1000 ${
              isVisible.home ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full text-sm font-medium text-green-800 mb-6">
                <Shield className="w-4 h-4" />
                Untuk Masa Depan Anak Indonesia
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 text-gray-800">
                Cegah Stunting Sejak Dini,
                <span className="block bg-gradient-to-r from-green-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Pantau Tumbuh Kembang si Kecil
                </span>
              </h1>
              
              {/* PERUBAHAN: Nama brand diubah menjadi Growthly */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Growthly adalah partner digital Anda untuk memonitor gizi anak, mendapatkan rekomendasi makanan, hingga prediksi status gizi berbasis AI.
              </p>
              
              {/* PERUBAHAN: Tombol CTA diubah menjadi NavLink ke halaman Fitur */}
              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink to="/fitur" className="group bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  Jelajahi Fitur Kami
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
                <button className="group bg-white text-gray-800 px-8 py-4 rounded-full font-semibold border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5 text-green-500" />
                  Lihat Cara Kerja
                </button>
              </div>
            </div>
            
            <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible.home ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-green-100 via-pink-100 to-blue-100 rounded-2xl p-6 h-96 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Aplikasi Growthly</h3>
                    <p className="text-gray-600 text-center text-sm">
                      Monitor gizi anak dengan mudah dan dapatkan rekomendasi nutrisi terpersonalisasi.
                    </p>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-bounce delay-1000">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-r from-blue-400 to-green-500 rounded-full flex items-center justify-center animate-bounce delay-500">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section 
        id="features" 
        className="py-20 bg-gradient-to-r from-green-50 to-blue-50"
        data-animate
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-green-600 mb-4 uppercase tracking-wide">
              Keunggulan Growthly
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Platform Cerdas untuk
              <span className="block bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Tumbuh Kembang Optimal
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Cepat & Responsif", description: "Proses informasi gizi dengan cepat dan akurat untuk menghemat waktu Anda", bgColor: "bg-yellow-500", delay: "delay-100" },
              { icon: Target, title: "Efisien & Tepat", description: "Solusi efisien untuk masalah gizi anak sehingga Anda dapat fokus pada hal lainnya", bgColor: "bg-green-500", delay: "delay-200" },
              { icon: Shield, title: "Aman & Terpercaya", description: "Informasi medis yang terverifikasi dari ahli gizi dan dokter anak berpengalaman", bgColor: "bg-blue-500", delay: "delay-300" },
              { icon: Award, title: "Berkualitas Tinggi", description: "Standar terbaik dalam memberikan rekomendasi gizi untuk anak Indonesia", bgColor: "bg-pink-500", delay: "delay-500" }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  id={`feature-${index}`}
                  className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${feature.delay} ${
                    isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fitur Unggulan Section */}
      <section 
        id="services" 
        className="py-20"
        data-animate
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-pink-600 mb-4 uppercase tracking-wide">
              Fitur Unggulan
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-800">
              Semua yang Anda Butuhkan
              <span className="block bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Dalam Satu Genggaman
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => {
              const Icon = service.icon;
              return(
              // PERUBAHAN: Wrapper diubah menjadi NavLink
              <NavLink 
                to={service.to}
                key={index}
                className={`group ${service.cardColor} rounded-3xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer ${
                  isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-8 h-8 ${service.iconColor}`} />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h4>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                {/* PERUBAHAN: Tombol diubah menjadi div untuk styling */}
                <div className="font-semibold text-gray-800 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Lihat Detail
                  <ChevronRight className="w-4 h-4" />
                </div>
              </NavLink>
            )})}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why" className="py-20 bg-gradient-to-r from-pink-50 to-blue-50" data-animate>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className={`lg:w-1/2 transition-all duration-1000 ${
              isVisible.why ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-200 via-pink-200 to-blue-200 rounded-3xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-8 h-80 flex flex-col items-center justify-center">
                    <div className="text-6xl mb-6">👶</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Anak Sehat, Bangsa Kuat</h3>
                    <p className="text-gray-600 text-center">
                      Masa depan cerah dimulai dari gizi yang baik hari ini.
                    </p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible.why ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
              <h2 className="text-sm font-semibold text-pink-600 mb-4 uppercase tracking-wide">
                Misi Kami
              </h2>
              <h3 className="text-4xl font-bold text-gray-800 mb-6">
                Platform Terpadu untuk
                <span className="block bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Kesehatan Gizi Anak
                </span>
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Growthly menyediakan informasi lengkap tentang gizi anak dan dilengkapi dengan aplikasi mobile yang mudah digunakan.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Informasi Gizi Lengkap", description: "Database lengkap mengenai stunting dan nutrisi penting dari makanan sehat." },
                  { title: "Rekomendasi Terpersonalisasi", description: "Dapatkan saran dan menu makanan yang sesuai dengan kebutuhan anak Anda." },
                  { title: "Gratis & Terpercaya", description: "Tidak ada biaya tersembunyi, semua layanan gratis dan berkualitas tinggi." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonial" className="py-20" data-animate>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wide">
              Testimoni
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Apa Kata Para
              <span className="block bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Orang Tua?
              </span>
            </h3>
          </div>

          <div className={`max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 lg:p-12 transition-all duration-1000 ${
            isVisible.testimonial ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <div className="w-40 h-40 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    <div className="text-4xl">👩</div>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  "Growthly sangat membantu saya sebagai ibu baru. Fitur rekomendasi makanannya keren banget! Anak saya jadi lahap makan dan berat badannya naik sesuai anjuran."
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                      Rayana Sari
                    </h4>
                    <p className="text-gray-500">Ibu dari Alya (3 tahun)</p>
                  </div>
                  <Rating />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section 
        id="articles" 
        className="py-20 bg-gradient-to-r from-green-50 to-pink-50"
        data-animate
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-green-600 mb-4 uppercase tracking-wide">
              Wawasan & Pengetahuan
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-800">
              Artikel Terbaru dari
              <span className="block bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Para Ahli Gizi
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: "🍎", title: "Pentingnya 1000 Hari Pertama Kehidupan", excerpt: "Ketahui mengapa 1000 HPK adalah periode emas yang menentukan masa depan anak.", date: "15 Okt 2025" },
              { image: "🏃‍♂️", title: "Stimulasi Tepat Sesuai Usia Anak", excerpt: "Selain nutrisi, stimulasi juga penting untuk perkembangan otak si kecil.", date: "14 Okt 2025" },
              { image: "📊", title: "Membaca Grafik Pertumbuhan Anak", excerpt: "Pelajari cara membaca KMS atau grafik pertumbuhan untuk memantau status gizi.", date: "13 Okt 2025" }
            ].map((article, index) => (
              <div 
                key={index}
                className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible.articles ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-48 bg-gradient-to-br from-green-100 via-pink-100 to-blue-100 flex items-center justify-center">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {article.image}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                  <button className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-400 via-blue-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Siap Memberikan yang Terbaik
            <span className="block">untuk Anak Anda?</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan orang tua yang sudah mempercayakan kesehatan gizi anak mereka pada Growthly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Daftar Sekarang, Gratis!
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300">
              Download Aplikasi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
