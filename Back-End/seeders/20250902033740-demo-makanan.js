"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "makanan",
      [
        { nama_makanan: "Alpukat", isi: "100 gram", created_at: new Date() },
        { nama_makanan: "Telur Rebus", isi: "1 butir", created_at: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("makanan", null, {});
  },
};
