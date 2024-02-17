const { DataTypes } = require('sequelize');

const employee = (sequelize) => {
  const employee = sequelize.define(
    'Employee',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contractType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      healthExam: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return employee;
};

module.exports = employee;
