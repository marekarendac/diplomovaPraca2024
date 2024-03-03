const xlsx = require('xlsx');

const getExportCustomers = async (req, res) => {
  const customers = await req.context.models.Customer.findAll();

  // Convert instances to plain objects
  const plainCustomers = customers.map((customer) => customer.toJSON());

  const ws = xlsx.utils.json_to_sheet(plainCustomers);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Customers');

  const buf = xlsx.write(wb, { type: 'buffer' });

  const timestamp = new Date().toISOString().replace(/[-:]/g, '');
  const filename = `customers_${timestamp}.xlsx`;

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('X-Filename', filename); // Send filename as separate header
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
};

module.exports = {
  getExportCustomers,
};
