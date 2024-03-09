const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.employeeWorkGroups.findAll);

router.post('/', services.employeeWorkGroups.post);

router.delete('/removeEmployee', services.employeeWorkGroups.removeEmployee);

router.delete('/:id', services.employeeWorkGroups.destroy);

router.put('/:id', services.employeeWorkGroups.update);

module.exports = router;
