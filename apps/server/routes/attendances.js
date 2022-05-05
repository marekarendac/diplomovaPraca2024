const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.attendances.findAll);

router.post('/', services.attendances.post);

router.get('/months', services.attendances.getMonthlyHours);

router.get('/months/employees', services.attendances.getMonthlyEmployeeHours);

module.exports = router;
