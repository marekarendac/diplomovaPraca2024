const Sequelize = require('sequelize');

const employee = require('./employee');
const vehicle = require('./vehicle');
const equipment = require('./equipment');
const workPlace = require('./workPlace');
const customer = require('./customer');
const employeeAttendance = require('./employeeAttendance');
const attendance = require('./attendance');
const workGroup = require('./workGroup');
const employeeWorkGroup = require('./employeeWorkGroup'); // new model

const sequelize = new Sequelize('diplomka_TEST', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const applyRelations = () => {
  const {
    Attendance,
    Employee,
    WorkPlace,
    EmployeeAttendance,
    Customer,
    WorkGroup,
    EmployeeWorkGroup,
  } = sequelize.models;

  Employee.hasMany(Attendance, {
    as: 'responsibleAttendances',
    foreignKey: 'responsibleId',
  });
  Attendance.belongsTo(Employee, {
    as: 'responsibleEmployee',
    foreignKey: 'responsibleId',
  });

  WorkPlace.hasMany(Attendance);
  Attendance.belongsTo(WorkPlace);

  Customer.hasMany(Attendance);
  Attendance.belongsTo(Customer);

  Employee.belongsToMany(Attendance, { through: EmployeeAttendance });
  Attendance.belongsToMany(Employee, {
    through: EmployeeAttendance,
    as: 'employees',
  });

  EmployeeAttendance.belongsTo(Attendance);
  EmployeeAttendance.belongsTo(Employee);

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
};

const models = [
  employee,
  vehicle,
  equipment,
  workPlace,
  customer,
  employeeAttendance,
  attendance,
  workGroup,
  employeeWorkGroup, // new model
];

models.forEach((model) => model(sequelize));

applyRelations();

module.exports = sequelize;
