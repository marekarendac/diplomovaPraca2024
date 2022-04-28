const { DataTypes } = require('sequelize');

const test = (sequelize) => {
  const test = sequelize.define('Test', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  return test;
};

module.exports = test;
