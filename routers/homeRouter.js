const { Router } = require('express');
const homeController = require('../controllers/homeController');

const router = Router();

router.get('/', homeController.home);

module.exports = router;
