const findAll = async (req, res) => {
  const workPlace = await req.context.models.Workplace.findAll();

  res.status(200).send(workPlace);
};

module.exports = {
  findAll,
};
