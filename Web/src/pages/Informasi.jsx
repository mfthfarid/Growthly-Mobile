import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../assets/Informasi/informasi.png";
import Foto from "../assets/Informasi/informasi1.png";
import Card from "../assets/Informasi/card.png";
import Icon from "../assets/Informasi/icon.png";

const Informasi = () => {
  return (
    <>
      {/* Header */}
      <img
        src={Header}
        alt="Layanan Header"
        className="w-full max-h-[400px] object-cover"
      />

      {/* Artikel Utama */}
      <div className="flex flex-col items-center mt-10 px-4 md:px-10">
        <div className="flex justify-center w-full">
          <img
            src={Foto}
            alt="Foto 1"
            className="w-full md:w-2/3 h-auto rounded-lg shadow-md"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          />
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-center text-gray-800"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          Stunting di Indonesia
        </h1>

        <div
          className="w-full md:w-2/3 text-gray-700 leading-relaxed space-y-4 text-justify"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <p>
            Kementerian Kesehatan mengumumkan hasil Survei Status Gizi Indonesia
            (SSGI) pada Rapat Kerja Nasional BKKBN, Rabu (25/1) dimana
            prevalensi stunting di Indonesia turun dari 24,4% di tahun 2021
            menjadi 21,6% di 2022. Presiden RI Joko Widodo mengatakan dalam
            forum tersebut stunting bukan hanya urusan tinggi badan tetapi yang
            paling berbahaya adalah rendahnya kemampuan anak untuk belajar,
            keterbelakangan mental, dan yang ketiga munculnya penyakit-penyakit
            kronis. Hasil SSGI ini untuk mengukur target stunting di Indonesia.
          </p>
          <p>
            Status gizi balita merupakan salah satu indikator yang dapat
            digunakan untuk menunjukan kualitas hidup suatu masyarakat dan juga
            memberikan intervensi sehingga akibat lebih buruk dapat dicegah dan
            perencanaan lebih baik dapat dilakukan untuk mencegah anak-anak lain
            dari penyakit yang sama (Soekirman, 2000).
          </p>
          <p>
            Untuk mendukung pertumbuhan dan perkembangan pada masa balita, peran
            makanan dengan nilai gizi tinggi sangat penting seperti pada
            makanan sumber protein, vitamin A, vitamin B kompleks, vitamin C,
            vitamin D, kalsium, zat besi, yodium, fosfor, dan zink.
          </p>
        </div>
      </div>

      {/* Banner / Card */}
      <div
        className="flex flex-col items-center mt-14 px-4"
        data-aos="flip-right"
        data-aos-duration="1500"
      >
        <div className="flex justify-center w-full">
          <img
            src={Card}
            alt="Card Info"
            className="w-full md:w-2/3 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Daftar Artikel */}
      <div
        className="flex flex-col items-center mt-12 mb-16 px-4"
        data-aos="flip-left"
        data-aos-duration="1500"
      >
        <div className="w-full md:w-2/3 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Artikel Terkait
          </h2>

          {[
            {
              link: "/detail1",
              title:
                "Kasus Stunting pada anak di Indonesia masih tinggi, Dokter ingatkan pentingnya deteksi dini",
            },
            {
              link: "/detail2",
              title:
                "Dari Banyak Masalah Gizi, Kasus Stunting Paling Tinggi di Indonesia",
            },
            {
              link: "/detail3",
              title:
                "Kementerian Kesehatan Rilis Hasil Survei Status Gizi Indonesia (SSGI) tahun 2024",
            },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.link}
              className="flex items-center justify-between bg-purple-200 hover:bg-purple-300 transition rounded-lg py-3 px-4 shadow-sm"
            >
              <span className="font-semibold text-gray-800">{item.title}</span>
              <img src={Icon} alt="icon" className="w-5 h-5" />
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Informasi;
