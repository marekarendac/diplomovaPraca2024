const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.customers.findAll);

router.post('/', services.customers.post);

router.delete('/:id', services.customers.destroy);

router.put('/:id', services.customers.update);

module.exports = router;
