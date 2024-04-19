const { Op } = require('sequelize');
const xlsx = require('xlsx');

const getExportEmployeesMonthlyWages = async (req, res) => {
  const { month } = req.body; // get the month value from the request body

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

    const employeeName = `${cur.attendanceEmployee.name} ${cur.attendanceEmployee.surname}`;
    const { wage } = cur.attendanceEmployee;

    const monthItemIdx = acc.findIndex(
      (item) => item.month === formattedMonth && item.employee === employeeName,
    );

    const hours = parseFloat(cur.workedHours);
    const totalWage = hours * wage;

    if (monthItemIdx !== -1) {
      acc[monthItemIdx].hours += hours;
      acc[monthItemIdx].totalWage += totalWage;
    } else {
      acc.push({
        month: formattedMonth,
        employee: employeeName,
        hours,
        wage,
        totalWage,
      });
    }

    return acc;
  }, []);

  const ws = xlsx.utils.json_to_sheet(monthlyAttendances);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'EmployeesMonthlyWages');

  const buf = xlsx.write(wb, { type: 'buffer' });

  const timestamp = new Date().toISOString().replace(/[-:]/g, '');
  const filename = `EmployeesMonthlyWages_${timestamp}.xlsx`;

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('X-Filename', filename); // Send filename as separate header
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
};

module.exports = {
  getExportEmployeesMonthlyWages,
};
