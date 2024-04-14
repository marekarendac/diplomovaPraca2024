const findAll = async (req, res) => {
  const attendances = await req.context.models.Attendance.findAll({
    include: [
      { model: req.context.models.Project, as: 'attendanceProject' },
      { model: req.context.models.Employee, as: 'attendanceEmployee' },
    ],
  });

  return res.send(attendances);
};

const post = async (req, res) => {
  const attendance = await req.context.models.Attendance.create({
    date: req.body.date,
    ProjectId: req.body.projectId,
    EmployeeId: req.body.employeeId,
    workedHours: req.body.workedHours,
    workDescription: req.body.workDescription,
  });

  return res.send(attendance);
};

module.exports = {
  findAll,
  post,
};
