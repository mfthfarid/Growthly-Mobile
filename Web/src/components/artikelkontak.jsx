import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Send, Share2, MessageSquare, User, Mail } from 'lucide-react';

const Artikelkontak = () => {
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

  const tags = ["Stunting", "Kesehatan", "Nutrisi", "Anak"];
  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Send, href: "#" }, // Representing Telegram
    { icon: Share2, href: "#" }, // Generic share
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-green-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-6 space-y-12">
        {/* Tags and Share Section */}
        <section id="tags-share" data-animate>
          <div className={`bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg border border-white/30 p-6 transition-all duration-1000 ${isVisible['tags-share'] ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Tags */}
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-bold text-lg text-gray-800 mr-2">Tags:</h3>
                {tags.map((tag, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold text-sm cursor-pointer hover:bg-purple-200 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                 <h3 className="font-bold text-lg text-gray-800 mr-2">Bagikan:</h3>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Comment Form Section */}
        <section id="comment-form" data-animate>
           <div className={`bg-white/50 backdrop-blur-lg p-8 md:p-12 rounded-3xl shadow-xl border border-white/30 transition-all duration-1000 delay-200 ${isVisible['comment-form'] ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-pink-600"/>
                 </div>
                 <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Tinggalkan Komentar</h2>
                    <p className="text-gray-600">Bagikan pendapat atau pertanyaan Anda.</p>
                 </div>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nama" className="block mb-2 font-semibold text-gray-700">Nama</label>
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                       <input type="text" id="nama" name="nama" className="w-full p-4 pl-12 border-2 border-white bg-white/70 rounded-xl focus:border-pink-300 focus:outline-none transition-all" placeholder="Nama Anda" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                       <input type="email" id="email" name="email" className="w-full p-4 pl-12 border-2 border-white bg-white/70 rounded-xl focus:border-pink-300 focus:outline-none transition-all" placeholder="email@contoh.com" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="pesan" className="block mb-2 font-semibold text-gray-700">Komentar Anda</label>
                  <textarea id="pesan" name="pesan" rows="6" className="w-full p-4 border-2 border-white bg-white/70 rounded-xl focus:border-pink-300 focus:outline-none transition-all" placeholder="Tuliskan komentar Anda di sini..."></textarea>
                </div>
                 <div className="flex items-start gap-3">
                    <input type="checkbox" id="saveInfo" name="saveInfo" className="mt-1 h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    <label htmlFor="saveInfo" className="text-gray-600">
                       Simpan nama dan email saya untuk komentar berikutnya.
                    </label>
                 </div>
                <button type="submit" className="w-full md:w-auto flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 font-semibold transition hover:shadow-xl transform hover:scale-105">
                  Kirim Komentar
                </button>
              </form>
            </div>
        </section>
      </div>
    </div>
  );
};

export default Artikelkontak;
