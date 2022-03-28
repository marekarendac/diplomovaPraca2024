const Sequelize = require('sequelize');

const employee = require('./employee');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  logging: false,
});

const models = [employee];

models.forEach((model) => model(sequelize));

module.exports = sequelize;
