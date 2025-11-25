import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ChefHat, Clock, Zap } from 'lucide-react';

// --- DATA SIMULASI UNTUK "RESEP LAINNYA" ---
// PERUBAHAN: Data disesuaikan untuk halaman produk 3
const otherRecipes = [
  {
    to: "/produk1",
    title: "Puree Alpukat & Pisang",
    category: "MPASI 6-8 Bulan",
    image: "https://placehold.co/600x400/dcfce7/166534?text=Puree+Alpukat",
  },
  {
    to: "/produk2",
    title: "Bubur Tim Hati Ayam",
    category: "MPASI 8-12 Bulan",
    image: "https://placehold.co/600x400/a7f3d0/166534?text=Bubur+Tim",
  },
  {
    to: "/produk4",
    title: "Sup Bola Daging Sayuran",
    category: "Lauk Anak",
    image: "https://placehold.co/600x400/fecdd3/881337?text=Sup+Daging",
  },
];


const Produk3 = () => {
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            }
            });
        },
        { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Hero Section with Background Image */}
      <section 
        id="produk-hero" 
        className="pt-32 pb-20 text-center relative bg-cover bg-center"
        // PERUBAHAN: Gambar dan teks disesuaikan untuk Produk 3
        style={{ backgroundImage: "url('https://placehold.co/1920x400/bae6fd/333?text=Nugget+Ikan+Tenggiri')"}}
        data-animate
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-6 relative">
          <h1 className={`text-4xl md:text-6xl font-bold text-white transition-all duration-1000 ${isVisible['produk-hero'] ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Nugget Ikan Tenggiri
          </h1>
          <p className={`mt-4 text-lg text-white/90 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible['produk-hero'] ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Camilan sehat dan lezat kaya Omega-3 yang pasti disukai anak-anak.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="container mx-auto px-6 py-20">
        <div id="produk-content" className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-8 md:p-12" data-animate>
           <div className={`transition-all duration-1000 ${isVisible['produk-content'] ? 'opacity-100' : 'opacity-0'}`}>
                {/* Info Cards */}
                {/* PERUBAHAN: Detail resep disesuaikan */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
                    <div className="bg-green-100/70 p-4 rounded-xl">
                        <ChefHat className="mx-auto w-8 h-8 text-green-700 mb-2"/>
                        <h3 className="font-bold text-gray-800">Tingkat Kesulitan</h3>
                        <p className="text-green-700">Sedang</p>
                    </div>
                    <div className="bg-blue-100/70 p-4 rounded-xl">
                        <Clock className="mx-auto w-8 h-8 text-blue-700 mb-2"/>
                        <h3 className="font-bold text-gray-800">Waktu Memasak</h3>
                        <p className="text-blue-700">45 Menit</p>
                    </div>
                    <div className="bg-orange-100/70 p-4 rounded-xl">
                        <Zap className="mx-auto w-8 h-8 text-orange-700 mb-2"/>
                        <h3 className="font-bold text-gray-800">Porsi</h3>
                        <p className="text-orange-700">~20 Nugget</p>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img src="https://placehold.co/600x400/dbeafe/333?text=Bahan+Nugget" alt="Bahan-Bahan Nugget" className="w-full h-auto rounded-2xl shadow-md" />
                    <img src="https://placehold.co/600x400/fce7f3/333?text=Cara+Menggoreng" alt="Cara Menggoreng" className="w-full h-auto rounded-2xl shadow-md" />
                </div>
            </div>
        </div>
      </main>

      {/* "Resep Lainnya" Section */}
      <section id="resep-lainnya" className="py-10 pb-20" data-animate>
        <div className="container mx-auto px-6">
           <div className={`text-center mb-12 transition-opacity duration-1000 ${isVisible['resep-lainnya'] ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Resep Lainnya</h2>
                <p className="text-gray-600 mt-2">Jelajahi ide MPASI sehat dan bergizi lainnya.</p>
           </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherRecipes.map((recipe, index) => (
              <NavLink 
                to={recipe.to} 
                key={index}
                className={`group bg-white/60 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg border border-white/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${isVisible['resep-lainnya'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="overflow-hidden h-48">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-purple-600 mb-2">{recipe.category}</p>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{recipe.title}</h3>
                   <div className="font-semibold text-green-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Lihat Resep
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Produk3;
