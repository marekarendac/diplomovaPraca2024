const express = require('express');
const pino = require('pino-http');
const pinoPretty = require('pino-pretty');

const sequelize = require('./models');

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

app.get('/employees', async (req, res) => {
  const employees = await req.context.models.Employee.findAll();

  res.status(200).send(employees);
});

// app.get('/users', (req, res) => res.send('GET HTTP method on user resource'));

// app.post('/users', (req, res) => res.send('POST HTTP method on user resource'));

// app.put('/users', (req, res) => res.send('PUT HTTP method on user resource'));

// app.delete('/users', (req, res) => res.send('DELETE HTTP method on user resource'));

// eslint-disable-next-line no-console
sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => console.log('funguje stko'));
});
