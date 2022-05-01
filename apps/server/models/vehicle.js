const { DataTypes } = require('sequelize');

const vehicle = (sequelize) => {
  const vehicle = sequelize.define('Vehicle', {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    tireSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return vehicle;
};

module.exports = vehicle;
