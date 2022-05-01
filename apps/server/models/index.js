const Sequelize = require('sequelize');

const employee = require('./employee');
const vehicle = require('./vehicle');
const equipment = require('./equipment');
const test = require('./test');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  logging: false,
});

const models = [employee, vehicle, equipment, test];

models.forEach((model) => model(sequelize));

module.exports = sequelize;
