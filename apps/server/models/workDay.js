const { DataTypes } = require('sequelize');

const workDay = (sequelize) => {
  const workDay = sequelize.define('WorkDay', {
    totalHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    responsibleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return workDay;
};

module.exports = workDay;
