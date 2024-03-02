const express = require('express');
const pino = require('pino-http');
const pinoPretty = require('pino-pretty');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./models');
const employeesRouter = require('./routes/employees');
const vehiclesRouter = require('./routes/vehicles');
const equipmentRouter = require('./routes/equipment');
const customersRouter = require('./routes/customers');
const workplacesRouter = require('./routes/workPlaces');
const attendancesRouter = require('./routes/attendances');
const notificationsRouter = require('./routes/notifications');
const loginRouter = require('./routes/login');
const exportEmployeesRouter = require('./routes/exportEmployees');
const exportVehiclesRouter = require('./routes/exportVehicles');
const exportEquipmentRouter = require('./routes/exportEquipment');

// const { populateDB } = require('./src/helpers');

const app = express();
const port = 8080;
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
app.use('/workPlaces', workplacesRouter);
app.use('/customers', customersRouter);
app.use('/attendances', attendancesRouter);
app.use('/notifications', notificationsRouter);
app.use('/login', loginRouter);
app.use('/exportEmployees', exportEmployeesRouter);
app.use('/exportVehicles', exportVehiclesRouter);
app.use('/exportEquipment', exportEquipmentRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
