"use strict";

module.exports = (sequelize, DataTypes) => {
  const Artikel = sequelize.define(
    "Artikel",
    {
      id_artikel: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      judul: { type: DataTypes.STRING(200), allowNull: false },
      isi: { type: DataTypes.TEXT, allowNull: false },
      penulis: { type: DataTypes.STRING(100), allowNull: true },
      foto: { type: DataTypes.STRING(255), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "artikel", timestamps: false }
  );

  return Artikel;
};
