const findAll = async (req, res) => {
  const customers = await req.context.models.Customer.findAll();

  res.status(200).send(customers);
};

module.exports = {
  findAll,
};
