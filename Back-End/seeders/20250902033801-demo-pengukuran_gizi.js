"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pengukurangizi",
      [
        {
          id_balita: 1,
          tanggal_ukur: "2025-09-01",
          tinggi_badan: 90.5,
          berat_badan: 12.3,
          status_gizi: "Normal",
          catatan: "Sehat",
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pengukurangizi", null, {});
  },
};
