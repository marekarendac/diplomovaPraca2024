const { DataTypes } = require('sequelize');

const customer = (sequelize) => {
  const customer = sequelize.define(
    'Customer',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ICO: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DIC: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ICDPH: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      IBAN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pointOfContact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PSC: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return customer;
};

module.exports = customer;
