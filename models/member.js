'use strict';
module.exports = function(sequelize, DataTypes) {
  var member = sequelize.define('member', {
    userType: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return member;
};
