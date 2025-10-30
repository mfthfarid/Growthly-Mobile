const { Orangtua, User } = require("../models");
const { Op } = require("sequelize");
// Tambah data orangtua
exports.addOrangtua = async (req, res) => {
  try {
    const { id_user, nama_orangtua, no_hp, alamat, pendapatan, wilayah } =
      req.body;

    const orangtua = await Orangtua.create({
      id_user,
      nama_orangtua,
      no_hp,
      alamat,
      pendapatan,
      wilayah,
    });

    res.json({ message: "Orangtua berhasil ditambahkan ✅", orangtua });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan orangtua" });
  }
};

// Ambil semua orangtua
exports.getOrangtua = async (req, res) => {
  try {
    const orangtua = await Orangtua.findAll({ include: [{ model: User }] });
    res.json(orangtua);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data orangtua" });
  }
};

// Ambil orangtua berdasarkan ID
exports.getOrangtuaById = async (req, res) => {
  try {
    const { id_orangtua } = req.params;
    const orangtua = await Orangtua.findByPk(id_orangtua, {
      include: [{ model: User }],
    });

    if (!orangtua)
      return res.status(404).json({ message: "Data orangtua tidak ditemukan" });

    res.json(orangtua);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data orangtua" });
  }
};

// Update orangtua
exports.updateOrangtua = async (req, res) => {
  try {
    const { id_orangtua } = req.params;
    const { nama_orangtua, no_hp, alamat, pendapatan, wilayah } = req.body;

    const orangtua = await Orangtua.findByPk(id_orangtua);
    if (!orangtua)
      return res.status(404).json({ message: "Data orangtua tidak ditemukan" });

    await orangtua.update({
      nama_orangtua,
      no_hp,
      alamat,
      pendapatan,
      wilayah,
    });

    res.json({ message: "Orangtua berhasil diupdate ✅", orangtua });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengupdate orangtua" });
  }
};

// Hapus orangtua
exports.deleteOrangtua = async (req, res) => {
  try {
    const { id_orangtua } = req.params;

    const orangtua = await Orangtua.findByPk(id_orangtua);
    if (!orangtua)
      return res.status(404).json({ message: "Data orangtua tidak ditemukan" });

    await orangtua.destroy();

    res.json({ message: "Orangtua berhasil dihapus ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus orangtua" });
  }
};

exports.getOrangtuaStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Total semua orang tua
    const totalOrangtua = await Orangtua.count();

    // Total orang tua bulan ini
    const totalBulanIni = await Orangtua.count({
      where: {
        created_at: {
          [Op.gte]: startOfMonth,
        },
      },
    });

    // Total orang tua tahun ini
    const totalTahunIni = await Orangtua.count({
      where: {
        created_at: {
          [Op.gte]: startOfYear,
        },
      },
    });

    res.json({
      message: "Statistik orang tua berhasil diambil ✅",
      stats: {
        total_orangtua: totalOrangtua,
        total_bulan_ini: totalBulanIni,
        total_tahun_ini: totalTahunIni,
      },
    });
  } catch (err) {
    console.error("Error getOrangtuaStats:", err);
    res.status(500).json({ message: "Gagal mengambil statistik orang tua" });
  }
};
