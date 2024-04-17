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

const destroy = async (req, res) => {
  const attendance = await req.context.models.Attendance.findByPk(
    req.params.id,
  );

  if (!attendance) {
    res.status(404).send(`Attendance with ${req.params.id} not found`);
    return;
  }

  try {
    await attendance.destroy();
    res.status(200).send(`attendance with ${req.params.id} was destroyed`);
  } catch (error) {
    if (
      error instanceof req.context.models.Sequelize.ForeignKeyConstraintError
    ) {
      res
        .status(409)
        .send(
          `Cannot delete attendance with id ${req.params.id} as it is being referenced by other entities.`,
        );
    } else {
      // handle other types of errors or rethrow if you don't want to handle them here
      throw error;
    }
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  console.log('Request body:', req.body); // log the request body
  console.log('ID:', id); // log the id

  try {
    const [num] = await req.context.models.Attendance.update(req.body, {
      where: { id },
    });

    if (num === 1) {
      res.send({
        message: 'Attendance was updated successfully.',
      });
    } else {
      res.send({
        message: `Cannot update Attendance with id=${id}. Maybe Attendance was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    console.error('Error:', error); // log the error
    res.status(500).send({
      message: `Error updating Attendance with id=${id}`,
    });
  }
};

const getMonthlyEmployeeHours = async (req, res) => {
  const attendances = await req.context.models.Attendance.findAll({
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

    const monthItemIdx = acc.findIndex(
      (item) => item.month === formattedMonth && item.employee === employeeName,
    );

    if (monthItemIdx !== -1) {
      acc[monthItemIdx].hours += parseFloat(cur.workedHours);

      return acc;
    }

    acc.push({
      month: formattedMonth,
      employee: employeeName,
      hours: parseFloat(cur.workedHours),
    });

    return acc;
  }, []);

  res.status(200).send(monthlyAttendances);
};

const getMonthlyProjectHours = async (req, res) => {
  const attendances = await req.context.models.Attendance.findAll({
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

      return acc;
    }

    acc.push({
      month: formattedMonth,
      project: projectName,
      status: projectStatus,
      hours: parseFloat(cur.workedHours),
    });

    return acc;
  }, []);

  res.status(200).send(monthlyAttendances);
};

module.exports = {
  findAll,
  post,
  destroy,
  update,
  getMonthlyEmployeeHours,
  getMonthlyProjectHours,
};
