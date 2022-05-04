const findAll = async (req, res) => {
  const workPlace = await req.context.models.WorkPlace.findAll();

  res.status(200).send(workPlace);
};

module.exports = {
  findAll,
};
