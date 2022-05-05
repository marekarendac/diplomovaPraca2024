const { DataTypes } = require('sequelize');

const attendance = (sequelize) => {
  const attendance = sequelize.define(
    'Attendance',
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    },
  );

  return attendance;
};

module.exports = attendance;
