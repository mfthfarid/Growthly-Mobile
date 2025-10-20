const { Balita, Orangtua, PengukuranGizi } = require("../models");

// Tambah balita
exports.addBalita = async (req, res) => {
  try {
    const { nama_balita, tgl_lahir, jenis_kelamin, id_orangtua } = req.body;
    const balita = await Balita.create({
      nama_balita,
      tgl_lahir,
      jenis_kelamin,
      id_orangtua,
    });
    res.json({ message: "Balita berhasil ditambahkan ✅", balita });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan balita" });
  }
};

// Ambil semua balita, bisa filter per orangtua
exports.getBalita = async (req, res) => {
  try {
    const { id_orangtua } = req.query;
    const where = id_orangtua ? { id_orangtua } : {};
    const balitas = await Balita.findAll({
      where,
      include: [
        { model: Orangtua, as: "Orangtua" },
        { model: PengukuranGizi, as: "PengukuranGizis" },
      ],
    });
    res.json(balitas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data balita" });
  }
};

// Update balita
exports.updateBalita = async (req, res) => {
  try {
    const { id_balita } = req.params;
    const { nama_balita, tgl_lahir, jenis_kelamin } = req.body;

    const balita = await Balita.findByPk(id_balita);
    if (!balita)
      return res.status(404).json({ message: "Balita tidak ditemukan" });

    await balita.update({ nama_balita, tgl_lahir, jenis_kelamin });
    res.json({ message: "Balita berhasil diupdate ✅", balita });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengupdate balita" });
  }
};

// Hapus balita
exports.deleteBalita = async (req, res) => {
  try {
    const { id_balita } = req.params;
    const balita = await Balita.findByPk(id_balita);
    if (!balita)
      return res.status(404).json({ message: "Balita tidak ditemukan" });

    await balita.destroy();
    res.json({ message: "Balita berhasil dihapus ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus balita" });
  }
};
