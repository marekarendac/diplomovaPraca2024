const Sequelize = require('sequelize');

const employee = require('./employee');
const vehicle = require('./vehicle');
const equipment = require('./equipment');
const test = require('./test');
const workPlace = require('./workPlace');
const customer = require('./customer');
const employeeAttendance = require('./employeeAttendance');
const attendance = require('./attendance');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  logging: false,
});

const applyRelations = () => {
  const { Attendance, Employee, WorkPlace, EmployeeAttendance, Customer } =
    sequelize.models;

  // asociacia attendance a responsibleEmployee - mozem si to volat podla "as"
  Employee.hasMany(Attendance, {
    as: 'responsibleAttendances',
    foreignKey: 'responsibleId',
  });
  Attendance.belongsTo(Employee, {
    as: 'responsibleEmployee',
    foreignKey: 'responsibleId',
  });

  // asociacia attendance a responsibleEmployee - mozem si to volat podla "as"
  WorkPlace.hasMany(Attendance);
  Attendance.belongsTo(WorkPlace);

  // asociacia attendance a responsibleEmployee - mozem si to volat podla "as"
  Customer.hasMany(Attendance);
  Attendance.belongsTo(Customer);

  Employee.belongsToMany(Attendance, { through: EmployeeAttendance });
  Attendance.belongsToMany(Employee, {
    through: EmployeeAttendance,
    as: 'employees',
  });
};

const models = [
  employee,
  vehicle,
  equipment,
  test,
  workPlace,
  customer,
  employeeAttendance,
  attendance,
];

models.forEach((model) => model(sequelize));

applyRelations();

module.exports = sequelize;
