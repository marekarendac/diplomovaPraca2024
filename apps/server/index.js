const express = require('express');
const pino = require('pino-http');
const pinoPretty = require('pino-pretty');

const sequelize = require('./models');
const employeesRouter = require('./routes/employees');
const carsRouter = require('./routes/cars');

const app = express();
const port = 2000;

const logger = pino(pinoPretty());

app.use(logger);

app.use((req, _, next) => {
  req.context = {
    models: sequelize.models,
  };

  next();
});

app.use('/employees', employeesRouter);
app.use('/cars', carsRouter);

// eslint-disable-next-line no-console
sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => console.log('funguje stko'));
});
