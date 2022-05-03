const Sequelize = require('sequelize');

const employee = require('./employee');
const vehicle = require('./vehicle');
const equipment = require('./equipment');
const test = require('./test');
const workPlace = require('./workPlace');
const customer = require('./customer');
const workDay = require('./workDay');
const attendance = require('./attendance');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  logging: false,
});

const models = [employee, vehicle, equipment, test, workPlace, customer, workDay, attendance];

models.forEach((model) => model(sequelize));

module.exports = sequelize;
