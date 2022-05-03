const { DataTypes } = require('sequelize');

const workPlace = (sequelize) => {
  const workPlace = sequelize.define('WorkPlace', {
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placeShort: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return workPlace;
};

module.exports = workPlace;
