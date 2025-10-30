"use strict";

module.exports = (sequelize, DataTypes) => {
  const Balita = sequelize.define(
    "Balita",
    {
      id_balita: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nama_balita: { type: DataTypes.STRING(100), allowNull: false },
      tgl_lahir: { type: DataTypes.DATEONLY, allowNull: false },
      jenis_kelamin: { type: DataTypes.ENUM("L", "P"), allowNull: false },
      id_orangtua: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "balita", timestamps: false }
  );

  Balita.associate = (models) => {
    Balita.belongsTo(models.Orangtua, { foreignKey: "id_orangtua" });
    Balita.hasMany(models.PengukuranGizi, { foreignKey: "id_balita" });
  };

  return Balita;
};
