'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    jammingRoomId: DataTypes.INTEGER,
    socketId: DataTypes.STRING,
    instrument: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.user.belongsTo(models.jamming_room)
      }
    }
  });
  return user;
};