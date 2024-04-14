const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Employees", deps: []
 * createTable "Vehicles", deps: []
 * createTable "Equipment", deps: []
 * createTable "Customers", deps: []
 * createTable "WorkGroups", deps: []
 * createTable "Projects", deps: [customer, workGroup]
 * createTable "EmployeeWorkGroups", deps: [Employee, WorkGroup, Employees, WorkGroups]
 * createTable "Attendances", deps: [Projects, Employees]
 *
 * */

const info = {
  revision: 1,
  name: 'initial',
  created: '2024-03-29T23:00:06.975Z',
  comment: '',
};

const migrationCommands = [
  {
    fn: 'createTable',
    params: [
      'Customers',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          field: 'phoneNumber',
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          field: 'city',
          allowNull: false,
        },
        street: {
          type: Sequelize.STRING,
          field: 'street',
          allowNull: false,
        },
        ICO: {
          type: Sequelize.STRING,
          field: 'ICO',
          allowNull: false,
        },
        DIC: {
          type: Sequelize.STRING,
          field: 'DIC',
          allowNull: false,
        },
        ICDPH: {
          type: Sequelize.STRING,
          field: 'ICDPH',
          allowNull: false,
        },
        IBAN: {
          type: Sequelize.STRING,
          field: 'IBAN',
          allowNull: false,
        },
        pointOfContact: {
          type: Sequelize.STRING,
          field: 'pointOfContact',
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          field: 'email',
          allowNull: false,
        },
        PSC: {
          type: Sequelize.STRING,
          field: 'PSC',
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Employees',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: false,
        },
        surname: {
          type: Sequelize.STRING,
          field: 'surname',
          allowNull: false,
        },
        position: {
          type: Sequelize.STRING,
          field: 'position',
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          field: 'phoneNumber',
          allowNull: false,
        },
        contractType: {
          type: Sequelize.STRING,
          field: 'contractType',
          allowNull: false,
        },
        healthExam: {
          type: Sequelize.DATEONLY,
          field: 'healthExam',
          allowNull: false,
        },
        documentNumber: {
          type: Sequelize.STRING(20),
          field: 'documentNumber',
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(45),
          field: 'email',
          allowNull: false,
        },
        iban: {
          type: Sequelize.STRING(24),
          field: 'iban',
          allowNull: false,
        },
        wage: {
          type: Sequelize.DECIMAL(4, 2),
          field: 'wage',
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Vehicles',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        brand: {
          type: Sequelize.STRING,
          field: 'brand',
          allowNull: false,
        },
        model: {
          type: Sequelize.STRING,
          field: 'model',
          allowNull: false,
        },
        year: {
          type: Sequelize.INTEGER,
          field: 'year',
          allowNull: false,
        },
        VIN: {
          type: Sequelize.STRING,
          field: 'VIN',
          allowNull: false,
        },
        lastService: {
          type: Sequelize.DATEONLY,
          field: 'lastService',
          allowNull: false,
        },
        tireSize: {
          type: Sequelize.STRING,
          field: 'tireSize',
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Equipment',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        idNumber: {
          type: Sequelize.INTEGER,
          field: 'idNumber',
          allowNull: false,
        },
        brand: {
          type: Sequelize.STRING,
          field: 'brand',
          allowNull: false,
        },
        equipmentType: {
          type: Sequelize.STRING,
          field: 'equipmentType',
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          field: 'description',
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          field: 'status',
          allowNull: false,
        },
        warranty: {
          type: Sequelize.DATEONLY,
          field: 'warranty',
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'WorkGroups',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Projects',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          field: 'status',
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          field: 'description',
          allowNull: true,
        },
        workPlace: {
          type: Sequelize.STRING,
          field: 'workPlace',
          allowNull: true,
        },
        CustomerId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'CustomerId',
          references: {
            model: 'Customers',
            key: 'id',
          },
          allowNull: false,
        },
        workedHours: {
          type: Sequelize.DECIMAL(5, 2),
          field: 'workedHours',
          allowNull: true,
        },
        defaultWorkGroupId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          field: 'defaultWorkGroupId',
          references: {
            model: 'WorkGroups',
            key: 'id',
          },
          allowNull: true,
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'EmployeeWorkGroups',
      {
        EmployeeId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
          allowNull: true,
          field: 'EmployeeId',
          references: {
            model: 'Employees',
            key: 'id',
          },
        },
        WorkGroupId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
          allowNull: true,
          field: 'WorkGroupId',
          references: {
            model: 'WorkGroups',
            key: 'id',
          },
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Attendances',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
        },
        date: {
          type: Sequelize.DATEONLY,
          field: 'date',
          allowNull: false,
        },
        ProjectId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'Projects',
            key: 'id',
          },
          field: 'ProjectId',
          allowNull: false,
        },
        EmployeeId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'Employees',
            key: 'id',
          },
          field: 'EmployeeId',
          allowNull: false,
        },
        workedHours: {
          type: Sequelize.INTEGER,
          field: 'workedHours',
          allowNull: true,
        },
        workDescription: {
          type: Sequelize.TEXT,
          field: 'workDescription',
          allowNull: true,
        },
      },
      {},
    ],
  },
];

module.exports = {
  pos: 0,
  up(queryInterface, Sequelize) {
    let index = this.pos;
    return new Promise((resolve, reject) => {
      function next() {
        if (index < migrationCommands.length) {
          const command = migrationCommands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn]
            .apply(queryInterface, command.params)
            .then(next, reject);
        } else resolve();
      }
      next();
    });
  },
  info,
};
