const sequelize = require('../../models');

async function populateDB() {
  await sequelize.models.Employee.bulkCreate([
    {
      firstName: 'Jozef',
      lastName: 'Gregus',
    },

  ]);

  await sequelize.models.Car.bulkCreate([
    {
      brand: 'Mercedes',
      model: 'Vito',
      VIN: '1234567890',
      year: '2010',
      lastService: '2022-01-17',
      tireSize: '215x55xR17',
    },
    {
      brand: 'Ford',
      model: 'Ranger',
      VIN: '1234567891',
      year: '2015',
      lastService: '2021-11-18',
      tireSize: '255x65xR16',
    },
  ]);
  await sequelize.models.Equipment.bulkCreate([
    {
      idNumber: '1',
      brand: 'makita',
      equipmentType: 'AKU',
    },

  ]);
}

module.exports = { populateDB };
