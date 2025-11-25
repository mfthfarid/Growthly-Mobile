import React, { useState, useEffect } from 'react';
// PERUBAHAN: Menghapus NavLink yang tidak terpakai
import { MapPin, Mail, Phone, Send, Download } from 'lucide-react';

const Kontak = () => {
  // PERUBAHAN: Menambahkan state dan logic untuk animasi
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
  
  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat Virtual",
      content: "Temukan aplikasi kami di Google Play Store untuk akses di mana saja.",
      buttonText: "Download Aplikasi",
      buttonIcon: Download,
      color: "blue",
      to: "#" // Ganti dengan link Play Store
    },
    {
      icon: Mail,
      title: "Email Kami",
      content: "Punya pertanyaan atau masukan? Kirimkan kami email dan tim kami akan segera merespon.",
      buttonText: "Growthly@gmail.com",
      color: "pink",
      to: "mailto:Growthly@gmail.com"
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "Untuk dukungan cepat, Anda bisa menghubungi kami melalui telepon pada jam kerja.",
       buttonText: "+1- (246) 333-0079",
      color: "green",
      to: "tel:+12463330079"
    }
  ];

  const colorVariants = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'hover:border-blue-300' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'hover:border-pink-300' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'hover:border-green-300' },
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section id="kontak-hero" className="pt-32 pb-20 text-center relative" data-animate>
        <div className="container mx-auto px-6 relative">
          <h1 className={`text-4xl md:text-6xl font-bold text-gray-800 transition-all duration-1000 ${isVisible['kontak-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Kami Siap Membantu
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mt-2">
              Terhubung dengan Kami
            </span>
          </h1>
          <p className={`mt-6 text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible['kontak-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Baik Anda memiliki pertanyaan, masukan, atau ingin berkolaborasi, tim Growthly selalu siap untuk mendengar dari Anda.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section id="info-cards" className="py-10" data-animate>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const ButtonIcon = info.buttonIcon;
              const colors = colorVariants[info.color];
              return (
                <div 
                  key={index}
                  className={`group bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/30 text-center transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${colors.border} ${isVisible['info-cards'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{info.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 h-24">{info.content}</p>
                  <a 
                    href={info.to}
                    target={info.buttonIcon ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 ${colors.bg} ${colors.text} hover:shadow-lg`}
                  >
                    {ButtonIcon && <ButtonIcon className="w-5 h-5" />}
                    {info.buttonText}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section id="form-section" className="py-20" data-animate>
        <div className="container mx-auto px-6">
          <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 bg-white/50 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/30 transition-all duration-1000 ${isVisible['form-section'] ? 'opacity-100' : 'opacity-0'}`}>
            {/* Image Placeholder */}
            <div className="lg:w-1/2">
               <img
                  src="https://placehold.co/600x700/fbcfe8/333?text=Hubungi+Kami"
                  alt="Hubungi Growthly"
                  className="rounded-2xl w-full object-cover shadow-lg"
                />
            </div>

            {/* Form */}
            <div className="lg:w-1/2 w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Tuliskan Pesan Anda</h2>
              <p className="text-gray-600 mb-8">Kami akan membalasnya sesegera mungkin.</p>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="nama" className="block mb-2 font-semibold text-gray-700">Nama Lengkap</label>
                  <input type="text" id="nama" name="nama" className="w-full p-4 border-2 border-white bg-white/70 rounded-xl focus:border-pink-300 focus:outline-none transition-all" placeholder="Contoh: Budi Sanjaya" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Alamat Email</label>
                  <input type="email" id="email" name="email" className="w-full p-4 border-2 border-white bg-white/70 rounded-xl focus:border-pink-300 focus:outline-none transition-all" placeholder="contoh@email.com" />
                </div>
                <div>
                  <label htmlFor="pesan" className="block mb-2 font-semibold text-gray-700">Pesan Anda</label>
                  <textarea id="pesan" name="pesan" rows="5" className="w-full p-4 border-2 border-white bg-white/70 rounded-xl focus:border-pink-300 focus:outline-none transition-all" placeholder="Tuliskan pertanyaan atau masukan Anda di sini..."></textarea>
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 font-semibold transition hover:shadow-xl transform hover:scale-105">
                  <Send className="w-5 h-5" />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kontak;

