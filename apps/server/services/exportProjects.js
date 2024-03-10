const xlsx = require('xlsx');

const getExportProjects = async (req, res) => {
  const projects = await req.context.models.Project.findAll();

  // Convert instances to plain objects
  const plainProjects = projects.map((project) => project.toJSON());

  const ws = xlsx.utils.json_to_sheet(plainProjects);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Projects');

  const buf = xlsx.write(wb, { type: 'buffer' });

  const timestamp = new Date().toISOString().replace(/[-:]/g, '');
  const filename = `projects_${timestamp}.xlsx`;

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('X-Filename', filename); // Send filename as separate header
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
};

module.exports = {
  getExportProjects,
};
