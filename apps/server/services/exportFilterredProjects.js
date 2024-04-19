const xlsx = require('xlsx');

const getExportFilterredProjects = async (req, res) => {
  const projects = await req.context.models.Project.findAll({
    include: [
      {
        model: req.context.models.Attendance,
        include: [
          { model: req.context.models.Employee, as: 'attendanceEmployee' },
        ],
      },
    ],
  });

  const result = projects.reduce((acc, project) => {
    const employeeHours = project.Attendances.reduce((acc, attendance) => {
      const employeeFullName = `${attendance.attendanceEmployee.name} ${attendance.attendanceEmployee.surname}`;

      const employeeItemIdx = acc.findIndex(
        (item) => item.employee === employeeFullName,
      );

      if (employeeItemIdx !== -1) {
        acc[employeeItemIdx].hours += parseFloat(attendance.workedHours);
      } else {
        acc.push({
          projectId: project.id,
          projectName: project.name, // assuming the project name is stored in a 'name' field
          employee: employeeFullName,
          hours: parseFloat(attendance.workedHours),
        });
      }

      return acc;
    }, []);

    return [...acc, ...employeeHours];
  }, []);

  const ws = xlsx.utils.json_to_sheet(result);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Projects');

  const buf = xlsx.write(wb, { type: 'buffer' });

  const timestamp = new Date().toISOString().replace(/[-:]/g, '');
  const filename = `filterredEmployeesByProjects_${timestamp}.xlsx`;

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('X-Filename', filename); // Send filename as separate header
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
};

module.exports = {
  getExportFilterredProjects,
};
