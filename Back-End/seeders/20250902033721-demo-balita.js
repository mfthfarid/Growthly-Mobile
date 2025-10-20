"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "balita",
      [
        {
          nama_balita: "Rizky",
          tgl_lahir: "2020-06-01",
          jenis_kelamin: "L",
          id_orangtua: 1,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("balita", null, {});
  },
};
