const { Sequelize } = require('sequelize');

const findAll = async (req, res) => {
  let employees;

  if (req.query.position) {
    employees = await req.context.models.Employee.findAll({
      where: { position: 'Majster' },
    });
  } else {
    employees = await req.context.models.Employee.findAll();
  }

  console.log(employees[0]); // Log the first employee data
  res.status(200).send(employees);
};

const destroy = async (req, res) => {
  const employee = await req.context.models.Employee.findByPk(req.params.id);

  if (!employee) {
    res.status(404).send(`employee with ${req.params.id} not found`);
    return;
  }

  try {
    await employee.destroy();
    res.status(200).send(`employee with ${req.params.id} was destroyed`);
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      res
        .status(409)
        .send(
          `Cannot delete employee with id ${req.params.id} as it is being referenced by other entities.`,
        );
    } else {
      // handle other types of errors or rethrow if you don't want to handle them here
      throw error;
    }
  }
};

const post = async (req, res) => {
  console.log('Received data:', req.body);
  try {
    const employee = await req.context.models.Employee.create(req.body);
    res.status(200).send(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res
      .status(500)
      .send({ message: 'Error creating employee', error: error.message });
  }
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
