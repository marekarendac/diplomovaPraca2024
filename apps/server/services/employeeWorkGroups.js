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

  await employeeWorkGroup.destroy();
  res.status(200).send(`EmployeeWorkGroup with ${req.params.id} was destroyed`);
};

const post = async (req, res) => {
  const employeeWorkGroup = await req.context.models.EmployeeWorkGroup.create(
    req.body,
  );
  res.status(200).send(employeeWorkGroup);
};

const update = async (req, res) => {
  const { id } = req.params;
  await req.context.models.EmployeeWorkGroup.update(req.body, {
    where: { id: req.body.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'EmployeeWorkGroup was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update EmployeeWorkGroup with id=${id}. Maybe EmployeeWorkGroup was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error updating EmployeeWorkGroup with id=${id}`,
      });
    });
};

module.exports = {
  findAll,
  destroy,
  post,
  update,
};
