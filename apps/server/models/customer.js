const { DataTypes } = require('sequelize');

const customer = (sequelize) => {
  const customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return customer;
};

module.exports = customer;
