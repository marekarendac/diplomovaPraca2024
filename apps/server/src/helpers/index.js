const sequelize = require('../../models');

async function populateDB() {
  await sequelize.models.Employee.bulkCreate([
    {
      name: 'Jozef Gabor',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-17',
    },
    {
      name: 'Jozef Vasiľ',
      position: 'Majster',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-17',
    },
    {
      name: 'Peter Zborný',
      position: 'pracovník',
      phoneNumber: '0902369765',
      contractType: 'Živnostník',
      healthExam: '2019-01-17',
    },
    {
      name: 'Steven Twisted',
      position: 'Majster',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2017-01-17',
    },
    {
      name: 'František Bobor',
      position: 'pracovník',
      phoneNumber: '0902369765',
      contractType: 'Živnostník',
      healthExam: '2021-01-17',
    },
  ]);

  await sequelize.models.Vehicle.bulkCreate([
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
  await sequelize.models.WorkPlace.bulkCreate([
    {
      company: 'USS',
      placeShort: 'A1',

    },
    {
      company: 'USS',
      placeShort: 'A2',

    },
    {
      company: 'USS',
      placeShort: 'A3',

    },
    {
      company: 'USS',
      placeShort: 'A4',

    },
    {
      company: 'USS',
      placeShort: 'B1',

    },
    {
      company: 'USS',
      placeShort: 'B2',

    },
    {
      company: 'USS',
      placeShort: 'B3',

    },

  ]);
  await sequelize.models.Customer.bulkCreate([
    {
      name: 'USS',
      phoneNumber: '090237574',

    },
    {
      name: 'KAPTIVA',
      phoneNumber: '090237574',

    },
    {
      name: 'SURI',
      phoneNumber: '090237574',

    },
    {
      name: 'LEKE',
      phoneNumber: '090237574',

    },
    {
      name: 'PLeNO',
      phoneNumber: '090237574',

    },

  ]);
  await sequelize.models.Attendance.create(
    {
      date: '2022-01-17',

    },

  );
}

module.exports = { populateDB };
