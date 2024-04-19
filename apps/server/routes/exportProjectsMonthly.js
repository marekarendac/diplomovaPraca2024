const express = require('express');

const router = express.Router();
const services = require('../services');

router.post('/', services.exportProjectsMonthly.getExportProjectsMonthly);

module.exports = router;
