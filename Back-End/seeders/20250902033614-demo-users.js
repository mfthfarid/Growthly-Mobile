"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin",
          password:
            "$2b$10$B7mxPM/tkq/vx2b66lTQ6OxiMy/sf.zU90dIsj5gP2sRz4XJKaKhC",
          role: "admin",
          created_at: new Date(),
        },
        {
          username: "budi1",
          password:
            "$2b$10$B7mxPM/tkq/vx2b66lTQ6OxiMy/sf.zU90dIsj5gP2sRz4XJKaKhC",
          role: "orangtua",
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
