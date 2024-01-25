const findAll = async (req, res) => {
  const equipment = await req.context.models.Equipment.findAll();

  res.status(200).send(equipment);
};

const destroy = async (req, res) => {
  const equipment = await req.context.models.Equipment.findByPk(req.params.id);

  if (!equipment) {
    res.status(404).send(`equipment with ${req.params.id} not found`);

    return;
  }
  await equipment.destroy();
  res.status(200).send(`equipment with ${req.params.id} was destroyed`);
};

const post = async (req, res) => {
  console.log('zaznam bol pridany', req.body);
  const equipment = await req.context.models.Equipment.create(req.body);
  res.status(200).send(equipment);
};

const update = async (req, res) => {
  const { id } = req.params;
  await req.context.models.Equipment.update(req.body, {
    where: { id: req.body.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Equipment was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Equipment with id=${id}. Maybe Equipment was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error updating Equipment with id=${id}`,
      });
    });
};

module.exports = {
  findAll,
  destroy,
  post,
  update,
};
