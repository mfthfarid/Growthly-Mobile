import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../../assets/Blog/frame.png";
import Foto1 from "../../assets/Blog/blog-1.png";
import Foto2 from "../../assets/Blog/blog-2.png";
import Foto3 from "../../assets/Blog/blog-3.png";
import Cari from "../../components/cari";
import Artikelkontak from "../../components/artikelkontak";
import { BiUserCircle } from "react-icons/bi";

const Detail2 = () => {
  return (
    <>
      <img src={Header} alt="Header Image" className="mx-auto" />
      <div className="container mx-auto flex flex-col mb-10">
        <div className="flex justify-center flex-col md:flex-row">
          <div className="w-full md:w-2/4 pr-2">
            <div>
              <img
                src={Foto2}
                alt="Foto1"
                className="w-full mt-10"
                data-aos="flip-up"
                data-aos-duration="2000"
              />
              <div
                className="flex flex-col  justify-center bg-white rounded-lg p-2"
                data-aos="flip-down"
                data-aos-duration="2000"
              >
                <BiUserCircle className="text-gray-800 mt-1" />
                <div className="text-gray-500 text-[14px] font-open-sans font-semibold capitalize leading-[22.4px]">
                  By Admin
                </div>
              </div>
              <h1
                className="font-bold mt-2 text-2xl"
                data-aos="flip-left"
                data-aos-duration="2000"
              >
                Dari Banyak Masalah Gizi, Kasus Stunting Paling Tinggi di
                Indonesia
              </h1>
              <br />
              <p
                className="text-justify"
                data-aos="flip-right"
                data-aos-duration="2000"
              >
                Stunting merupakan satu kondisi di mana pertumbuhan dan
                perkembangan anak terganggu, yang disebabkan karena kurangnya
                gizi maupun infeksi kronis pada 1.000 hari pertama kehidupan.
                Dokter Spesialis Anak Konsultan Endokrinologi Anak, Prof dr
                Madarina Julia, MPH., Ph.D, Sp.A (K), menjelaskan bahwa stunting
                erat kaitannya dengan asupan nutrisi yang buruk, infeksi
                berulang, dan stimulasi psikososial yang tidak memadai. "Anak
                stunting tentu mempunyai riwayat gizi dan riwayat kesehatan yang
                kurang baik. Selain itu, anak stunting juga sangat mungkin
                mengalami gangguan perkembangan," ungkap Madarina dalam webinar
                Pentingnya Pemantauan Tumbuh Kembang Terhadap Penegakkan Deteksi
                Dini Stunting pada Anak Indonesia, Kamis (24/2/2022). Sehingga,
                penting bagi orangtua untuk mendeteksi dini permasalahan
                stunting pada anak, dengan memantau tinggi badan, berat badan,
                lingkar kepala, serta dinilai perkembangannya. "Kita harus
                memantau pertumbuhan anak, apakah anak kita tumbuh dengan baik
                dilihat dari tinggi badannya, apakah anak terlalu kurus atau
                terlalu gemuk. Apakah dia berkembang sesuai dengan usianya,"
                kata Madarina. Lebih lanjut, dia berkata kecurigaan stunting
                pada anak dapat dilihat dari kondisi tubuhnya. Misalnya, apabila
                anak kurus, pendek, dan terjadi gangguan perkembangan
                kemungkinan besar dia mengalami stunting. Sebaliknya, jika anak
                pendek, tidak kurus, dan tanpa gangguan perkembangan maka dia
                tidak mengalami stunting.
              </p>
              <br />
              <br />
              <hr />
              <br />
              <Artikelkontak />
            </div>
          </div>

          <div
            className="w-full md:w-72 pl-2"
            data-aos="flip-left"
            data-aos-duration="2000"
          >
            <Cari />
            <div className="flex-shrink-0 bg-gray-100 rounded-lg p-4 mt-4 md:mt-0">
              <h1 className="text-xl font-bold mb-4">Latest Post</h1>
              <ul className="text-sm">
                <li className="flex items-center">
                  <NavLink to="/detail1" className="flex items-center">
                    <img src={Foto1} alt="" className="w-8 h-8 mr-2" />
                    Kasus Stunting <br /> pada anak di Indonesia...
                  </NavLink>
                </li>
                <li className="flex items-center mt-5">
                  <NavLink to="/detail2" className="flex items-center">
                    <img src={Foto2} alt="" className="w-8 h-8 mr-2 " />
                    Dari Banyak Masalah Gizi,
                    <br /> Kasus Stunting..
                  </NavLink>
                </li>
                <li className="flex items-center mt-5">
                  <NavLink to="/detail3" className="flex items-center">
                    <img src={Foto3} alt="" className="w-8 h-8 mr-2" />
                    Kementerian Kesehatan Rilis...
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0 bg-gray-100 rounded-lg p-4 mt-4">
              <h1 className="text-xl font-bold mb-4">Tags</h1>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="flex"
                  style={{
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#1F1E17",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "30px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                  }}
                >
                  Kesehatan
                </div>
                <div
                  className="flex"
                  style={{
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#1F1E17",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "30px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                  }}
                >
                  Stunting
                </div>
                <div
                  className="flex"
                  style={{
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#1F1E17",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "30px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                  }}
                >
                  Indonesia
                </div>
                <div
                  className="flex"
                  style={{
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#1F1E17",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "30px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                  }}
                >
                  Mental
                </div>
                <div
                  className="flex"
                  style={{
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#1F1E17",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "30px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                  }}
                >
                  Bergizi
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail2;
