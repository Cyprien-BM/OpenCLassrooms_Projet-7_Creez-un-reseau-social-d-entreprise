'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      idPOSTS: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'idUSER'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      imageUrl: {
        type: Sequelize.STRING(500)
      },
      likes: {
        type: Sequelize.INTEGER
      },
      dislikes: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Post');
  }
};