const xlsx = require('xlsx');

const getExportVehicles = async (req, res) => {
  const vehicles = await req.context.models.Vehicle.findAll();

  // Convert instances to plain objects
  const plainVehicles = vehicles.map((vehicle) => vehicle.toJSON());

  const ws = xlsx.utils.json_to_sheet(plainVehicles);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Vehicles');

  const buf = xlsx.write(wb, { type: 'buffer' });

  const timestamp = new Date().toISOString().replace(/[-:]/g, '');
  const filename = `vehicles_${timestamp}.xlsx`;

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
};

module.exports = {
  getExportVehicles,
};
