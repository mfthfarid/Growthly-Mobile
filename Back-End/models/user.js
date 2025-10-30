"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING(50), allowNull: false },
      password: { type: DataTypes.STRING(255), allowNull: false },
      role: { type: DataTypes.ENUM("admin", "orangtua"), allowNull: true, defaultValue: "orangtua" },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "users", timestamps: false }
  );

  User.associate = (models) => {
    User.hasOne(models.Orangtua, { foreignKey: "id_user" });
  };

  return User;
};
