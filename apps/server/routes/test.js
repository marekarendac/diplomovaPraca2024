const express = require('express');

const services = require('../services');

const router = express.Router();

router.post('/', services.test.post);

module.exports = router;
