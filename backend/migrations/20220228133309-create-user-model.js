'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      idUSER: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Veuillez rentrer un email valide"
          }
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      firstname: {
        type: Sequelize.STRING(100)
      },
      lastname: {
        type: Sequelize.STRING(100)
      },
      pictureUrl: {
        type: Sequelize.BLOB("long")
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};