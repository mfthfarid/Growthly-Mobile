"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Artikel", {
      id_artikel: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      judul: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      isi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      penulis: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      foto: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Artikel");
  },
};
