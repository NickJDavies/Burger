module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {timestamps: false});
  return Burger;
};