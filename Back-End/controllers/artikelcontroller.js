const { Artikel } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Folder upload
const UPLOAD_FOLDER = "uploads/artikel";
if (!fs.existsSync(UPLOAD_FOLDER))
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });

// Setup Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

// Tambah artikel
exports.addArtikel = async (req, res) => {
  try {
    const { judul, isi, penulis } = req.body;
    const foto = req.file ? req.file.filename : null;

    const artikel = await Artikel.create({ judul, isi, penulis, foto });
    res.json({ message: "Artikel berhasil ditambahkan ✅", artikel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan artikel" });
  }
};

// Ambil semua artikel
exports.getArtikel = async (req, res) => {
  try {
    const artikel = await Artikel.findAll();
    res.json(artikel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data artikel" });
  }
};
// Ambil artikel berdasarkan ID
exports.getArtikelById = async (req, res) => {
  try {
    const { id_artikel } = req.params; // ambil id dari parameter URL
    const artikel = await Artikel.findByPk(id_artikel);

    if (!artikel) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    res.json(artikel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data artikel" });
  }
};

// Update artikel
exports.updateArtikel = async (req, res) => {
  try {
    const { id_artikel } = req.params;
    const { judul, isi, penulis } = req.body;

    const artikel = await Artikel.findByPk(id_artikel);
    if (!artikel)
      return res.status(404).json({ message: "Artikel tidak ditemukan" });

    if (req.file && artikel.foto) {
      const oldPath = path.join(UPLOAD_FOLDER, artikel.foto);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const foto = req.file ? req.file.filename : artikel.foto;

    await artikel.update({ judul, isi, penulis, foto });
    res.json({ message: "Artikel berhasil diupdate ✅", artikel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengupdate artikel" });
  }
};

// Hapus artikel
exports.deleteArtikel = async (req, res) => {
  try {
    const { id_artikel } = req.params;
    const artikel = await Artikel.findByPk(id_artikel);
    if (!artikel)
      return res.status(404).json({ message: "Artikel tidak ditemukan" });

    if (artikel.foto) {
      const oldPath = path.join(UPLOAD_FOLDER, artikel.foto);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await artikel.destroy();
    res.json({ message: "Artikel berhasil dihapus ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus artikel" });
  }
};

// Export multer middleware
exports.upload = upload.single("foto");

exports.getArtikelStats = async (req, res) => {
  try {
    // Hanya hitung semua baris di tabel Artikel
    const totalArtikel = await Artikel.count();
    console.log("[BACKEND] Total artikel dihitung:", totalArtikel); // Tambahkan log ini
    res.json({
      message: "Statistik artikel berhasil diambil ✅",
      stats: {
        total_artikel: totalArtikel,
      },
    });
  } catch (err) {
    console.error("Error getArtikelStats:", err);
    res.status(500).json({ message: "Gagal mengambil statistik artikel" });
  }
};
