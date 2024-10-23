const express = require('express');
const userController = require('../controllers/userCtr');
const router = express.Router();

// Route for user registration
router.post('/register', userController.register);

module.exports = router;
