const express = require('express');

const router = express.Router();
const services = require('../services');

router.post('/', services.exportAttendances.getExportAttendances);

module.exports = router;
