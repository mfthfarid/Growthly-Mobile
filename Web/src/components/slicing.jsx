import React from 'react';
import { NavLink } from 'react-router-dom';

// Karena saya tidak memiliki akses ke logo lokal Anda, saya menggunakan placeholder.
// Anda bisa mengganti 'src'-nya kembali dengan import logo Anda (Logo1, Logo2, dst.)
const logos = [
  { to: "/produk1", src: "https://placehold.co/150x60/f0f0f0/cccccc?text=Logo+1", alt: "Partner 1" },
  { to: "/produk2", src: "https://placehold.co/150x60/f0f0f0/cccccc?text=Logo+2", alt: "Partner 2" },
  { to: "/produk3", src: "https://placehold.co/150x60/f0f0f0/cccccc?text=Logo+3", alt: "Partner 3" },
  { to: "/produk4", src: "https://placehold.co/150x60/f0f0f0/cccccc?text=Logo+4", alt: "Partner 4" },
  { to: "/produk5", src: "https://placehold.co/150x60/f0f0f0/cccccc?text=Logo+5", alt: "Partner 5" },
];

// Gandakan array logo untuk menciptakan efek looping yang mulus
const extendedLogos = [...logos, ...logos];

const Slicing = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-green-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-xl font-bold text-gray-700 mb-8">
          Telah Diliput dan Dipercaya Oleh
        </h2>
        {/* Wrapper untuk animasi marquee */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee">
            {extendedLogos.map((logo, index) => (
              <NavLink
                to={logo.to}
                key={index}
                className="flex-shrink-0 w-48 h-24 mx-8 flex items-center justify-center"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-w-full max-h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </NavLink>
            ))}
          </div>
          {/* Efek fade di sisi kiri dan kanan */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-blue-50 to-transparent"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

// Anda perlu menambahkan animasi ini ke file CSS utama Anda (misal: index.css)
/* @keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
*/

export default Slicing;
