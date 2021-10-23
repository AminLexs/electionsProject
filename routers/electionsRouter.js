const userController = require('../controllers/electionsController')
const { Router } = require('express')
const router = Router()

router.get('/candidates', userController.getCandidates);
router.put('/vote', userController.sendVote);
module.exports = router