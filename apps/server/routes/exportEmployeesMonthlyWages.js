const express = require('express');

const router = express.Router();
const services = require('../services');

router.post(
  '/',
  services.exportEmployeesMonthlyWages.getExportEmployeesMonthlyWages,
);

module.exports = router;
