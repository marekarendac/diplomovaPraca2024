const express = require('express');

const services = require('../services');

const router = express.Router();

router.post('/', services.login.post);

module.exports = router;
