const findAll = async (req, res) => {
  if (req.query.position) {
    const employees = await req.context.models.Employee.findAll({
      where: { position: 'Majster' },
    });
    res.status(200).send(employees);
    return;
  }
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

const post = async (req, res) => {
  console.log('zaznam bol pridany', req.body);
  const employee = await req.context.models.Employee.create(req.body);
  res.status(200).send(employee);
};
const update = async (req, res) => {
  const { id } = req.params;
  console.log('Request body:', req.body); // log the request body
  console.log('ID:', id); // log the id

  try {
    const [num] = await req.context.models.Employee.update(req.body, {
      where: { id },
    });

    if (num === 1) {
      res.send({
        message: 'Employee was updated successfully.',
      });
    } else {
      res.send({
        message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    console.error('Error:', error); // log the error
    res.status(500).send({
      message: `Error updating Employee with id=${id}`,
    });
  }
};

module.exports = {
  findAll,
  destroy,
  post,
  update,
};
