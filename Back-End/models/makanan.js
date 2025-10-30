"use strict";

module.exports = (sequelize, DataTypes) => {
  const Makanan = sequelize.define(
    "Makanan",
    {
      id_makanan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_makanan: { type: DataTypes.STRING(150), allowNull: false },
      isi: { type: DataTypes.TEXT, allowNull: false },
      foto: { type: DataTypes.STRING(255), allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "makanan", timestamps: false }
  );

  return Makanan;
};
