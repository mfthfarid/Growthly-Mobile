// controllers/dashboardController.js
const { PengukuranGizi, Balita, OrangTua, sequelize } = require("../models");
const { Op } = require("sequelize"); // ✅ Import Op

const getDashboardStats = async (req, res) => {
  try {
    const { year } = req.query;
    const targetYear = year || new Date().getFullYear();

    // 1. Total Balita
    const totalBalita = await Balita.count();

    // 2. Jumlah Pengukuran di tahun target
    const totalPengukuran = await PengukuranGizi.count({
      where: sequelize.where(
        sequelize.fn("YEAR", sequelize.col("tanggal_ukur")),
        targetYear
      ),
    });

    // 3. Jumlah Stunting di tahun target - Gunakan Op.in
    const totalStunting = await PengukuranGizi.count({
      where: {
        status_gizi: {
          [Op.in]: ["stunted", "severely stunted"], // ✅ Gunakan Op.in
        },
        [Op.and]: [
          // ✅ Gunakan Op.and
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("tanggal_ukur")),
            targetYear
          ),
        ],
      },
    });

    // ... (sisa kode lainnya, pastikan semua penggunaan Op.in, Op.and, dll, menggunakan 'Op' yang diimport)

    // 4. Prevalensi (dalam persen)
    const prevalensi =
      totalBalita > 0
        ? parseFloat(((totalStunting / totalBalita) * 100).toFixed(2))
        : 0;

    // 5. Cakupan Pengukuran (dalam persen)
    const sudahDiukur =
      totalBalita > 0
        ? parseFloat(((totalPengukuran / totalBalita) * 100).toFixed(2))
        : 0;

    // 6. Distribusi Status Gizi - Gunakan Op.in
    const statusGiziCounts = await PengukuranGizi.findAll({
      attributes: [
        "status_gizi",
        [sequelize.fn("COUNT", sequelize.col("id_gizi")), "jumlah"],
      ],
      where: {
        [Op.and]: [
          // ✅ Gunakan Op.and
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("tanggal_ukur")),
            targetYear
          ),
        ],
      },
      group: ["status_gizi"],
      raw: true,
    });

    const statusGiziMap = {
      normal: { color: "#22C55E" },
      stunted: { color: "#EF4444" },
      "severely stunted": { color: "#F59E0B" },
      tinggi: { color: "#3B82F6" },
    };

    const statusGizi = Object.entries(statusGiziMap).map(
      ([name, { color }]) => {
        const found = statusGiziCounts.find(
          (s) => s.status_gizi.toLowerCase() === name
        );
        return {
          name: name.charAt(0).toUpperCase() + name.slice(1).replace("_", " "),
          value: found ? parseInt(found.jumlah, 10) : 0,
          color,
        };
      }
    );

    // 7. Trend Bulanan - Gunakan Op.in
    const trendBulanan = await PengukuranGizi.findAll({
      attributes: [
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_ukur"), "%b-%y"),
          "bulan",
        ],
        [sequelize.fn("COUNT", sequelize.col("id_gizi")), "kasusStunting"],
      ],
      where: {
        status_gizi: {
          [Op.in]: ["stunted", "severely stunted"],
        },
        [Op.and]: [
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("tanggal_ukur")),
            targetYear
          ),
        ],
      },
      group: [
        sequelize.fn("DATE_FORMAT", sequelize.col("tanggal_ukur"), "%b-%y"),
      ],
      // ✅ Perbaikan: Gunakan alias kolom "bulan" untuk ORDER BY
      order: [[sequelize.col("bulan"), "ASC"]], // ✅ Ini yang benar
      raw: true,
    });

    // Format ulang hasil query trendBulanan agar sesuai dengan struktur frontend
    const formattedTrend = await Promise.all(
      trendBulanan.map(async (item) => {
        const [bulanAbbr, tahun] = item.bulan.split("-");
        const bulanNum =
          new Date(Date.parse(bulanAbbr + " 1, 2020")).getMonth() + 1;
        const tanggalAwal = new Date(targetYear, bulanNum - 1, 1);
        const tanggalAkhir = new Date(targetYear, bulanNum, 0);

        // Hitung kasus baru di bulan tersebut - Gunakan Op.in
        const kasusBaru = await PengukuranGizi.count({
          where: {
            status_gizi: {
              [Op.in]: ["stunted", "severely stunted"], // ✅ Gunakan Op.in
            },
            tanggal_ukur: {
              [Op.gte]: tanggalAwal, // ✅ Gunakan Op.gte
              [Op.lt]: new Date(tanggalAkhir.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        });

        return {
          bulan: item.bulan,
          kasusStunting: parseInt(item.kasusStunting, 10),
          kasusBaru: kasusBaru,
        };
      })
    );

    // 8. Distribusi Usia (sama seperti sebelumnya)

    // 9. Distribusi Gender (untuk kasus stunting di tahun target) - Gunakan Op.in
    const distribusiGender = await PengukuranGizi.findAll({
      attributes: [
        [sequelize.col("Balitum.jenis_kelamin"), "jenis_kelamin"], // ✅ Gunakan alias yang benar
        [
          sequelize.fn("COUNT", sequelize.col("PengukuranGizi.id_gizi")),
          "jumlah",
        ],
      ],
      include: [
        {
          model: Balita,
          as: "Balitum", // ✅ Tambahkan 'as' jika diperlukan, atau sesuaikan
          attributes: [], // Kita tidak butuh kolom Balita di hasil
        },
      ],
      where: {
        status_gizi: {
          [Op.in]: ["stunted", "severely stunted"],
        },
        [Op.and]: [
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("tanggal_ukur")),
            targetYear
          ),
        ],
      },
      group: ["Balitum.jenis_kelamin"], // ✅ Gunakan alias yang benar
      raw: true,
    });

    const formattedGender = [
      {
        name: "Laki-laki",
        value:
          distribusiGender.find((d) => d.jenis_kelamin === "L")?.jumlah || 0,
        color: "#3B82F6",
      },
      {
        name: "Perempuan",
        value:
          distribusiGender.find((d) => d.jenis_kelamin === "P")?.jumlah || 0,
        color: "#EC4899",
      },
    ];

    const data = {
      totalStunting,
      prevalensi,
      totalBalita,
      sudahDiukur,
      statusGizi,
      trendBulanan: formattedTrend,
      distribusiGender: formattedGender,
    };

    res.json(data);
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Gagal mengambil data dashboard" });
  }
};

