const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.equipment.findAll);

router.post('/', services.equipment.post);

router.delete('/:id', services.equipment.destroy);

module.exports = router;
