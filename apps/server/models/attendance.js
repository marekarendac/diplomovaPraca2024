const { DataTypes } = require('sequelize');

const attendance = (sequelize) => {
  const attendance = sequelize.define(
    'Attendance',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      workedHours: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      workDescription: {
        type: DataTypes.TEXT,
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
