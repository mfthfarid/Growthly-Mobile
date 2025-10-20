const db = require("../models");
const User = db.User;
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
      pendapatan,
      wilayah,
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      nama_orangtua,
      no_hp,
      alamat,
      pendapatan,
      wilayah,
    });

    res.status(201).json({ message: "Registrasi berhasil ✅", user: newUser });
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

    // Cari user berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (!user)
      return res.status(404).json({ message: "Username tidak ditemukan" });

    // Cek password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Password salah" });

    // Ambil role dari database
    const role = user.role; // bisa "admin" atau "orang_tua"

    // Generate JWT
    const token = jwt.sign(
      { id_user: user.id_user, username: user.username, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: "Login berhasil ✅",
      user: {
        id_user: user.id_user,
        username: user.username,
        nama_orangtua: user.nama_orangtua,
        no_hp: user.no_hp,
        alamat: user.alamat,
        pendapatan: user.pendapatan,
        wilayah: user.wilayah,
        role,
      },
      token,
    });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ message: "Gagal login" });
  }
};
