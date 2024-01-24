const { DataTypes } = require('sequelize');

const vehicle = (sequelize) => {
  const vehicle = sequelize.define(
    'Vehicle',
    {
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
        type: DataTypes.STRING,
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
    },
    {
      timestamps: false,
    },
  );

  return vehicle;
};

module.exports = vehicle;
