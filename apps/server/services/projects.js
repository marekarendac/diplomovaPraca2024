const findAll = async (req, res) => {
  const projects = await req.context.models.Project.findAll({
    include: [
      {
        model: req.context.models.Customer,
        as: 'projectCustomer',
      },
    ],
  });

  res.status(200).send(projects);
};

const destroy = async (req, res) => {
  const project = await req.context.models.Project.findByPk(req.params.id);

  if (!project) {
    res.status(404).send(`project with ${req.params.id} not found`);

    return;
  }

  await project.destroy();
  res.status(200).send(`project with ${req.params.id} was destroyed`);
};

const post = async (req, res) => {
  const project = await req.context.models.Project.create(req.body);
  res.status(200).send(project);
};

const update = async (req, res) => {
  const { id } = req.params;
  await req.context.models.Project.update(req.body, {
    where: { id: req.body.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Project was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error updating Project with id=${id}`,
      });
    });
};

module.exports = {
  findAll,
  destroy,
  post,
  update,
};
