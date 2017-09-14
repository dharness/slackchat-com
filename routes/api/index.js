const express = require('express');
const accounts = require('./accounts');
const visitors = require('./visitors');
const auth = require('./auth');
const bodyParser = require('body-parser');


const router = express.Router();
router.use(bodyParser.json());

router.use('/accounts', accounts);
router.use('/visitors', visitors);
router.use('/auth', auth);

module.exports = router;
