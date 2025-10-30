const { Makanan } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup folder uploads
const UPLOAD_FOLDER = "uploads/makanan";
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

// Tambah makanan
exports.addMakanan = async (req, res) => {
  try {
    const { nama_makanan, isi } = req.body;
    const foto = req.file ? req.file.filename : null;

    const makanan = await Makanan.create({ nama_makanan, isi, foto });
    res.json({ message: "Makanan berhasil ditambahkan ✅", makanan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan makanan" });
  }
};

// Ambil semua makanan
exports.getMakanan = async (req, res) => {
  try {
    const makanan = await Makanan.findAll();
    res.json(makanan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data makanan" });
  }
};

// Update makanan
exports.updateMakanan = async (req, res) => {
  try {
    const { id_makanan } = req.params;
    const { nama_makanan, isi } = req.body;

    const makanan = await Makanan.findByPk(id_makanan);
    if (!makanan)
      return res.status(404).json({ message: "Makanan tidak ditemukan" });

    if (req.file && makanan.foto) {
      // Hapus foto lama
      const oldPath = path.join(UPLOAD_FOLDER, makanan.foto);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const foto = req.file ? req.file.filename : makanan.foto;

    await makanan.update({ nama_makanan, isi, foto });
    res.json({ message: "Makanan berhasil diupdate ✅", makanan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengupdate makanan" });
  }
};

// Hapus makanan
exports.deleteMakanan = async (req, res) => {
  try {
    const { id_makanan } = req.params;
    const makanan = await Makanan.findByPk(id_makanan);
    if (!makanan)
      return res.status(404).json({ message: "Makanan tidak ditemukan" });

    if (makanan.foto) {
      const oldPath = path.join(UPLOAD_FOLDER, makanan.foto);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await makanan.destroy();
    res.json({ message: "Makanan berhasil dihapus ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus makanan" });
  }
};
// Ambil makanan berdasarkan ID
exports.getMakananById = async (req, res) => {
  try {
    const { id_makanan } = req.params;
    const makanan = await Makanan.findByPk(id_makanan);

    if (!makanan)
      return res.status(404).json({ message: "Makanan tidak ditemukan" });

    res.json(makanan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil makanan" });
  }
};

// Export multer middleware
exports.upload = upload.single("foto");

exports.getMakananStats = async (req, res) => {
  try {
    const totalMakanan = await Makanan.count();
    res.json({
      message: "Statistik artikel berhasil diambil ✅",
      stats: {
        total_makanan: totalMakanan,
      },
    });
  } catch (err) {
    console.error("Error getMakananStats:", err);
    res.status(500).json({ message: "Gagal mengambil statistik Makanan" });
  }
};
