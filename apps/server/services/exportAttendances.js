const { Op } = require('sequelize');
const xlsx = require('xlsx');

const getExportAttendances = async (req, res) => {
  const { dates } = req.body;

  const whereClause = {};
  if (dates && dates.length === 2) {
    const [startDate, endDate] = dates;
    whereClause.date = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  const attendances = await req.context.models.Attendance.findAll({
    where: whereClause,
    include: [
      {
        model: req.context.models.Project,
        as: 'attendanceProject',
        attributes: ['name'],
      },
      {
        model: req.context.models.Employee,
        as: 'attendanceEmployee',
        attributes: ['name', 'surname'],
      },
    ],
  });

  // Convert instances to plain objects and include project and employee names
  const plainAttendances = attendances.map((attendance) => {
    const plainAttendance = attendance.toJSON();
    plainAttendance.EmployeeName = `${attendance.attendanceEmployee.name}`;
    plainAttendance.EmployeeSurname = `${attendance.attendanceEmployee.surname}`;
    plainAttendance.ProjectName = attendance.attendanceProject.name;
    return {
      id: plainAttendance.id,
      employeeId: plainAttendance.EmployeeId,
      employeeName: plainAttendance.EmployeeName,
      employeeSurname: plainAttendance.EmployeeSurname,
      projectId: plainAttendance.ProjectId,
      projectName: plainAttendance.ProjectName,
      workDescription: plainAttendance.workDescription,
      date: plainAttendance.date,
      workedHours: plainAttendance.workedHours.toString().replace('.', ','),
    };
  });

  const ws = xlsx.utils.json_to_sheet(plainAttendances, {
    header: [
      'id',
      'employeeId',
      'employeeName',
      'employeeSurname',
      'projectId',
      'projectName',
      'workDescription',
      'date',
      'workedHours',
    ],
  });
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Attendances');

  const buf = xlsx.write(wb, { type: 'buffer' });

  const timestamp = new Date().toISOString().replace(/[-:]/g, '');
  const filename = `attendances_${timestamp}.xlsx`;

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('X-Filename', filename); // Send filename as separate header
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
};

module.exports = {
  getExportAttendances,
};
