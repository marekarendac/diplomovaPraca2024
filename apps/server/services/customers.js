const { Sequelize } = require('sequelize');

const findAll = async (req, res) => {
  const customers = await req.context.models.Customer.findAll();

  res.status(200).send(customers);
};

const destroy = async (req, res) => {
  const customer = await req.context.models.Customer.findByPk(req.params.id);

  if (!customer) {
    res.status(404).send(`customer with ${req.params.id} not found`);
    return;
  }

  try {
    await customer.destroy();
    res.status(200).send(`customer with ${req.params.id} was destroyed`);
  } catch (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      res
        .status(409)
        .send(
          `Cannot delete customer with id ${req.params.id} as it is being referenced by other entities.`,
        );
    } else {
      // handle other types of errors or rethrow if you don't want to handle them here
      throw error;
    }
  }
};

const post = async (req, res) => {
  const customer = await req.context.models.Customer.create(req.body);
  res.status(200).send(customer);
};

const update = async (req, res) => {
  const { id } = req.params;
  await req.context.models.Customer.update(req.body, {
    where: { id: req.body.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Customer was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error updating Customer with id=${id}`,
      });
    });
};

module.exports = {
  findAll,
  destroy,
  post,
  update,
};
