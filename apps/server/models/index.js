const Sequelize = require('sequelize');

const employee = require('./employee');
const vehicle = require('./vehicle');
const equipment = require('./equipment');
const workPlace = require('./workPlace');
const customer = require('./customer');
const employeeAttendance = require('./employeeAttendance');
const attendance = require('./attendance');

const sequelize = new Sequelize('diplomka_TEST', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const applyRelations = () => {
  const { Attendance, Employee, WorkPlace, EmployeeAttendance, Customer } =
    sequelize.models;

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
};

const models = [
  employee,
  vehicle,
  equipment,
  workPlace,
  customer,
  employeeAttendance,
  attendance,
];

models.forEach((model) => model(sequelize));

applyRelations();

module.exports = sequelize;

/* sequelize
  .sync()
  .then(() => console.log('Tables have been created'))
  .catch((error) => console.log(error));
  */
