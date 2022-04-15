const Sequelize = require('sequelize');

const employee = require('./employee');
const car = require('./car');
const equipment = require('./equipment');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  logging: false,
});

const models = [employee, car, equipment];

models.forEach((model) => model(sequelize));

module.exports = sequelize;
