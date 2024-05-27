const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const passport = require('passport')

router.post('/register', authController.register);
router.post('/login', authController.login);

// Google OAuth routes
router.get('/google', authController.google);
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.googleCallback);

module.exports = router;
