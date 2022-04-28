const express = require('express');

const services = require('../services');

const router = express.Router();

router.post('/', services.test.post);

router.delete('/:id', services.test.destroy);

module.exports = router;
