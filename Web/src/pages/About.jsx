import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Target, Users, ShieldCheck, Heart } from 'lucide-react';

const About = () => {
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

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Target,
      title: "Berbasis Data & Sains",
      description: "Setiap rekomendasi gizi didasarkan pada data ilmiah dan disesuaikan dengan kondisi geografis lokal untuk hasil yang akurat.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Users,
      title: "Untuk Semua Kalangan",
      description: "Kami percaya bahwa setiap anak berhak mendapatkan awal yang sehat. Growthly dapat diakses secara gratis oleh siapa saja.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: ShieldCheck,
      title: "Aman dan Terpercaya",
      description: "Bekerja sama dengan ahli gizi dan pakar kesehatan anak untuk memastikan semua informasi yang kami berikan valid dan dapat diandalkan.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section id="about-hero" className="pt-32 pb-20 text-center relative" data-animate>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-green-200/50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-pink-200/50 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <h1 className={`text-4xl md:text-6xl font-bold text-gray-800 transition-all duration-1000 ${isVisible['about-hero'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Misi Kami:
            <span className="block bg-gradient-to-r from-green-600 via-pink-500 to-blue-600 bg-clip-text text-transparent mt-2">
              Generasi Sehat Bebas Stunting
            </span>
          </h1>
          <p className={`mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible['about-hero'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Growthly lahir dari kepedulian mendalam terhadap masa depan anak-anak Indonesia. Kami memadukan teknologi cerdas dengan data nutrisi lokal untuk memberikan solusi pencegahan stunting yang praktis, akurat, dan mudah diakses oleh setiap orang tua.
          </p>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section id="mission" className="py-20" data-animate>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Image Placeholder */}
            <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible['mission'] ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="bg-white/50 backdrop-blur-lg p-4 rounded-3xl shadow-lg border border-white/30">
                <img
                  src="https://placehold.co/600x450/e2f5e8/333?text=Tim+Growthly"
                  alt="Tim Growthly"
                  className="rounded-2xl w-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible['mission'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Solusi Digital yang Memahami Kebutuhan Lokal
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Kami sadar bahwa kebutuhan gizi anak dapat berbeda tergantung di mana mereka tinggal. Growthly dirancang untuk memberikan rekomendasi makanan yang tidak hanya bergizi, tetapi juga mudah ditemukan di wilayah sekitar Anda, baik di pesisir, dataran rendah, maupun pegunungan.
              </p>
              <NavLink to="/fitur">
                <button className="group bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  Lihat Fitur Kami
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section id="values" className="py-20" data-animate>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 transition-all duration-1000 ${isVisible['values'] ? 'opacity-100' : 'opacity-0'}`}>
              Nilai yang Kami Pegang Teguh
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className={`bg-white/50 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-white/30 text-center transition-all duration-500 delay-${index * 100} ${isVisible['values'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/50 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/30 max-w-4xl mx-auto">
             <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4"/>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Ayo Bergabung Dalam Misi Kami!
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari gerakan untuk menciptakan generasi Indonesia yang lebih sehat, cerdas, dan bebas stunting.
            </p>
            <NavLink to="/contact">
               <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                 Hubungi Kami
               </button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
