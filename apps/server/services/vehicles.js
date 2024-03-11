const { Sequelize } = require('sequelize');

const findAll = async (req, res) => {
  const vehicles = await req.context.models.Vehicle.findAll();

  res.status(200).send(vehicles);
};

const destroy = async (req, res) => {
  const vehicle = await req.context.models.Vehicle.findByPk(req.params.id);

  if (!vehicle) {
    res.status(404).send(`vehicle with ${req.params.id} not found`);
    return;
  }

  try {
    await vehicle.destroy();
    res.status(200).send(`vehicle with ${req.params.id} was destroyed`);
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      res
        .status(409)
        .send(
          `Cannot delete vehicle with id ${req.params.id} as it is being referenced by other entities.`,
        );
    } else {
      // handle other types of errors or rethrow if you don't want to handle them here
      throw error;
    }
  }
};

const post = async (req, res) => {
  const vehicle = await req.context.models.Vehicle.create(req.body);
  res.status(200).send(vehicle);
};

const update = async (req, res) => {
  const { id } = req.params;
  await req.context.models.Vehicle.update(req.body, {
    where: { id: req.body.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Vehicle was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Vehicle with id=${id}. Maybe Vehicle was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error updating Vehicle with id=${id}`,
      });
    });
};

module.exports = {
  findAll,
  destroy,
  post,
  update,
};
