const { DataTypes } = require('sequelize');

const employeeAttendance = (sequelize) => {
  const employeeAttendance = sequelize.define(
    'EmployeeAttendance',
    {
      hours: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    },
  );

  return employeeAttendance;
};

module.exports = employeeAttendance;
