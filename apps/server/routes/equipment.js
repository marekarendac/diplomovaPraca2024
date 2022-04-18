const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.equipment.findAll);

router.post('/', async (res, _) => res.send('POST HTTP method on equipment resource'));

router.delete('/:id', services.equipment.destroy);

module.exports = router;
