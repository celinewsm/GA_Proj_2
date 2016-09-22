'use strict';
module.exports = function(sequelize, DataTypes) {
  var stall = sequelize.define('stall', {
    lat: DataTypes.DECIMAL(11,7),
    lng: DataTypes.DECIMAL(11,7),
    address: DataTypes.STRING,
    name: DataTypes.STRING,
    accountMgr: DataTypes.STRING,
    lastOrders: DataTypes.STRING,
    contactNo: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return stall;
};
