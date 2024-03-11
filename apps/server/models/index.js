const Sequelize = require('sequelize');

const employee = require('./employee');
const vehicle = require('./vehicle');
const equipment = require('./equipment');
const customer = require('./customer');
const attendance = require('./attendance');
const workGroup = require('./workGroup');
const employeeWorkGroup = require('./employeeWorkGroup');
const project = require('./project');

const sequelize = new Sequelize('diplomka_TEST', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

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
  EmployeeWorkGroup.belongsTo(Employee, { as: 'employee' });
  EmployeeWorkGroup.belongsTo(WorkGroup, { as: 'workGroup' });

  // One-to-many relation between Customer and Project
  Customer.hasMany(Project, {
    foreignKey: 'customerId',
  });
  Project.belongsTo(Customer, {
    foreignKey: 'customerId',
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
    foreignKey: 'projectId',
  });
  Attendance.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'attendanceProject',
  });

  // One-to-many relation between Employee and Attendance
  Employee.hasMany(Attendance, {
    foreignKey: 'employeeId',
  });
  Attendance.belongsTo(Employee, {
    foreignKey: 'employeeId',
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
