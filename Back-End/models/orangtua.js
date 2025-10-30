"use strict";

module.exports = (sequelize, DataTypes) => {
  const Orangtua = sequelize.define(
    "Orangtua",
    {
      id_orangtua: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: { type: DataTypes.INTEGER, allowNull: false },
      nama_orangtua: { type: DataTypes.STRING(100), allowNull: false },
      no_hp: { type: DataTypes.STRING(20), allowNull: true },
      alamat: { type: DataTypes.TEXT, allowNull: false },
      pendapatan: {
        type: DataTypes.ENUM("Rendah", "Sedang", "Tinggi"),
        allowNull: false,
      },
      wilayah: {
        type: DataTypes.ENUM("Pegunungan", "Dataran Rendah"),
        allowNull: false,
      },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "orangtua", timestamps: false }
  );

  Orangtua.associate = (models) => {
    Orangtua.belongsTo(models.User, { foreignKey: "id_user" });
    Orangtua.hasMany(models.Balita, { foreignKey: "id_orangtua" });
  };

  return Orangtua;
};
