const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const interventionController = require('../controllers/interventionController');
const auth = require('../middlewares/auth.js');

// AGENT
// REGISTER
router.post('/register', agentController.register);

// LOGIN
router.post('/login', agentController.login);

// UPDATE
router.put('/update', auth, agentController.update);

module.exports = router;
