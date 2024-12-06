const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register a new customer
router.post('/register', register);

// Login an existing customer
router.post('/login', login);


module.exports = router;
