const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.vehicles.findAll);

router.post('/', services.vehicles.post);

router.delete('/:id', services.vehicles.destroy);

router.put('/:id', services.vehicles.update);

module.exports = router;
