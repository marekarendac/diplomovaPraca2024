const { Op } = require('sequelize');
const xlsx = require('xlsx');

const getExportProjectsMonthly = async (req, res) => {
  const { month, projectName } = req.body;

  const whereClause = {};
  if (month) {
    const startDate = new Date(month);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0,
    );
    whereClause.date = {
      [Op.between]: [startDate, endDate],
    };
  }

  if (projectName) {
    whereClause['$attendanceProject.name$'] = projectName;
  }

  const attendances = await req.context.models.Attendance.findAll({
    where: whereClause,
    include: [
      { model: req.context.models.Project, as: 'attendanceProject' },
      { model: req.context.models.Employee, as: 'attendanceEmployee' },
    ],
  });

  const monthlyAttendances = attendances.reduce((acc, cur) => {
    const currentDate = new Date(cur.date);

    const formattedMonth = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }`;

    const projectName = cur.attendanceProject.name;
    const projectStatus = cur.attendanceProject.status;

    const monthItemIdx = acc.findIndex(
      (item) => item.month === formattedMonth && item.project === projectName,
    );

    if (monthItemIdx !== -1) {
      acc[monthItemIdx].hours += parseFloat(cur.workedHours);
    } else {
      acc.push({
        month: formattedMonth,
        project: projectName,
        status: projectStatus,
        hours: parseFloat(cur.workedHours),
      });
    }

    return acc;
  }, []);

  const ws = xlsx.utils.json_to_sheet(monthlyAttendances);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'ProjectsMonthlyHours');

  const buf = xlsx.write(wb, { type: 'buffer' });

  const timestamp = new Date().toISOString().replace(/[-:]/g, '');
  const filename = `ProjectsMonthlyHours_${timestamp}.xlsx`;

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('X-Filename', filename); // Send filename as separate header
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
};

module.exports = {
  getExportProjectsMonthly,
};
