const { DataTypes } = require('sequelize');

const attendance = (sequelize) => {
  const attendance = sequelize.define('Attendance', {
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hours: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

  }, {
    timestamps: false,
  });

  return attendance;
};

module.exports = attendance;
