const findAll = async (req, res) => {
  const employees = await req.context.models.Employee.findAll();

  res.status(200).send(employees);
};

const destroy = async (req, res) => {
  const employee = await req.context.models.Employee.findByPk(req.params.id);

  if (!employee) {
    res.status(404).send(`employee with ${req.params.id} not found`);

    return;
  }

  await employee.destroy();
  res.status(200).send(`employee with ${req.params.id} was destroyed`);
};

module.exports = { findAll, destroy };
