"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "orangtua",
      [
        {
          id_user: 2,
          nama_orangtua: "Budi Santoso",
          no_hp: "081234567890",
          alamat: "Jl. Merpati No. 1",
          pendapatan: "Sedang",
          wilayah: "Dataran Rendah",
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orangtua", null, {});
  },
};
