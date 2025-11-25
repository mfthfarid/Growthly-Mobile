import React, { useState, useEffect } from 'react';
// PERUBAHAN: NavLink tidak lagi digunakan di file ini
import { Search, ArrowRight, Calendar, Tag, Globe } from 'lucide-react';

// --- DATA SIMULASI (Nantinya bisa diganti dari API) ---
// PERUBAHAN: Properti 'to' diubah menjadi 'url' dengan link eksternal, dan 'source' ditambahkan
const articlesData = [
  {
    id: 1,
    title: "Pentingnya 1000 Hari Pertama Kehidupan untuk Cegah Stunting",
    excerpt: "Ketahui mengapa 1000 HPK adalah periode emas yang krusial dan bagaimana nutrisi yang tepat pada masa ini menentukan masa depan anak.",
    source: "HealthNews.com",
    date: "20 Oktober 2025",
    category: "Nutrisi",
    image: "https://placehold.co/600x400/a7f3d0/166534?text=1000+HPK",
    url: "https://www.example-health-website.com/news/1000-hpk",
  },
  {
    id: 2,
    title: "Stimulasi Tepat Sesuai Usia untuk Perkembangan Otak Optimal",
    excerpt: "Selain nutrisi, stimulasi sensorik dan motorik juga memegang peranan penting. Pelajari cara bermain yang mencerdaskan si kecil.",
    source: "Parenting.id",
    date: "19 Oktober 2025",
    category: "Tumbuh Kembang",
    image: "https://placehold.co/600x400/bae6fd/0c4a6e?text=Stimulasi+Anak",
    url: "https://www.example-parenting-site.com/stimulasi-anak",
  },
  {
    id: 3,
    title: "Membaca Grafik Pertumbuhan (KMS) dengan Mudah",
    excerpt: "Jangan panik melihat grafik KMS. Kami akan memandu Anda cara membaca dan menginterpretasikan data pertumbuhan anak.",
    source: "Info Sehat",
    date: "18 Oktober 2025",
    category: "Monitoring",
    image: "https://placehold.co/600x400/fecdd3/881337?text=Grafik+KMS",
    url: "https://www.example-health-news.com/artikel-kms",
  },
  {
    id: 4,
    title: "Resep MPASI 4 Bintang yang Lezat dan Mudah Dibuat",
    excerpt: "Bingung mau masak apa untuk si kecil? Coba 5 resep MPASI 4 bintang yang sudah teruji kelezatan dan kandungan gizinya.",
    source: "DapurBunda.com",
    date: "17 Oktober 2025",
    category: "Resep",
    image: "https://placehold.co/600x400/d8b4fe/581c87?text=Resep+MPASI",
    url: "https://www.example-recipe-website.com/mpasi-4-bintang",
  },
  {
    id: 5,
    title: "Mitos dan Fakta Seputar Stunting yang Wajib Diketahui",
    excerpt: "Benarkah stunting hanya karena faktor keturunan? Kupas tuntas berbagai mitos yang sering salah kaprah di masyarakat.",
    source: "FaktaKesehatan.org",
    date: "16 Oktober 2025",
    category: "Edukasi",
    image: "https://placehold.co/600x400/fde68a/854d0e?text=Mitos+Fakta",
    url: "https://www.example-health-news.com/mitos-stunting",
  },
  {
    id: 6,
    title: "Peran Penting Protein Hewani dalam Mencegah Stunting",
    excerpt: "Telur, ikan, dan daging memiliki peran vital. Pahami mengapa protein hewani menjadi kunci utama dalam pencegahan stunting.",
    source: "GiziAnak.id",
    date: "15 Oktober 2025",
    category: "Nutrisi",
    image: "https://placehold.co/600x400/a5f3fc/155e75?text=Protein+Hewani",
    url: "https://www.example-nutrition-site.com/protein-hewani",
  },
];

// PERUBAHAN: Komponen diubah dari NavLink menjadi tag <a> biasa
const ArticleCard = ({ article, isVisible, index }) => (
  <a 
    href={article.url}
    target="_blank" // Membuka link di tab baru
    rel="noopener noreferrer" // Praktik keamanan untuk link eksternal
    className={`group bg-white/60 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg border border-white/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div className="overflow-hidden">
      <img src={article.image} alt={article.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-6 flex flex-col h-[280px]">
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-2" title="Kategori">
          <Tag className="w-4 h-4 text-orange-500" />
          <span>{article.category}</span>
        </div>
        <div className="flex items-center gap-2" title="Tanggal Publikasi">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span>{article.date}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 flex-grow">{article.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt.substring(0, 100)}...</p>
      <div className="font-semibold text-green-600 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <Globe className="w-4 h-4" />
            <span>{article.source}</span>
        </div>
        <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
          <span>Baca di Sumber</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  </a>
);

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(6);
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
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setArticles(articlesData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const categories = ["Semua", "Nutrisi", "Tumbuh Kembang", "Monitoring", "Resep", "Edukasi"];

  const filteredArticles = articles.filter(article => 
    activeCategory === "Semua" || article.category === activeCategory
  );
  
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section id="article-hero" className="pt-32 pb-20 text-center relative" data-animate>
        <div className="container mx-auto px-6 relative">
          <h1 className={`text-4xl md:text-6xl font-bold text-gray-800 transition-all duration-1000 ${isVisible['article-hero'] ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Wawasan & Pengetahuan
            <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mt-2">
              Dari Para Ahli
            </span>
          </h1>
          <p className={`mt-6 text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible['article-hero'] ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Temukan artikel, tips, dan panduan terbaru seputar gizi, tumbuh kembang, dan kesehatan anak untuk mendukung masa depan si kecil.
          </p>
          <div className={`mt-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible['article-hero'] ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari artikel tentang MPASI, stunting, nutrisi..."
                className="w-full px-6 py-4 pr-12 rounded-full bg-white/70 backdrop-blur-lg border-2 border-white focus:border-green-400 focus:outline-none transition-all"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section id="categories" className="py-12" data-animate>
        <div className="container mx-auto px-6">
          <h3 className={`text-xl font-bold text-center text-gray-800 mb-6 transition-opacity duration-1000 ${isVisible['categories'] ? 'opacity-100' : 'opacity-0'}`}>Telusuri Berdasarkan Topik</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-500 ${
                  activeCategory === category 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'bg-white/60 backdrop-blur-lg text-gray-700 hover:bg-white/90'
                } ${isVisible['categories'] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section id="articles-grid" className="py-10 pb-20" data-animate>
        <div className="container mx-auto px-6">
          {loading ? (
             <div className="text-center text-gray-600">Memuat artikel...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.slice(0, visibleCount).map((article, index) => (
                  <ArticleCard key={article.id} article={article} isVisible={isVisible['articles-grid']} index={index} />
                ))}
              </div>
              {visibleCount < filteredArticles.length && (
                 <div className="text-center mt-16">
                    <button 
                      onClick={loadMore}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                       Muat Lebih Banyak
                    </button>
                 </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Article;

