const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.cars.findAll);

router.post('/', services.cars.post);

router.delete('/:id', services.cars.destroy);

module.exports = router;
