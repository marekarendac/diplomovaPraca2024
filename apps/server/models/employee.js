const { DataTypes } = require('sequelize');

const employee = (sequelize) => {
  const employee = sequelize.define('Employee', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return employee;
};

module.exports = employee;
