const express = require('express');
const userController = require('../controllers/userCtr');
const auth = require('../middleware/auth');
const router = express.Router();

// Route for user registration
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/refresh_token', userController.refreshToken);
router.get('/infor', auth, userController.getUser);


module.exports = router;
