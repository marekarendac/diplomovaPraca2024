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

  await customer.destroy();
  res.status(200).send(`customer with ${req.params.id} was destroyed`);
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
