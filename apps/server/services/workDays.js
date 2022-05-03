const findAll = async (req, res) => {
  const workDay = await req.context.models.WorkDay.findAll();

  res.status(200).send(workDay);
};

module.exports = {
  findAll,
};
