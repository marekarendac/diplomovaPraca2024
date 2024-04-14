const { DataTypes } = require('sequelize');

const project = (sequelize) => {
  const Project = sequelize.define(
    'Project',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      workPlace: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customer', // name of the table
          key: 'id',
        },
      },
      workedHours: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      defaultWorkGroupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'workGroup',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    },
  );

  return Project;
};

module.exports = project;
