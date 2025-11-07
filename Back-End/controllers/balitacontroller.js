const { Balita, Orangtua, PengukuranGizi } = require("../models");

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

exports.getBalitaByOrangtua = async (req, res) => {
  try {
    console.log("👉 req.user:", req.user);
    console.log("👉 req.Orangtua:", req.Orangtua);

    const id_orangtua = req.Orangtua?.id_orangtua;
    console.log("🧩 id_orangtua:", id_orangtua);

    if (!id_orangtua) {
      return res
        .status(403)
        .json({ message: "Akses ditolak: user belum login" });
    }

    const balitas = await Balita.findAll({
      where: { id_orangtua },
      include: [
        { model: Orangtua, as: "Orangtua" },
        { model: PengukuranGizi, as: "PengukuranGizis" },
      ],
      order: [["created_at", "DESC"]], // ⚠️ ubah ke createdAt kalau model pakai camelCase
    });

    console.log("✅ Jumlah data ditemukan:", balitas.length);

    if (balitas.length === 0) {
      return res.status(200).json({
        message: "Belum ada data anak yang ditambahkan",
        balitas: [],
      });
    }

    res.status(200).json({
      message: "Data anak berhasil diambil ✅",
      balitas,
    });
  } catch (err) {
    console.error("❌ Error getBalitaByOrangtua:", err);
    res.status(500).json({
      message: "Gagal mengambil data anak",
      error: err.message,
    });
  }
};

exports.addBalita = async (req, res) => {
  try {
    const { nama_balita, tgl_lahir, jenis_kelamin } = req.body;
    const id_orangtua = req.Orangtua?.id_orangtua;

    if (!id_orangtua) {
      return res
        .status(403)
        .json({ message: "Akses ditolak: user tidak terautentikasi" });
    }

    if (!nama_balita || !tgl_lahir || !jenis_kelamin) {
      return res.status(400).json({
        message: "Nama, tanggal lahir, dan jenis kelamin wajib diisi",
      });
    }

    const balita = await Balita.create({
      nama_balita,
      tgl_lahir,
      jenis_kelamin,
      id_orangtua,
    });

    res.status(201).json({ message: "Balita berhasil ditambahkan ✅", balita });
  } catch (err) {
    console.error("Error addBalita:", err);
    res.status(500).json({ message: "Gagal menambahkan balita" });
  }
};

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
exports.getBalitaStats = async (req, res) => {
  try {
    const totalBalita = await Balita.count();

    const totalLakiLaki = await Balita.count({ where: { jenis_kelamin: "L" } });
    const totalPerempuan = await Balita.count({
      where: { jenis_kelamin: "P" },
    });

    res.json({
      message: "Statistik balita berhasil diambil ✅",
      stats: {
        total_balita: totalBalita,
        total_laki_laki: totalLakiLaki,
        total_perempuan: totalPerempuan,
      },
    });
  } catch (err) {
    console.error("Error getBalitaStats:", err);
    res.status(500).json({ message: "Gagal mengambil statistik balita" });
  }
};
