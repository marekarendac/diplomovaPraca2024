const { Op } = require('sequelize');

const findAll = async (req, res) => {
  const lastAllowedVehicleCheckDate = new Date();
  lastAllowedVehicleCheckDate.setMonth(
    lastAllowedVehicleCheckDate.getMonth() - 11,
  );

  const vehicles = await req.context.models.Vehicle.count({
    where: {
      lastService: {
        [Op.lt]: lastAllowedVehicleCheckDate,
      },
    },
  });

  const lastAllowedEmployeeMedicalDate = new Date();
  lastAllowedEmployeeMedicalDate.setMonth(
    lastAllowedEmployeeMedicalDate.getMonth() - 23,
  );

  const employees = await req.context.models.Employee.count({
    where: {
      healthExam: {
        [Op.lt]: lastAllowedEmployeeMedicalDate,
      },
    },
  });

  res
    .status(200)
    .send({ vehiclesErrors: !!vehicles, employeesErrors: !!employees });
};
module.exports = {
  findAll,
};
