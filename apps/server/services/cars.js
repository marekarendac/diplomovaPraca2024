const findAll = async (req, res) => {
  const cars = await req.context.models.Car.findAll();

  res.status(200).send(cars);
};

const destroy = async (req, res) => {
  console.log('parameters => ', req.params);
  const cars = await req.context.models.Car.findAll();

  res.status(200).send(cars);
};

module.exports = { findAll, destroy };
