const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.workDays.findAll);

module.exports = router;
