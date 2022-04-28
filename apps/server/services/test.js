const post = async (req, res) => {
  console.log('zaznam bol pridany', req.body);
  const test = await req.context.models.Test.create(req.body);
  res.status(200).send(test);
};

module.exports = { post };
