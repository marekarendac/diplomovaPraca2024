const findAll = async (req, res) => {
  const attendances = await req.context.models.Attendance.findAll({
    include: [
      { model: req.context.models.WorkPlace },
      { model: req.context.models.Customer },
      'employees',
      'responsibleEmployee',
    ],
  });

  res.status(200).send(attendances);
};

const post = async (req, res) => {
  const attendance = await req.context.models.Attendance.create({
    date: req.body.date,
    WorkPlaceId: req.body.workPlaceId,
    CustomerId: req.body.customerId,
    responsibleId: req.body.responsibleId,
  });

  req.body.employees?.forEach(async (employee) => {
    await req.context.models.EmployeeAttendance.create({
      hours: employee.hours,
      EmployeeId: employee.id,
      AttendanceId: attendance.id,
    });
  });

  res.status(200).send(attendance);
};

module.exports = {
  findAll,
  post,
};
