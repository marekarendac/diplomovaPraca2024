const express = require('express');

const router = express.Router();
const services = require('../services');

router.get('/', services.exportVehicles.getExportVehicles);

module.exports = router;
