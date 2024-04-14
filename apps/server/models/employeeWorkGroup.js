const { DataTypes } = require('sequelize');

const employeeWorkGroup = (sequelize) => {
  const EmployeeWorkGroup = sequelize.define(
    'EmployeeWorkGroup',
    {
      EmployeeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Employee', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      WorkGroupId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'WorkGroup', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
    },
    {
      timestamps: false,
    },
  );

  return EmployeeWorkGroup;
};

module.exports = employeeWorkGroup;
