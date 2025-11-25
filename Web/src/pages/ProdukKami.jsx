import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Download, ShieldCheck, Activity, BrainCircuit, Baby } from 'lucide-react';

const ProdukKami = () => {
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

    const features = [
        {
            icon: Baby,
            title: "Prediksi Gizi Anak",
            description: "Manfaatkan AI untuk memprediksi status gizi anak dengan data usia, berat, dan tinggi badan untuk deteksi dini stunting.",
            to: "/prediction"
        },
        {
            icon: Activity,
            title: "Prediksi Gizi Ibu Hamil",
            description: "Pantau dan dapatkan saran gizi yang tepat sesuai kebutuhan unik ibu hamil untuk menjaga kesehatan ibu dan janin.",
            to: "/prediction"
        },
        {
            icon: ShieldCheck,
            title: "Rekomendasi Terpercaya",
            description: "Semua saran dan hasil prediksi didasarkan pada data terverifikasi dari ahli gizi dan pakar kesehatan anak.",
            to: "/fitur"
        }
    ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section id="produk-hero" className="pt-32 pb-20 relative" data-animate>
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Text Content */}
                <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible['produk-hero'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                        Aplikasi <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Growthly</span> Akan Memandumu
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                        Dengan Growthly, mengelola kondisi gizi dan mengatasi stunting tidak pernah semudah ini. Dapatkan wawasan berbasis data untuk mendukung tumbuh kembang optimal.
                    </p>
                    <div className="mt-8">
                         <a href="#" className="inline-block bg-gray-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <div className="flex items-center gap-3">
                                <Download className="w-6 h-6"/>
                                <div>
                                    <p className="text-xs">Dapatkan di</p>
                                    <p className="text-xl font-bold">Google Play</p>
                                </div>
                            </div>
                         </a>
                    </div>
                </div>
                 {/* Image */}
                <div className={`lg:w-1/2 transition-all duration-1000 delay-200 ${isVisible['produk-hero'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                     <img 
                        src="https://placehold.co/600x600/e0e7ff/333?text=App+Mockup" 
                        alt="Aplikasi Growthly" 
                        className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                     />
                </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="produk-fitur" className="py-20" data-animate>
        <div className="container mx-auto px-6">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['produk-fitur'] ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Dua Fitur Utama Revolusioner</h2>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Growthly menawarkan solusi cerdas yang menghadirkan revolusi dalam perawatan gizi di ujung jari Anda.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <NavLink 
                to={feature.to} 
                key={index}
                className={`group bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/30 text-left transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${isVisible['produk-fitur'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                 <div className="font-semibold text-purple-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="w-5 h-5" />
                  </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

       {/* Closing CTA */}
       <section id="produk-cta" className="py-20" data-animate>
         <div className="container mx-auto px-6">
            <div className={`relative text-center p-12 rounded-3xl bg-cover bg-center overflow-hidden transition-all duration-1000 ${isVisible['produk-cta'] ? 'opacity-100' : 'opacity-0'}`} style={{backgroundImage: "url('https://placehold.co/1200x400/1e293b/ffffff?text=Growthly')"}}>
                <div className="absolute inset-0 bg-slate-900/70"></div>
                <div className="relative">
                    <BrainCircuit className="w-12 h-12 text-white mx-auto mb-4"/>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Mulai Perjalanan Kesehatan Gizi Anda</h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        Unduh aplikasi Growthly sekarang dan ambil langkah pertama menuju masa depan anak yang lebih sehat dan cerdas.
                    </p>
                     <a href="#" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Download Sekarang
                     </a>
                </div>
            </div>
         </div>
       </section>
    </div>
  );
};

export default ProdukKami;
