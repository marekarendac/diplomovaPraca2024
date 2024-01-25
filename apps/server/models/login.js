const { DataTypes } = require('sequelize');

const login = (sequelize) => {
  const login = sequelize.define(
    'Login',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return login;
};

module.exports = login;
