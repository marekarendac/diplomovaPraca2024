const { Op } = require('sequelize');

const findAll = async (req, res) => {
  const lastAllowedVehicleCheckDate = new Date();
  lastAllowedVehicleCheckDate.setMonth(
    lastAllowedVehicleCheckDate.getMonth() - 22,
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
    lastAllowedEmployeeMedicalDate.getMonth() - 22,
  );

  const employees = await req.context.models.Employee.count({
    where: {
      healthExam: {
        [Op.lt]: lastAllowedEmployeeMedicalDate,
      },
    },
  });

  const equipment = await req.context.models.Equipment.count({
    where: {
      status: 'Pokazené',
    },
  });

  res.status(200).send({
    vehiclesErrors: !!vehicles,
    employeesErrors: !!employees,
    equipmentErrors: !!equipment,
  });
};

module.exports = {
  findAll,
};
