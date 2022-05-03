const findAll = async (req, res) => {
  const attendances = await req.context.models.Attendance.findAll();

  res.status(200).send(attendances);
};

module.exports = {
  findAll,
};
