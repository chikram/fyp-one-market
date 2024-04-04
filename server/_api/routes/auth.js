const express = require('express');
const router = express.Router();
const { registrationController, signInController } = require('../../controllers/auth');

router.post('/register', registrationController);
router.post('/sign-in', signInController)

module.exports = router;
