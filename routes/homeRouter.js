const homeController = require('../controllers/homeController')
const { Router } = require('express')
const router = Router()

router.get('/', homeController.home);

module.exports = router;