require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models");

// Import routes
const authRoutes = require("./routes/auth");
const balitaRoutes = require("./routes/balita");
const makananRoutes = require("./routes/makanan");
const artikelRoutes = require("./routes/artikel");
const pengukuranGiziRoutes = require("./routes/pengukurangizi");
const orangtuaRoutes = require("./routes/orangtua");
const dashboardRoutes = require("./routes/dashboardRoutes");

const prediksiRoutes = require("./routes/prediksiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Cek koneksi database
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Koneksi Sequelize sukses 👍");

    await db.sequelize.sync(); // sync model ke DB
    console.log("Database synced ✅");
  } catch (err) {
    console.error("Koneksi atau sync gagal:", err);
  }
})();

app.get("/", (req, res) => {
  res.send("Backend API jalan 🚀");
});
// Di server.js
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/balita", balitaRoutes);
app.use("/api/makanan", makananRoutes);
app.use("/api/artikel", artikelRoutes);
app.use("/api/orangtua", orangtuaRoutes);
app.use("/api/pengukuran", pengukuranGiziRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/predict", prediksiRoutes); // Tambahkan ini

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Terjadi kesalahan server!" });
});

app.listen(PORT, () => {
  console.log(`Server backend jalan di http://localhost:${PORT}`);
});
