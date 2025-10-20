"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orangtua", {
      id_orangtua: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nama_orangtua: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      no_hp: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pendapatan: {
        type: Sequelize.ENUM("Rendah", "Sedang", "Tinggi"),
        allowNull: false,
      },
      wilayah: {
        type: Sequelize.ENUM("Pegunungan", "Dataran Rendah"),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Orangtua");
  },
};
