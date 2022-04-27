const register = [];
const post = async (req, res) => {
  const evidence = req.body;
  console.log('zaznam bol pridany');
  register.push(evidence);
  res.send(evidence);
};

module.exports = { post };
