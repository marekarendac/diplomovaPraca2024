const { DataTypes } = require('sequelize');

const equipment = (sequelize) => {
  const equipment = sequelize.define(
    'Equipment',
    {
      idNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      equipmentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return equipment;
};

module.exports = equipment;
