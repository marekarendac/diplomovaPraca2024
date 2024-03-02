const xlsx = require('xlsx');

const getExportEquipment = async (req, res) => {
  const equipment = await req.context.models.Equipment.findAll();

  // Convert instances to plain objects
  const plainEquipment = equipment.map((equipment) => equipment.toJSON());

  const ws = xlsx.utils.json_to_sheet(plainEquipment);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Equipment');

  const buf = xlsx.write(wb, { type: 'buffer' });

  const timestamp = new Date().toISOString().replace(/[-:]/g, '');
  const filename = `equipment_${timestamp}.xlsx`;

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('X-Filename', filename); // Send filename as separate header
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
};

module.exports = {
  getExportEquipment,
};
