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
      documentNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      iban: {
        type: DataTypes.STRING(24),
        allowNull: false,
      },
      wage: {
        type: DataTypes.DECIMAL(4, 2),
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
