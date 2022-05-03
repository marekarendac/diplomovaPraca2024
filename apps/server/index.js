const express = require('express');
const pino = require('pino-http');
const pinoPretty = require('pino-pretty');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./models');
const employeesRouter = require('./routes/employees');
const vehiclesRouter = require('./routes/vehicles');
const equipmentRouter = require('./routes/equipment');
const testRouter = require('./routes/test');
const customersRouter = require('./routes/customers');
const workplacesRouter = require('./routes/workPlaces');
const workDaysRouter = require('./routes/workDays');
const { populateDB } = require('./src/helpers');

const app = express();
const port = 2000;
const logger = pino(pinoPretty());

app.use(cors());
app.use(logger);
app.use(bodyParser.json());

app.use((req, _, next) => {
  req.context = {
    models: sequelize.models,
  };
  next();
});

app.use('/employees', employeesRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/equipment', equipmentRouter);
app.use('/test', testRouter);
app.use('/workplace', workplacesRouter);
app.use('/customers', customersRouter);
app.use('/workDays', workDaysRouter);

// eslint-disable-next-line no-console
sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => populateDB().then(() => {
    console.log(`Example app listening on port ${port}!`);
  }));
});
