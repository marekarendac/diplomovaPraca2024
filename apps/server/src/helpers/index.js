const sequelize = require('../../models');

async function populateDB() {
  await sequelize.models.Employee.bulkCreate([
    {
      name: 'Peter Zborný',
      position: 'Majster',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-17',
    },
    {
      name: 'Jozef Gábor',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-17',
    },
    {
      name: 'Milan Vasiľ',
      position: 'Majster',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-17',
    },
    {
      name: 'Bohuš Repák',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Živnostník',
      healthExam: '2022-01-17',
    },
    {
      name: 'Steven Twisted',
      position: 'Majster',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-17',
    },
    {
      name: 'František Bobor',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Živnostník',
      healthExam: '2022-01-17',
    },
    {
      name: 'Peter Kováč',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Živnostník',
      healthExam: '2022-01-05',
    },
    {
      name: 'Milan Kocúr',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-17',
    },
    {
      name: 'Richard Milečkin',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-17',
    },
    {
      name: 'Karol Kľúčik',
      position: 'Majster',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2021-01-17',
    },
    {
      name: 'Kristián Polovičkin',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Živnostník',
      healthExam: '2021-01-07',
    },
    {
      name: 'Pavol Jarčuška',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Živnostník',
      healthExam: '2022-02-11',
    },
    {
      name: 'Ervin Ronaldo',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-18',
    },
    {
      name: 'Samuel Lakatoš',
      position: 'Pracovník',
      phoneNumber: '0902369765',
      contractType: 'Zamestnanec',
      healthExam: '2021-08-18',
    },
    {
      name: 'Matej Králik',
      position: 'Pracovník',
      phoneNumber: '0902369235',
      contractType: 'Zamestnanec',
      healthExam: '2021-01-17',
    },
    {
      name: 'Maroš Topoľ',
      position: 'Pracovník',
      phoneNumber: '0902328455',
      contractType: 'Zamestnanec',
      healthExam: '2021-11-29',
    },
    {
      name: 'Ján Mihalčin',
      position: 'Pracovník',
      phoneNumber: '0902369298',
      contractType: 'Zamestnanec',
      healthExam: '2022-01-17',
    },
    {
      name: 'Juraj Benetin',
      position: 'Pracovník',
      phoneNumber: '0902364532',
      contractType: 'Zamestnanec',
      healthExam: '2021-03-11',
    },
    {
      name: 'Norbert Rubáň',
      position: 'Pracovník',
      phoneNumber: '0902369657',
      contractType: 'Zamestnanec',
      healthExam: '2018-01-18',
    },
    {
      name: 'Ondrej Klátocz',
      position: 'Pracovník',
      phoneNumber: '0902322765',
      contractType: 'Zamestnanec',
      healthExam: '2021-08-18',
    },
  ]);

  await sequelize.models.Vehicle.bulkCreate([
    {
      brand: 'Mercedes',
      model: 'Vito',
      VIN: 'BK1RN23WLF4567391',
      year: '2010',
      lastService: '2020-10-25',
      tireSize: '215x55xR17',
    },
    {
      brand: 'Škoda',
      model: 'Octavia',
      VIN: 'ST1RN23KRF7367891',
      year: '2010',
      lastService: '2020-08-01',
      tireSize: '215x55xR17',
    },
    {
      brand: 'Ford',
      model: 'Ranger',
      VIN: 'PL6RN73KOF4567891',
      year: '2015',
      lastService: '2021-11-18',
      tireSize: '255x65xR16',
    },
    {
      brand: 'Seat',
      model: 'Ibiza',
      VIN: 'TW1RN23WOF4567321',
      year: '2020',
      lastService: '2022-01-17',
      tireSize: '265x55xR16',
    },
    {
      brand: 'Mercedes',
      model: 'Sprinter',
      VIN: 'KO1RN23TRZ4591891',
      year: '2018',
      lastService: '2021-06-17',
      tireSize: '255x65xR16',
    },
    {
      brand: 'Zetor',
      model: '7745 Turbo',
      VIN: 'ZE1TO23RRZ4597745',
      year: '1984',
      lastService: '2020-09-17',
      tireSize: '-',
    },
    {
      brand: 'Hyundai',
      model: 'i30',
      VIN: 'PW1JH91KRI9167891',
      year: '2020',
      lastService: '2021-11-18',
      tireSize: '255x65xR16',
    },
    {
      brand: 'Hyundai',
      model: 'i30',
      VIN: 'PW1JH91POK7667891',
      year: '2020',
      lastService: '2021-11-18',
      tireSize: '255x65xR16',
    },
    {
      brand: 'Hyundai',
      model: 'i30',
      VIN: 'NM1JH91LUM9167761',
      year: '2020',
      lastService: '2021-11-20',
      tireSize: '255x65xR16',
    },
    {
      brand: 'Hyundai',
      model: 'i30',
      VIN: 'BV1JH91WOF9167765',
      year: '2020',
      lastService: '2021-11-21',
      tireSize: '255x65xR16',
    },
  ]);
  await sequelize.models.Equipment.bulkCreate([
    {
      idNumber: '206',
      brand: 'Makita',
      equipmentType: 'Vŕtačka',
      description: 'Elektrická vŕtačka s príklepom',
      status: 'Záruka',
    },
    {
      idNumber: '207',
      brand: 'Bosch',
      equipmentType: 'AKU vŕtačka',
      description: 'AKU vŕtačka s príklepom',
      status: 'Záruka',
    },
    {
      idNumber: '208',
      brand: 'Makita',
      equipmentType: 'Vŕtačka',
      description: 'Elektrická vŕtačka s príklepom',
      status: 'Záruka',
    },
    {
      idNumber: '209',
      brand: 'Bosch',
      equipmentType: 'AKU vŕtačka',
      description: 'AKU vŕtačka s príklepom',
      status: 'Záruka',
    },
    {
      idNumber: '210',
      brand: 'Makita',
      equipmentType: 'Vŕtačka',
      description: 'Elektrická vŕtačka s príklepom',
      status: 'Záruka',
    },
    {
      idNumber: '211',
      brand: 'Bosch',
      equipmentType: 'AKU vŕtačka',
      description: 'AKU vŕtačka s príklepom',
      status: 'Pokazené',
    },
    {
      idNumber: '212',
      brand: 'Makita',
      equipmentType: 'Vŕtačka',
      description: 'Elektrická vŕtačka s príklepom',
      status: 'OK',
    },
    {
      idNumber: '213',
      brand: 'Bosch',
      equipmentType: 'AKU vŕtačka',
      description: 'AKU vŕtačka s príklepom',
      status: 'OK',
    },
    {
      idNumber: '601',
      brand: 'TITAN',
      equipmentType: 'Zváračka',
      description: 'Univerzálna zváračka',
      status: 'Záruka',
    },
    {
      idNumber: '602',
      brand: 'TITAN',
      equipmentType: 'Zváračka',
      description: 'Univerzálna zváračka',
      status: 'Záruka',
    },
    {
      idNumber: '603',
      brand: 'MIG',
      equipmentType: 'Zváračka',
      description: 'Plast zváračka',
      status: 'OK',
    },
    {
      idNumber: '604',
      brand: 'Gude',
      equipmentType: 'Zváračka',
      description: 'Hliník zváračka',
      status: 'OK',
    },
    {
      idNumber: '301',
      brand: 'Makita',
      equipmentType: 'Karbobrúska',
      description: 'Karbobrúska malá',
      status: 'Záruka',
    },
    {
      idNumber: '302',
      brand: 'Makita',
      equipmentType: 'Karbobrúska',
      description: 'Karbobrúska malá',
      status: 'Záruka',
    },
    {
      idNumber: '303',
      brand: 'Makita',
      equipmentType: 'Karbobrúska',
      description: 'Karbobrúska malá',
      status: 'Pokazená',
    },
    {
      idNumber: '304',
      brand: 'Makita',
      equipmentType: 'Karbobrúska',
      description: 'Karbobrúska malá',
      status: 'Záruka',
    },
    {
      idNumber: '305',
      brand: 'Makita',
      equipmentType: 'Karbobrúska',
      description: 'Karbobrúska malá',
      status: 'Záruka',
    },
    {
      idNumber: '350',
      brand: 'Narex',
      equipmentType: 'Karbobrúska',
      description: 'Karbobrúska veľká',
      status: 'OK',
    },
    {
      idNumber: '351',
      brand: 'Narex',
      equipmentType: 'Karbobrúska',
      description: 'Karbobrúska veľká',
      status: 'OK',
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
      name: 'TotalSystems',
      phoneNumber: '090237574',
    },
    {
      name: 'Steel&CO',
      phoneNumber: '090237574',
    },
    {
      name: 'John&Son',
      phoneNumber: '090237574',
    },
    {
      name: 'Lafixa s.r.o.',
      phoneNumber: '090237574',
    },
  ]);
  await sequelize.models.Attendance.bulkCreate([
    {
      date: '2022-02-01',
      description: 'Udrzba zariadenia c.U445',
      responsibleId: 3,
      WorkPlaceId: 4,
      CustomerId: 5,
    },
    {
      date: '2022-02-02',
      description: 'Vymena tesneni na zariadeni U334',
      responsibleId: 1,
      WorkPlaceId: 1,
      CustomerId: 4,
    },
    {
      date: '2022-02-03',
      description: 'Vymena tesneni na zariadeni U334',
      responsibleId: 1,
      WorkPlaceId: 2,
      CustomerId: 4,
    },
    {
      date: '2022-02-04',
      description: 'praca na oprave vysokej pece',
      responsibleId: 3,
      WorkPlaceId: 2,
      CustomerId: 2,
    },
    {
      date: '2022-02-07',
      description: 'praca na oprave vysokej pece',
      responsibleId: 5,
      WorkPlaceId: 4,
      CustomerId: 3,
    },
    {
      date: '2022-02-08',
      description: 'Standardna udrzba',
      responsibleId: 10,
      WorkPlaceId: 1,
      CustomerId: 1,
    },
    {
      date: '2022-02-09',
      description: 'Standardna udrzba',
      responsibleId: 5,
      WorkPlaceId: 2,
      CustomerId: 1,
    },
    {
      date: '2022-02-10',
      description: 'Standardna udrzba',
      responsibleId: 3,
      WorkPlaceId: 2,
      CustomerId: 1,
    },
    {
      date: '2022-02-11',
      description: 'Zvaranie potrubi',
      responsibleId: 10,
      WorkPlaceId: 2,
      CustomerId: 2,
    },
    {
      date: '2022-02-14',
      description: 'Systemova udrzba',
      responsibleId: 1,
      WorkPlaceId: 4,
      CustomerId: 3,
    },
    {
      date: '2022-02-15',
      description: 'praca na oprave nizkej pece',
      responsibleId: 1,
      WorkPlaceId: 1,
      CustomerId: 5,
    },
    {
      date: '2022-02-16',
      description: 'Priprava novej techniky',
      responsibleId: 3,
      WorkPlaceId: 2,
      CustomerId: 3,
    },
    {
      date: '2022-02-17',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 2,
      CustomerId: 4,
    },
    {
      date: '2022-02-18',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 5,
      WorkPlaceId: 2,
      CustomerId: 5,
    },
    {
      date: '2022-02-21',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 10,
      WorkPlaceId: 4,
      CustomerId: 3,
    },
    {
      date: '2022-02-22',
      description: 'Standardna udrzba systemov',
      responsibleId: 10,
      WorkPlaceId: 1,
      CustomerId: 2,
    },
    {
      date: '2022-02-23',
      description: 'Priprava noveho zariadenia',
      responsibleId: 1,
      WorkPlaceId: 2,
      CustomerId: 1,
    },
    {
      date: '2022-02-24',
      description: 'Priprava noveho zariadenia',
      responsibleId: 3,
      WorkPlaceId: 2,
      CustomerId: 2,
    },
    {
      date: '2022-02-25',
      description: 'Priprava noveho zariadenia',
      responsibleId: 4,
      WorkPlaceId: 2,
      CustomerId: 3,
    },
    {
      date: '2022-02-28',
      description: 'Zvaranie prasknuteho potrubia',
      responsibleId: 3,
      WorkPlaceId: 6,
      CustomerId: 4,
    },

    {
      date: '2022-02-01',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 4,
      CustomerId: 5,
    },
    {
      date: '2022-02-02',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 1,
      WorkPlaceId: 1,
      CustomerId: 4,
    },
    {
      date: '2022-02-03',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 1,
      WorkPlaceId: 2,
      CustomerId: 4,
    },
    {
      date: '2022-02-04',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 2,
      CustomerId: 2,
    },
    {
      date: '2022-02-07',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 5,
      WorkPlaceId: 4,
      CustomerId: 3,
    },
    {
      date: '2022-02-08',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 10,
      WorkPlaceId: 1,
      CustomerId: 1,
    },
    {
      date: '2022-02-09',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 5,
      WorkPlaceId: 2,
      CustomerId: 1,
    },
    {
      date: '2022-02-10',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 2,
      CustomerId: 1,
    },
    {
      date: '2022-02-11',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 10,
      WorkPlaceId: 2,
      CustomerId: 2,
    },

    {
      date: '2022-02-22',
      description: 'Standardna udrzba systemov',
      responsibleId: 10,
      WorkPlaceId: 1,
      CustomerId: 2,
    },
    {
      date: '2022-02-23',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 1,
      WorkPlaceId: 2,
      CustomerId: 1,
    },
    {
      date: '2022-02-24',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 2,
      CustomerId: 2,
    },
    {
      date: '2022-02-25',
      description: 'Zvaranie prasknuteho potrubia',
      responsibleId: 4,
      WorkPlaceId: 2,
      CustomerId: 3,
    },
    {
      date: '2022-02-28',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 6,
      CustomerId: 4,
    },
    {
      date: '2022-05-02',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 7,
      CustomerId: 5,
    },
    {
      date: '2022-05-03',
      description: 'AD HOC zvaranie prasknuteho potrubia',
      responsibleId: 3,
      WorkPlaceId: 7,
      CustomerId: 5,
    },
    {
      date: '2022-04-02',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 7,
      CustomerId: 5,
    },
    {
      date: '2022-03-03',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 7,
      CustomerId: 5,
    },
    {
      date: '2022-01-03',
      description: 'Standardna udrzba systemov a zariadeni',
      responsibleId: 3,
      WorkPlaceId: 7,
      CustomerId: 5,
    },
  ]);
  await sequelize.models.EmployeeAttendance.bulkCreate([
    {
      hours: 12.0,
      EmployeeId: 1,
      AttendanceId: 39,
    },
    {
      hours: 12.0,
      EmployeeId: 1,
      AttendanceId: 38,
    },
    {
      hours: 13,
      EmployeeId: 2,
      AttendanceId: 37,
    },
    {
      hours: 8.0,
      EmployeeId: 3,
      AttendanceId: 1,
    },
    {
      hours: 5.5,
      EmployeeId: 4,
      AttendanceId: 1,
    },
    {
      hours: 12,
      EmployeeId: 5,
      AttendanceId: 1,
    },
    {
      hours: 11,
      EmployeeId: 6,
      AttendanceId: 2,
    },
    {
      hours: 10,
      EmployeeId: 7,
      AttendanceId: 2,
    },
    {
      hours: 11,
      EmployeeId: 8,
      AttendanceId: 2,
    },
    {
      hours: 5.5,
      EmployeeId: 9,
      AttendanceId: 2,
    },
    {
      hours: 8,
      EmployeeId: 10,
      AttendanceId: 3,
    },
    {
      hours: 8,
      EmployeeId: 11,
      AttendanceId: 3,
    },
    {
      hours: 8,
      EmployeeId: 12,
      AttendanceId: 3,
    },
    {
      hours: 12,
      EmployeeId: 13,
      AttendanceId: 3,
    },
    {
      hours: 12,
      EmployeeId: 14,
      AttendanceId: 4,
    },
    {
      hours: 12,
      EmployeeId: 15,
      AttendanceId: 4,
    },
    {
      hours: 12,
      EmployeeId: 16,
      AttendanceId: 4,
    },
    {
      hours: 9,
      EmployeeId: 17,
      AttendanceId: 4,
    },
    {
      hours: 8,
      EmployeeId: 18,
      AttendanceId: 4,
    },
    {
      hours: 12,
      EmployeeId: 19,
      AttendanceId: 4,
    },
    {
      hours: 8,
      EmployeeId: 19,
      AttendanceId: 5,
    },
    {
      hours: 7,
      EmployeeId: 20,
      AttendanceId: 5,
    },
    {
      hours: 6,
      EmployeeId: 1,
      AttendanceId: 5,
    },
    {
      hours: 10,
      EmployeeId: 2,
      AttendanceId: 5,
    },
    {
      hours: 12,
      EmployeeId: 3,
      AttendanceId: 5,
    },
    {
      hours: 10,
      EmployeeId: 4,
      AttendanceId: 6,
    },
    {
      hours: 11,
      EmployeeId: 5,
      AttendanceId: 6,
    },
    {
      hours: 7,
      EmployeeId: 6,
      AttendanceId: 6,
    },
    {
      hours: 10,
      EmployeeId: 7,
      AttendanceId: 6,
    },
    {
      hours: 12,
      EmployeeId: 8,
      AttendanceId: 6,
    },
    {
      hours: 12,
      EmployeeId: 9,
      AttendanceId: 7,
    },
    {
      hours: 11,
      EmployeeId: 10,
      AttendanceId: 7,
    },
    {
      hours: 12,
      EmployeeId: 11,
      AttendanceId: 7,
    },
    {
      hours: 10,
      EmployeeId: 12,
      AttendanceId: 7,
    },
    {
      hours: 12,
      EmployeeId: 14,
      AttendanceId: 7,
    },
    {
      hours: 12,
      EmployeeId: 15,
      AttendanceId: 8,
    },
    {
      hours: 4.5,
      EmployeeId: 16,
      AttendanceId: 8,
    },
    {
      hours: 12,
      EmployeeId: 17,
      AttendanceId: 8,
    },
    {
      hours: 6,
      EmployeeId: 18,
      AttendanceId: 8,
    },
    {
      hours: 10,
      EmployeeId: 19,
      AttendanceId: 8,
    },
    {
      hours: 10,
      EmployeeId: 20,
      AttendanceId: 9,
    },
    {
      hours: 10,
      EmployeeId: 1,
      AttendanceId: 9,
    },
    {
      hours: 10,
      EmployeeId: 2,
      AttendanceId: 9,
    },
    {
      hours: 10,
      EmployeeId: 3,
      AttendanceId: 9,
    },
    {
      hours: 10,
      EmployeeId: 4,
      AttendanceId: 9,
    },
    {
      hours: 12,
      EmployeeId: 5,
      AttendanceId: 10,
    },
    {
      hours: 12,
      EmployeeId: 6,
      AttendanceId: 10,
    },
    {
      hours: 14,
      EmployeeId: 7,
      AttendanceId: 10,
    },
    {
      hours: 14,
      EmployeeId: 9,
      AttendanceId: 10,
    },
    {
      hours: 13,
      EmployeeId: 11,
      AttendanceId: 10,
    },
    {
      hours: 12,
      EmployeeId: 12,
      AttendanceId: 11,
    },
    {
      hours: 12,
      EmployeeId: 13,
      AttendanceId: 11,
    },
    {
      hours: 12,
      EmployeeId: 14,
      AttendanceId: 11,
    },
    {
      hours: 8,
      EmployeeId: 1,
      AttendanceId: 11,
    },
    {
      hours: 12,
      EmployeeId: 6,
      AttendanceId: 11,
    },
    {
      hours: 10,
      EmployeeId: 15,
      AttendanceId: 12,
    },
    {
      hours: 11,
      EmployeeId: 20,
      AttendanceId: 12,
    },
    {
      hours: 7,
      EmployeeId: 16,
      AttendanceId: 12,
    },
    {
      hours: 6,
      EmployeeId: 17,
      AttendanceId: 12,
    },
    {
      hours: 12,
      EmployeeId: 19,
      AttendanceId: 12,
    },
    {
      hours: 12,
      EmployeeId: 2,
      AttendanceId: 13,
    },
    {
      hours: 8,
      EmployeeId: 3,
      AttendanceId: 13,
    },
    {
      hours: 8,
      EmployeeId: 4,
      AttendanceId: 13,
    },
    {
      hours: 8,
      EmployeeId: 5,
      AttendanceId: 13,
    },
    {
      hours: 8,
      EmployeeId: 7,
      AttendanceId: 13,
    },
    {
      hours: 8,
      EmployeeId: 7,
      AttendanceId: 14,
    },
    {
      hours: 8,
      EmployeeId: 14,
      AttendanceId: 14,
    },
    {
      hours: 8,
      EmployeeId: 12,
      AttendanceId: 14,
    },
    {
      hours: 8,
      EmployeeId: 7,
      AttendanceId: 15,
    },
    {
      hours: 8,
      EmployeeId: 14,
      AttendanceId: 15,
    },
    {
      hours: 8,
      EmployeeId: 12,
      AttendanceId: 15,
    },
    {
      hours: 6,
      EmployeeId: 20,
      AttendanceId: 16,
    },
    {
      hours: 12,
      EmployeeId: 6,
      AttendanceId: 16,
    },
    {
      hours: 12,
      EmployeeId: 5,
      AttendanceId: 17,
    },
    {
      hours: 12,
      EmployeeId: 4,
      AttendanceId: 17,
    },
    {
      hours: 12,
      EmployeeId: 3,
      AttendanceId: 17,
    },
    {
      hours: 8,
      EmployeeId: 2,
      AttendanceId: 17,
    },
    {
      hours: 7,
      EmployeeId: 1,
      AttendanceId: 17,
    },
    {
      hours: 9,
      EmployeeId: 20,
      AttendanceId: 18,
    },
    {
      hours: 9,
      EmployeeId: 14,
      AttendanceId: 18,
    },
    {
      hours: 9,
      EmployeeId: 13,
      AttendanceId: 18,
    },
    {
      hours: 9,
      EmployeeId: 19,
      AttendanceId: 18,
    },
    {
      hours: 8,
      EmployeeId: 19,
      AttendanceId: 19,
    },
    {
      hours: 8,
      EmployeeId: 18,
      AttendanceId: 19,
    },
    {
      hours: 12,
      EmployeeId: 6,
      AttendanceId: 20,
    },
    {
      hours: 12,
      EmployeeId: 7,
      AttendanceId: 20,
    },
    {
      hours: 12,
      EmployeeId: 8,
      AttendanceId: 20,
    },
    {
      hours: 12,
      EmployeeId: 9,
      AttendanceId: 20,
    },
    {
      hours: 12,
      EmployeeId: 17,
      AttendanceId: 20,
    },
    {
      hours: 12,
      EmployeeId: 7,
      AttendanceId: 21,
    },
    {
      hours: 12,
      EmployeeId: 8,
      AttendanceId: 21,
    },
    {
      hours: 12,
      EmployeeId: 9,
      AttendanceId: 21,
    },
    {
      hours: 12,
      EmployeeId: 17,
      AttendanceId: 21,
    },
    {
      hours: 12,
      EmployeeId: 7,
      AttendanceId: 22,
    },
    {
      hours: 12,
      EmployeeId: 8,
      AttendanceId: 22,
    },
    {
      hours: 12,
      EmployeeId: 9,
      AttendanceId: 22,
    },
    {
      hours: 12,
      EmployeeId: 17,
      AttendanceId: 22,
    },
    {
      hours: 12,
      EmployeeId: 1,
      AttendanceId: 23,
    },
    {
      hours: 12,
      EmployeeId: 2,
      AttendanceId: 23,
    },
    {
      hours: 12,
      EmployeeId: 3,
      AttendanceId: 23,
    },
    {
      hours: 12,
      EmployeeId: 4,
      AttendanceId: 23,
    },
    {
      hours: 12,
      EmployeeId: 5,
      AttendanceId: 23,
    },
    {
      hours: 12,
      EmployeeId: 6,
      AttendanceId: 23,
    },
    {
      hours: 12,
      EmployeeId: 1,
      AttendanceId: 24,
    },
    {
      hours: 12,
      EmployeeId: 2,
      AttendanceId: 24,
    },
    {
      hours: 12,
      EmployeeId: 3,
      AttendanceId: 24,
    },
    {
      hours: 12,
      EmployeeId: 4,
      AttendanceId: 24,
    },
    {
      hours: 12,
      EmployeeId: 5,
      AttendanceId: 24,
    },
    {
      hours: 12,
      EmployeeId: 6,
      AttendanceId: 24,
    },
    {
      hours: 12,
      EmployeeId: 6,
      AttendanceId: 25,
    },
    {
      hours: 12,
      EmployeeId: 7,
      AttendanceId: 25,
    },
    {
      hours: 12,
      EmployeeId: 8,
      AttendanceId: 25,
    },
    {
      hours: 12,
      EmployeeId: 9,
      AttendanceId: 25,
    },
    {
      hours: 12,
      EmployeeId: 10,
      AttendanceId: 25,
    },
    {
      hours: 12,
      EmployeeId: 16,
      AttendanceId: 26,
    },
    {
      hours: 12,
      EmployeeId: 17,
      AttendanceId: 26,
    },
    {
      hours: 12,
      EmployeeId: 18,
      AttendanceId: 26,
    },
    {
      hours: 12,
      EmployeeId: 19,
      AttendanceId: 26,
    },
    {
      hours: 12,
      EmployeeId: 20,
      AttendanceId: 26,
    },
    {
      hours: 12,
      EmployeeId: 16,
      AttendanceId: 27,
    },
    {
      hours: 12,
      EmployeeId: 17,
      AttendanceId: 27,
    },
    {
      hours: 12,
      EmployeeId: 18,
      AttendanceId: 27,
    },
    {
      hours: 12,
      EmployeeId: 19,
      AttendanceId: 27,
    },
    {
      hours: 12,
      EmployeeId: 20,
      AttendanceId: 27,
    },
    {
      hours: 12,
      EmployeeId: 1,
      AttendanceId: 28,
    },
    {
      hours: 12,
      EmployeeId: 4,
      AttendanceId: 28,
    },
    {
      hours: 12,
      EmployeeId: 3,
      AttendanceId: 28,
    },
    {
      hours: 12,
      EmployeeId: 2,
      AttendanceId: 28,
    },
    {
      hours: 12,
      EmployeeId: 5,
      AttendanceId: 28,
    },
    {
      hours: 12,
      EmployeeId: 10,
      AttendanceId: 29,
    },
    {
      hours: 12,
      EmployeeId: 12,
      AttendanceId: 29,
    },
    {
      hours: 12,
      EmployeeId: 14,
      AttendanceId: 29,
    },
    {
      hours: 12,
      EmployeeId: 15,
      AttendanceId: 29,
    },
    {
      hours: 12,
      EmployeeId: 1,
      AttendanceId: 35,
    },
    {
      hours: 12,
      EmployeeId: 13,
      AttendanceId: 35,
    },
    {
      hours: 12,
      EmployeeId: 2,
      AttendanceId: 35,
    },
    {
      hours: 12,
      EmployeeId: 7,
      AttendanceId: 35,
    },
    {
      hours: 12,
      EmployeeId: 1,
      AttendanceId: 36,
    },
    {
      hours: 12,
      EmployeeId: 2,
      AttendanceId: 36,
    },
  ]);
}

module.exports = { populateDB };
