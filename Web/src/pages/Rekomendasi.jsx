import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Search, ChefHat } from 'lucide-react';

// --- DATA SIMULASI (Nantinya bisa diganti dari API) ---
const recipeData = [
  {
    to: "/produk1",
    title: "Puree Alpukat & Pisang",
    category: "MPASI",
    image: "https://placehold.co/600x400/dcfce7/166534?text=Puree+Alpukat",
    description: "Kaya akan lemak sehat dan kalium untuk mendukung perkembangan otak si kecil."
  },
  {
    to: "/produk2",
    title: "Bubur Tim Hati Ayam",
    category: "MPASI",
    image: "https://placehold.co/600x400/a7f3d0/166534?text=Bubur+Tim",
    description: "Sumber zat besi hewani terbaik untuk mencegah anemia dan mendukung kecerdasan."
  },
  {
    to: "/produk3",
    title: "Nugget Ikan Tenggiri",
    category: "Camilan",
    image: "https://placehold.co/600x400/bae6fd/0c4a6e?text=Nugget+Ikan",
    description: "Camilan sehat dan lezat kaya Omega-3 yang pasti disukai anak-anak."
  },
  {
    to: "/produk4",
    title: "Sup Bola Daging Sayuran",
    category: "Makan Siang",
    image: "https://placehold.co/600x400/fecdd3/881337?text=Sup+Daging",
    description: "Makanan berkuah hangat yang penuh nutrisi, cocok untuk meningkatkan nafsu makan."
  },
  {
    to: "/produk5",
    title: "Pancake Bayam Keju",
    category: "Sarapan",
    image: "https://placehold.co/600x400/d1fae5/333?text=Pancake+Bayam",
    description: "Sarapan gurih yang kaya akan zat besi dan kalsium, cara asyik makan sayur."
  },
  {
    to: "#",
    title: "Omelet Gulung Sosis",
    category: "Sarapan",
    image: "https://placehold.co/600x400/fde68a/854d0e?text=Omelet+Gulung",
    description: "Pilihan sarapan praktis, cepat, dan penuh protein untuk memulai hari."
  },
];

const RecipeCard = ({ recipe, isVisible, index }) => (
    <NavLink 
        to={recipe.to}
        className={`group bg-white/60 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg border border-white/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
    >
        <div className="overflow-hidden h-48">
            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6">
            <p className="text-sm font-semibold text-purple-600 mb-2">{recipe.category}</p>
            <h3 className="text-xl font-bold text-gray-800 mb-3 h-16">{recipe.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4 h-20 overflow-hidden">{recipe.description}</p>
            <div className="font-semibold text-green-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                Lihat Resep
                <ArrowRight className="w-5 h-5" />
            </div>
        </div>
    </NavLink>
);

const Rekomendasi = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
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

  const categories = ["Semua", "MPASI", "Sarapan", "Makan Siang", "Camilan"];

  const filteredRecipes = recipeData.filter(recipe => 
    activeCategory === "Semua" || recipe.category === activeCategory
  );

  return (
    <div className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section id="rekomendasi-hero" className="pt-32 pb-20 text-center relative" data-animate>
        <div className="container mx-auto px-6 relative">
          <h1 className={`text-4xl md:text-6xl font-bold text-gray-800 transition-all duration-1000 ${isVisible['rekomendasi-hero'] ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Galeri Resep Sehat
            <span className="block bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mt-2">
              Untuk si Kecil & Keluarga
            </span>
          </h1>
          <p className={`mt-6 text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible['rekomendasi-hero'] ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Temukan pilihan makanan sehat yang kami rekomendasikan untuk menunjang kesehatan gizi. Jelajahi resep berdasarkan kategori yang Anda butuhkan.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section id="categories-resep" className="py-12 sticky top-[88px] z-40 bg-white/50 backdrop-blur-xl" data-animate>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-500 ${
                  activeCategory === category 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'bg-white/60 backdrop-blur-lg text-gray-700 hover:bg-white/90'
                } ${isVisible['categories-resep'] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section id="recipes-grid" className="py-20" data-animate>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} isVisible={isVisible['recipes-grid']} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rekomendasi;
