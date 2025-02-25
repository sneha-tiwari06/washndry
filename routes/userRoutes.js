// routes/userRoutes.js
const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

// Register route
router.post('/signup', userController.register);

// Login route
router.post('/login', userController.login);
router.get('/check-phone', userController.checkPhoneNumberExists);

// Route to reset password
router.post('/reset-password', userController.resetPassword);
module.exports = router;