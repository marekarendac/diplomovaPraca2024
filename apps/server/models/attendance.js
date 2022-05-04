const { DataTypes } = require('sequelize');

const attendance = (sequelize) => {
  const attendance = sequelize.define(
    'Attendance',
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return attendance;
};

module.exports = attendance;
