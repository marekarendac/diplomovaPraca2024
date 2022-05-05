const findAll = async (req, res) => {
  const attendances = await req.context.models.Attendance.findAll({
    include: [
      { model: req.context.models.WorkPlace },
      { model: req.context.models.Customer },
      'employees',
      'responsibleEmployee',
    ],
  });

  const mappedAtendaces = attendances.reduce((acc, cur) => {
    cur.employees.forEach((employee) =>
      acc.push({
        id: cur.id,
        date: cur.date,
        description: cur.description,
        employeeName: employee.name,
        employeeHours: employee.EmployeeAttendance.hours,
      }),
    );
    return acc;
  }, []);

  res.status(200).send(mappedAtendaces);
};

const getMonthlyHours = async (req, res) => {
  const employeeAttendances =
    await req.context.models.EmployeeAttendance.findAll({
      include: [{ model: req.context.models.Attendance }],
    });

  const monthlyAttendances = employeeAttendances.reduce((acc, cur) => {
    const currentDate = new Date(cur.Attendance.date);

    const formattedMonth = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }`;

    const monthItemIdx = acc.findIndex((item) => item.month === formattedMonth);

    if (monthItemIdx !== -1) {
      acc[monthItemIdx].hours += cur.hours;

      return acc;
    }

    acc.push({
      month: formattedMonth,
      hours: cur.hours,
    });

    return acc;
  }, []);

  res.status(200).send(monthlyAttendances);
};

const getMonthlyEmployeeHours = async (req, res) => {
  const employeeAttendances =
    await req.context.models.EmployeeAttendance.findAll({
      include: [
        { model: req.context.models.Attendance },
        { model: req.context.models.Employee },
      ],
    });

  const monthlyAttendances = employeeAttendances.reduce((acc, cur) => {
    const currentDate = new Date(cur.Attendance.date);

    const formattedMonth = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }`;

    const monthItemIdx = acc.findIndex(
      (item) =>
        item.month === formattedMonth && item.employee === cur.Employee.name,
    );

    if (monthItemIdx !== -1) {
      acc[monthItemIdx].hours += cur.hours;

      return acc;
    }

    acc.push({
      month: formattedMonth,
      employee: cur.Employee.name,
      hours: cur.hours,
    });

    return acc;
  }, []);

  res.status(200).send(monthlyAttendances);
};

const post = async (req, res) => {
  const attendance = await req.context.models.Attendance.create({
    date: req.body.date,
    WorkPlaceId: req.body.workPlaceId,
    CustomerId: req.body.customerId,
    responsibleId: req.body.responsibleId,
    description: req.body.description,
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
  getMonthlyHours,
  getMonthlyEmployeeHours,
};
