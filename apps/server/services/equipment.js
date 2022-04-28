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

module.exports = { findAll, destroy };
