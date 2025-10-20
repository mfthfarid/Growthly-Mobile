"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Balita", {
      id_balita: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_balita: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tgl_lahir: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      jenis_kelamin: {
        type: Sequelize.ENUM("L", "P"),
        allowNull: false,
      },
      id_orangtua: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Balita");
  },
};
