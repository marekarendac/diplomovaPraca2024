const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.attendances.findAll);

router.post('/', services.attendances.post);

router.delete('/:id', services.attendances.destroy);

router.put('/:id', services.attendances.update);

router.get('/months/employees', services.attendances.getMonthlyEmployeeHours);

router.get('/months/projects', services.attendances.getMonthlyProjectHours);

module.exports = router;
