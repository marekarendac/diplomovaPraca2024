const findAll = async (req, res) => {
  const equipment = await req.context.models.Equipment.findAll();

  res.status(200).send(equipment);
};

const destroy = async (req, res) => {
  console.log('parameters => ', req.params);
  const equipment = await req.context.models.Equipment.findAll();

  res.status(200).send(equipment);
};

module.exports = { findAll, destroy };
