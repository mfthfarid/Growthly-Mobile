"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "artikel",
      [
        {
          judul: "Pentingnya Gizi Balita",
          isi: "Artikel tentang pentingnya gizi seimbang untuk balita.",
          penulis: "Admin",
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("artikel", null, {});
  },
};
