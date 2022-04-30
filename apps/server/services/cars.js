const findAll = async (req, res) => {
  const cars = await req.context.models.Car.findAll();

  res.status(200).send(cars);
};

const destroy = async (req, res) => {
  const car = await req.context.models.Car.findByPk(req.params.id);

  if (!car) {
    res.status(404).send(`car with ${req.params.id} not found`);

    return;
  }

  await car.destroy();
  res.status(200).send(`car with ${req.params.id} was destroyed`);
};

const post = async (req, res) => {
  console.log('zaznam bol pridany', req.body);
  const car = await req.context.models.Car.create(req.body);
  res.status(200).send(car);
};

module.exports = { findAll, destroy, post };
