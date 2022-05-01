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

  await vehicle.destroy();
  res.status(200).send(`vehicle with ${req.params.id} was destroyed`);
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
  findAll, destroy, post, update,
};
