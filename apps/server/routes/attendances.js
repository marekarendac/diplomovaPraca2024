const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.attendances.findAll);

module.exports = router;
