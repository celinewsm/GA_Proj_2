'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('stalls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lat: {
        type: Sequelize.DECIMAL(11,7)
      },
      lng: {
        type: Sequelize.DECIMAL(11,7)
      },
      address: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      accountMgr: {
        type: Sequelize.STRING
      },
      lastOrders: {
        type: Sequelize.STRING
      },
      contactNo: {
        type: Sequelize.STRING
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('stalls');
  }
};
