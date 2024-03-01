const express = require('express');

const router = express.Router();
const services = require('../services');

router.get('/', services.exportEmployees.getExportEmployees);

module.exports = router;
