const { Sequelize } = require('sequelize');

const findAll = async (req, res) => {
  const workGroups = await req.context.models.WorkGroup.findAll();

  res.status(200).send(workGroups);
};

const destroy = async (req, res) => {
  const workGroup = await req.context.models.WorkGroup.findByPk(req.params.id);

  if (!workGroup) {
    res.status(404).send(`workGroup with ${req.params.id} not found`);
    return;
  }

  // Check if the WorkGroup is referenced in the Project table
  const project = await req.context.models.Project.findOne({
    where: { defaultWorkGroupId: req.params.id },
  });

  if (project) {
    res
      .status(409)
      .send(
        `Cannot delete workGroup with id ${req.params.id} as it is being referenced by other entities.`,
      );
    return;
  }

  // Delete all employeeWorkGroups with the same workGroupId
  await req.context.models.EmployeeWorkGroup.destroy({
    where: { workGroupId: req.params.id },
  });

  // Now delete the workGroup
  await workGroup.destroy();

  res
    .status(200)
    .send(
      `workGroup with id ${req.params.id} was destroyed, also all employeeWorkGroups with the same workGroupId were destroyed.`,
    );
};

const post = async (req, res) => {
  try {
    const workGroup = await req.context.models.WorkGroup.create(req.body);
    res.status(200).send(workGroup);
  } catch (error) {
    res.status(500).send({
      message: 'Error occurred while creating the workGroup',
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  await req.context.models.WorkGroup.update(req.body, {
    where: { id: req.body.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'WorkGroup was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update WorkGroup with id=${id}. Maybe WorkGroup was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error updating WorkGroup with id=${id}`,
      });
    });
};

module.exports = {
  findAll,
  destroy,
  post,
  update,
};
