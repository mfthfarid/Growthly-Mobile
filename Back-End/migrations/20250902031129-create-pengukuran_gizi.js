"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PengukuranGizi", {
      id_gizi: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_balita: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tanggal_ukur: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tinggi_badan: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      berat_badan: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status_gizi: {
        type: Sequelize.ENUM("Normal", "Stunting", "Gizi Kurang", "Gizi Buruk"),
        allowNull: false,
      },
      catatan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nama_posyandu: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("PengukuranGizi");
  },
};