const getDashboardTrends = async (req, res) => {
  try {
    const earliestYear = await PengukuranGizi.min("tanggal_ukur");
    const startYear = earliestYear
      ? new Date(earliestYear).getFullYear()
      : new Date().getFullYear();
    const currentYear = new Date().getFullYear();

    const trendTahunan = [];

    for (let year = startYear; year <= currentYear; year++) {
      const totalBalitaTahun = await Balita.count();
      // Gunakan Op.in di sini juga
      const totalStuntingTahun = await PengukuranGizi.count({
        where: {
          status_gizi: {
            [Op.in]: ["stunted", "severely stunted"],
          },
          [Op.and]: [
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("tanggal_ukur")),
              year
            ),
          ],
        },
      });

      const prevalensiTahun =
        totalBalitaTahun > 0
          ? parseFloat(
              ((totalStuntingTahun / totalBalitaTahun) * 100).toFixed(2)
            )
          : 0;

      trendTahunan.push({
        tahun: year.toString(),
        prevalensi: prevalensiTahun,
      });
    }

    res.json(trendTahunan);
  } catch (err) {
    console.error("Error fetching dashboard trends:", err);
    res.status(500).json({ message: "Gagal mengambil data tren dashboard" });
  }
};

module.exports = {
  getDashboardStats,
  getDashboardTrends,
};
