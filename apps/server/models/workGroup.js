const { DataTypes } = require('sequelize');

const workGroup = (sequelize) => {
  const workGroup = sequelize.define(
    'WorkGroup',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return workGroup;
};

module.exports = workGroup;
