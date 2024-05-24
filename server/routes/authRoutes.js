const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);

router.get('/facebook', authController.facebookAuth);
router.get('/facebook/callback', authController.facebookAuthCallback);

module.exports = router;
