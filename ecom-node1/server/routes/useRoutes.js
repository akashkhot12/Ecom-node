const express = require('express');
const userController = require('../controllers/userCtr');
const router = express.Router();

// Route for user registration
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/refresh_token', userController.refreshToken);


module.exports = router;
