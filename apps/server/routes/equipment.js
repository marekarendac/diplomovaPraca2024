const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.employees.findAll);

router.post('/', async (res, _) => res.send('POST HTTP method on employee resource'));

router.delete('/:id', services.employees.destroy);

module.exports = router;
