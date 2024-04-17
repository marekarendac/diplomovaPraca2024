const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.attendances.findAll);

router.post('/', services.attendances.post);

router.delete('/:id', services.attendances.destroy);

router.put('/:id', services.attendances.update);

module.exports = router;
