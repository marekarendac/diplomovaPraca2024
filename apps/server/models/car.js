const { DataTypes } = require('sequelize');

const car = (sequelize) => {
  const car = sequelize.define('Car', {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    VIN: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastService: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tireSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
  });

  return car;
};

module.exports = car;
