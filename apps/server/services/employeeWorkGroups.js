const findAll = async (req, res) => {
  const employeeWorkGroups = await req.context.models.EmployeeWorkGroup.findAll(
    {
      include: [
        {
          model: req.context.models.Employee,
          as: 'employee',
        },
        {
          model: req.context.models.WorkGroup,
          as: 'workGroup',
        },
      ],
    },
  );

  res.status(200).send(employeeWorkGroups);
};

const destroy = async (req, res) => {
  const employeeWorkGroup = await req.context.models.EmployeeWorkGroup.findByPk(
    req.params.id,
  );

  if (!employeeWorkGroup) {
    res.status(404).send(`EmployeeWorkGroup with ${req.params.id} not found`);
    return;
  }

  // Check if the WorkGroup is referenced in the Project table
  const project = await req.context.models.Project.findOne({
    where: { defaultWorkGroupId: employeeWorkGroup.workGroupId },
  });

  if (project) {
    res
      .status(409)
      .send(
        `Cannot delete EmployeeWorkGroup with id ${req.params.id} as its workGroup is being referenced by other entities.`,
      );
    return;
  }

  await employeeWorkGroup.destroy();

  res.status(200).send(`EmployeeWorkGroup with ${req.params.id} was destroyed`);
};

const post = async (req, res) => {
  const { workGroupId, employees } = req.body;

  const employeeWorkGroups = await Promise.all(
    employees.map((employeeId) =>
      req.context.models.EmployeeWorkGroup.create({
        WorkGroupId: workGroupId,
        EmployeeId: employeeId,
      }),
    ),
  );

  res.status(200).send(employeeWorkGroups);
};

const update = async (req, res) => {
  const employeeWorkGroup = await req.context.models.EmployeeWorkGroup.findByPk(
    req.params.id,
  );

  if (!employeeWorkGroup) {
    res
      .status(404)
      .send(`EmployeeWorkGroup with id ${req.params.id} not found`);
    return;
  }

  const updatedEmployeeWorkGroup = await employeeWorkGroup.update(req.body);
  res.status(200).send(updatedEmployeeWorkGroup);
};

const removeEmployee = async (req, res) => {
  const { workGroupId, employeeId } = req.body;

  const employeeWorkGroup = await req.context.models.EmployeeWorkGroup.findOne({
    where: {
      WorkGroupId: workGroupId,
      EmployeeId: employeeId,
    },
  });

  console.log('employeeWorkGroup:', employeeWorkGroup); // Log the result of the findOne operation

  if (!employeeWorkGroup) {
    res
      .status(404)
      .send(
        `EmployeeWorkGroup with workGroupId ${workGroupId} and employeeId ${employeeId} not found`,
      );
    return;
  }

  await employeeWorkGroup.destroy();
  res
    .status(200)
    .send(
      `Employee from EmployeeWorkGroup with workGroupId ${workGroupId} and employeeId ${employeeId} was removed`,
    );
};

module.exports = {
  findAll,
  destroy,
  post,
  update,
  removeEmployee,
};
