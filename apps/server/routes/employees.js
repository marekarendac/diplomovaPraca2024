const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.employees.findAll);

router.post('/', services.employees.post);

router.delete('/:id', services.employees.destroy);

module.exports = router;
