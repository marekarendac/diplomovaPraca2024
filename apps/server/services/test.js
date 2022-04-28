const post = async (req, res) => {
  console.log('zaznam bol pridany', req.body);
  const test = await req.context.models.Test.create(req.body);
  res.status(200).send(test);
};
const destroy = async (req, res) => {
  const test = await req.context.models.Test.findByPk(req.params.id);

  if (!test) {
    res.status(404).send(`evidence with ${req.params.id} not found`);

    return;
  }

  await test.destroy();
  res.status(200).send(`evidence with ${req.params.id} was destroyed`);
};

module.exports = { post, destroy };
