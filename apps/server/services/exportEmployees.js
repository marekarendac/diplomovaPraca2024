const xlsx = require('xlsx');

const getExportEmployees = async (req, res) => {
  const employees = await req.context.models.Employee.findAll();

  // Convert instances to plain objects
  const plainEmployees = employees.map((employee) => employee.toJSON());

  const ws = xlsx.utils.json_to_sheet(plainEmployees);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Employees');

  const buf = xlsx.write(wb, { type: 'buffer' });

  const timestamp = new Date().toISOString().replace(/[-:]/g, '');
  const filename = `employees_${timestamp}.xlsx`;

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
};

module.exports = {
  getExportEmployees,
};
