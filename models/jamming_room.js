'use strict';
module.exports = function(sequelize, DataTypes) {
  var jamming_room = sequelize.define('jamming_room', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.jamming_room.hasMany(models.user)
      }
    }
  });
  return jamming_room;
};