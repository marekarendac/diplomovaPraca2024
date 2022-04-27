const Sequelize = require('sequelize');

const employee = require('./employee');
const car = require('./car');
const equipment = require('./equipment');
const test = require('./test');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  logging: false,
});

const models = [employee, car, equipment, test];

models.forEach((model) => model(sequelize));

module.exports = sequelize;
