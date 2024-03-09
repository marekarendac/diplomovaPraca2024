const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.projects.findAll);

router.post('/', services.projects.post);

router.delete('/:id', services.projects.destroy);

router.put('/:id', services.projects.update);

module.exports = router;
