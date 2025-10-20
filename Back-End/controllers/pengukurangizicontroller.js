const { PengukuranGizi, Balita } = require("../models");

// Tambah pengukuran gizi
exports.addPengukuran = async (req, res) => {
  try {
    const {
      id_balita,
      tanggal_ukur,
      tinggi_badan,
      berat_badan,
      status_gizi,
      catatan,
      nama_posyandu,
    } = req.body;

    // Pastikan Balita ada
    const balita = await Balita.findByPk(id_balita);
    if (!balita)
      return res.status(404).json({ message: "Balita tidak ditemukan" });

    const pengukuran = await PengukuranGizi.create({
      id_balita,
      tanggal_ukur,
      tinggi_badan,
      berat_badan,
      status_gizi,
      catatan,
      nama_posyandu,
    });

    res.json({ message: "Pengukuran berhasil ditambahkan ✅", pengukuran });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan pengukuran" });
  }
};

// Ambil semua pengukuran
exports.getPengukuran = async (req, res) => {
  try {
    const pengukuran = await PengukuranGizi.findAll({
      include: { model: Balita, attributes: ["id_balita", "nama_balita"] },
    });
    res.json(pengukuran);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data pengukuran" });
  }
};

// Update pengukuran
exports.updatePengukuran = async (req, res) => {
  try {
    const { id_gizi } = req.params;
    const {
      tanggal_ukur,
      tinggi_badan,
      berat_badan,
      status_gizi,
      catatan,
      nama_posyandu,
    } = req.body;

    const pengukuran = await PengukuranGizi.findByPk(id_gizi);
    if (!pengukuran)
      return res.status(404).json({ message: "Pengukuran tidak ditemukan" });

    await pengukuran.update({
      tanggal_ukur,
      tinggi_badan,
      berat_badan,
      status_gizi,
      catatan,
      nama_posyandu,
    });

    res.json({ message: "Pengukuran berhasil diupdate ✅", pengukuran });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengupdate pengukuran" });
  }
};

// Hapus pengukuran
exports.deletePengukuran = async (req, res) => {
  try {
    const { id_gizi } = req.params;

    const pengukuran = await PengukuranGizi.findByPk(id_gizi);
    if (!pengukuran)
      return res.status(404).json({ message: "Pengukuran tidak ditemukan" });

    await pengukuran.destroy();
    res.json({ message: "Pengukuran berhasil dihapus ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus pengukuran" });
  }
};
