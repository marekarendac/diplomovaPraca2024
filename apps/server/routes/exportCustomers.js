const express = require('express');

const router = express.Router();
const services = require('../services');

router.get('/', services.exportCustomers.getExportCustomers);

module.exports = router;
