const db = require("../models");
const User = db.User;
const Orangtua = db.Orangtua;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const {
      username,
      password,
      nama_orangtua,
      no_hp,
      alamat,
      pendapatan, // angka (misal: 1000000)
      wilayah, // "dataran_rendah" atau "pegunungan"
    } = req.body;

    // ✅ Konversi pendapatan ke ENUM
    let pendapatanEnum;
    if (pendapatan < 1000000) {
      pendapatanEnum = "Rendah";
    } else if (pendapatan >= 2000000 && pendapatan < 5000000) {
      pendapatanEnum = "Sedang";
    } else if (pendapatan >= 5000000) {
      pendapatanEnum = "Tinggi";
    } else {
      pendapatanEnum = "Rendah"; // Default jika tidak sesuai
    }

    // ✅ Konversi wilayah ke ENUM
    let wilayahEnum;
    if (wilayah.toLowerCase() === "dataran_rendah") {
      wilayahEnum = "Dataran Rendah";
    } else if (wilayah.toLowerCase() === "pegunungan") {
      wilayahEnum = "Pegunungan";
    } else {
      wilayahEnum = "Dataran Rendah"; // Default
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Buat data orangtua terkait
    await Orangtua.create({
      id_user: newUser.id_user,
      nama_orangtua,
      no_hp,
      alamat,
      pendapatan: pendapatanEnum,
      wilayah: wilayahEnum,
    });

    res
      .status(201)
      .json({ message: "Registrasi berhasil ✅", userId: newUser.id_user });
  } catch (err) {
    console.error("Error register:", err);
    res.status(500).json({ message: "Gagal registrasi" });
  }
};

exports.lupaPassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    // Cari user berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password berhasil diubah ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengubah password" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari user beserta data orangtua
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Orangtua,
          attributes: [
            "nama_orangtua",
            "no_hp",
            "alamat",
            "pendapatan",
            "wilayah",
          ],
        },
      ],
    });

    if (!user)
      return res.status(404).json({ message: "Username tidak ditemukan" });

    // Cek password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Password salah" });

    // Generate JWT
    const token = jwt.sign(
      { id_user: user.id_user, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Kirim response lengkap dengan data orangtua
    res.json({
      message: "Login berhasil ✅",
      user: {
        id_user: user.id_user,
        username: user.username,
        role: user.role,
        ...user.Orangtua?.dataValues, // ⬅️ gabungkan data dari tabel orangtua
      },
      token,
    });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ message: "Gagal login" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id_user } = req.params; // ambil dari URL misal: /updateProfile/:id_user
    const { nama_orangtua, no_hp, alamat } = req.body;

    const orangtua = await db.Orangtua.findOne({ where: { id_user } });
    if (!orangtua)
      return res.status(404).json({ message: "Data orangtua tidak ditemukan" });

    // Update field
    orangtua.nama_orangtua = nama_orangtua || orangtua.nama_orangtua;
    orangtua.no_hp = no_hp || orangtua.no_hp;
    orangtua.alamat = alamat || orangtua.alamat;

    await orangtua.save();

    res.json({
      message: "Profil berhasil diperbarui ✅",
      data: orangtua,
    });
  } catch (err) {
    console.error("Error update profile:", err);
    res.status(500).json({ message: "Gagal memperbarui profil" });
  }
};
// ✅ Update password (hanya untuk user biasa)
exports.updatePassword = async (req, res) => {
  try {
    const { id_user } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await db.User.findOne({ where: { id_user } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Password lama salah ❌" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password berhasil diperbarui ✅" });
  } catch (err) {
    console.error("Error update password:", err);
    res.status(500).json({ message: "Gagal memperbarui password" });
  }
};
