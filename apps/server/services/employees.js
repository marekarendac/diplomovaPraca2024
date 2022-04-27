const findAll = async (req, res) => {
  const employees = await req.context.models.Employee.findAll();

  res.status(200).send(employees);
};

const destroy = async (req, res) => {
  console.log('parameters => ', req.params);
  const employees = await req.context.models.Employee.destroy();

  res.status(200).send(employees);
};

module.exports = { findAll, destroy };
