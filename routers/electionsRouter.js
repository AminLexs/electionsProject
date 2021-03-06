const { Router } = require('express');
const userController = require('../controllers/electionsController');

const router = Router();

router.get('/candidates', userController.getCandidates);
router.put('/vote', userController.sendVote);
module.exports = router;
