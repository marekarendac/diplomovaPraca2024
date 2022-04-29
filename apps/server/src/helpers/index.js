const sequelize = require('../../models');

async function populateDB() {
  await sequelize.models.Employee.bulkCreate([
    {
      firstName: 'Jozef',
      lastName: 'Greguš',
    },
    {
      firstName: 'Peter',
      lastName: 'Zborný',
    },
    {
      firstName: 'Zinedine',
      lastName: 'Zidane',
    },
    {
      firstName: 'Maroš',
      lastName: 'Kramár',
    },
    {
      firstName: 'Jozef',
      lastName: 'Greguš',
    },
    {
      firstName: 'Peter',
      lastName: 'Zborný',
    },
    {
      firstName: 'Zinedine',
      lastName: 'Zidane',
    },
    {
      firstName: 'Maroš',
      lastName: 'Kramár',
    },
    {
      firstName: 'Jozef',
      lastName: 'Greguš',
    },
    {
      firstName: 'Peter',
      lastName: 'Zborný',
    },
    {
      firstName: 'Zinedine',
      lastName: 'Zidane',
    },
    {
      firstName: 'Maroš',
      lastName: 'Kramár',
    },
    {
      firstName: 'Jozef',
      lastName: 'Greguš',
    },
    {
      firstName: 'Peter',
      lastName: 'Zborný',
    },
    {
      firstName: 'Zinedine',
      lastName: 'Zidane',
    },
    {
      firstName: 'Maroš',
      lastName: 'Kramár',
    },
    {
      firstName: 'Jozef',
      lastName: 'Greguš',
    },
    {
      firstName: 'Peter',
      lastName: 'Zborný',
    },
    {
      firstName: 'Zinedine',
      lastName: 'Zidane',
    },
    {
      firstName: 'Maroš',
      lastName: 'Kramár',
    },
    {
      firstName: 'Jozef',
      lastName: 'Greguš',
    },
    {
      firstName: 'Peter',
      lastName: 'Zborný',
    },
    {
      firstName: 'Zinedine',
      lastName: 'Zidane',
    },
    {
      firstName: 'Maroš',
      lastName: 'Kramár',
    },
    {
      firstName: 'Jozef',
      lastName: 'Greguš',
    },
    {
      firstName: 'Peter',
      lastName: 'Zborný',
    },
    {
      firstName: 'Zinedine',
      lastName: 'Zidane',
    },
    {
      firstName: 'Maroš',
      lastName: 'Kramár',
    },
    {
      firstName: 'Jozef',
      lastName: 'Greguš',
    },
    {
      firstName: 'Peter',
      lastName: 'Zborný',
    },
    {
      firstName: 'Zinedine',
      lastName: 'Zidane',
    },
    {
      firstName: 'Maroš',
      lastName: 'Kramár',
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
      idNumber: '100',
      brand: 'makita',
      equipmentType: 'AKU vrtacka',
    },
    {
      idNumber: '200',
      brand: 'bosch',
      equipmentType: 'elektricka vrtacka',
    },
    {
      idNumber: '100',
      brand: 'makita',
      equipmentType: 'AKU vrtacka',
    },
    {
      idNumber: '200',
      brand: 'bosch',
      equipmentType: 'elektricka vrtacka',
    },
    {
      idNumber: '100',
      brand: 'makita',
      equipmentType: 'AKU vrtacka',
    },
    {
      idNumber: '200',
      brand: 'bosch',
      equipmentType: 'elektricka vrtacka',
    },
    {
      idNumber: '100',
      brand: 'makita',
      equipmentType: 'AKU vrtacka',
    },
    {
      idNumber: '200',
      brand: 'bosch',
      equipmentType: 'elektricka vrtacka',
    },
    {
      idNumber: '100',
      brand: 'makita',
      equipmentType: 'AKU vrtacka',
    },
    {
      idNumber: '200',
      brand: 'bosch',
      equipmentType: 'elektricka vrtacka',
    },
    {
      idNumber: '100',
      brand: 'makita',
      equipmentType: 'AKU vrtacka',
    },
    {
      idNumber: '200',
      brand: 'bosch',
      equipmentType: 'elektricka vrtacka',
    },

  ]);
  await sequelize.models.Test.bulkCreate([
    {
      email: 'marek@example.sk',
      password: 'zidan',

    },
    {
      email: '2marek@example.com',
      password: '1234',

    },

  ]);
}

module.exports = { populateDB };
