const Sequelize = require('sequelize');

const employee = require('./employee');
const vehicle = require('./vehicle');
const equipment = require('./equipment');
const customer = require('./customer');
const attendance = require('./attendance');
const workGroup = require('./workGroup');
const employeeWorkGroup = require('./employeeWorkGroup');
const project = require('./project');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    },
  },
);

const applyRelations = () => {
  const {
    Employee,
    Customer,
    WorkGroup,
    EmployeeWorkGroup,
    Project,
    Attendance,
  } = sequelize.models;

  // Many-to-many relation between Employee and WorkGroup
  Employee.belongsToMany(WorkGroup, {
    through: EmployeeWorkGroup,
    as: 'workGroups',
  });
  WorkGroup.belongsToMany(Employee, {
    through: EmployeeWorkGroup,
    as: 'employees',
  });

  // Associations from EmployeeWorkGroup to Employee and WorkGroup
  EmployeeWorkGroup.belongsTo(Employee, { as: 'employee', foreignKey: 'EmployeeId' });
  EmployeeWorkGroup.belongsTo(WorkGroup, { as: 'workGroup', foreignKey: 'WorkGroupId' });

  // One-to-many relation between Customer and Project
  Customer.hasMany(Project, {
    foreignKey: 'CustomerId',
  });
  Project.belongsTo(Customer, {
    foreignKey: 'CustomerId',
    as: 'projectCustomer',
  });

  // One-to-many relation between WorkGroup and Project
  WorkGroup.hasMany(Project, {
    foreignKey: 'defaultWorkGroupId',
  });
  Project.belongsTo(WorkGroup, {
    foreignKey: 'defaultWorkGroupId',
    as: 'defaultWorkGroup',
  });

  // One-to-many relation between Project and Attendance
  Project.hasMany(Attendance, {
    foreignKey: 'ProjectId',
  });
  Attendance.belongsTo(Project, {
    foreignKey: 'ProjectId',
    as: 'attendanceProject',
  });

  // One-to-many relation between Employee and Attendance
  Employee.hasMany(Attendance, {
    foreignKey: 'EmployeeId',
  });
  Attendance.belongsTo(Employee, {
    foreignKey: 'EmployeeId',
    as: 'attendanceEmployee',
  });
};

const models = [
  employee,
  vehicle,
  equipment,
  customer,
  attendance,
  workGroup,
  employeeWorkGroup,
  project,
];

models.forEach((model) => model(sequelize));

applyRelations();

module.exports = sequelize;
