const express = require('express');
const router = express.Router();
const interventionController = require('../controllers/interventionController');
const auth = require('../middlewares/auth.js');

// INTERVENTION
// CREATE
router.post('/', auth, interventionController.addIntervention); 

// GET ALL
router.get('/all', auth, interventionController.getInterventions);

module.exports = router;
