const express = require('express');

const services = require('../services');

const router = express.Router();

router.get('/', services.workGroups.findAll);

router.post('/', services.workGroups.post);

router.delete('/:id', services.workGroups.destroy);

router.put('/:id', services.workGroups.update);

module.exports = router;
