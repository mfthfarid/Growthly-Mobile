"use strict";

module.exports = (sequelize, DataTypes) => {
  const PengukuranGizi = sequelize.define(
    "PengukuranGizi",
    {
      id_gizi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_balita: { type: DataTypes.INTEGER, allowNull: false },
      tanggal_ukur: { type: DataTypes.DATEONLY, allowNull: false },
      tinggi_badan: { type: DataTypes.FLOAT, allowNull: false },
      berat_badan: { type: DataTypes.FLOAT, allowNull: false },
      status_gizi: {
        type: DataTypes.ENUM("Normal", "Stunted", "Severely Stunted", "Tinggi"),
        allowNull: false,
      },
      catatan: { type: DataTypes.TEXT, allowNull: true },
      nama_posyandu: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "pengukurangizi", timestamps: false }
  );

  PengukuranGizi.associate = (models) => {
    PengukuranGizi.belongsTo(models.Balita, { foreignKey: "id_balita" });
  };

  return PengukuranGizi;
};
