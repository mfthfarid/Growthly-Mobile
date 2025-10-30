// back-end/controllers/prediksiController.js
const axios = require("axios");

// URL server ML Flask
const ML_API_URL = "http://127.0.0.1:5001/predict"; // Sesuaikan port jika berbeda

exports.predictStatusGizi = async (req, res) => {
  try {
    const { umur, jenis_kelamin, tinggi_badan } = req.body;

    // Validasi input dasar
    if (umur == null || jenis_kelamin == null || tinggi_badan == null) {
      return res
        .status(400)
        .json({
          message: "Umur, jenis kelamin, dan tinggi badan harus diisi.",
        });
    }

    // === KIRIM REQUEST KE SERVER ML ===
    const response = await axios.post(ML_API_URL, {
      umur: parseFloat(umur),
      jenis_kelamin: jenis_kelamin, // Kirim string langsung
      tinggi_badan: parseFloat(tinggi_badan),
    });

    // === KEMBALIKAN RESPON DARI SERVER ML ===
    // Axios secara otomatis menguraikan JSON response.data
    res.json(response.data);
  } catch (error) {
    console.error("Error calling ML API:", error.message);
    if (error.response) {
      // Server ML mengembalikan error (4xx, 5xx)
      return res.status(error.response.status).json(error.response.data);
    }
    // Error jaringan atau lainnya (misalnya, server ML mati)
    res
      .status(500)
      .json({
        message: "Gagal menghubungi server prediksi.",
        error: error.message,
      });
  }
};
